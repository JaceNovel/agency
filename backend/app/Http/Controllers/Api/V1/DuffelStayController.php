<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class DuffelStayController extends Controller
{
    private const DEFAULT_CITY = 'Paris';

    private const CITY_COORDINATES = [
        'paris' => ['latitude' => 48.8566, 'longitude' => 2.3522],
        'lyon' => ['latitude' => 45.7640, 'longitude' => 4.8357],
        'toulouse' => ['latitude' => 43.6047, 'longitude' => 1.4442],
        'montpellier' => ['latitude' => 43.6119, 'longitude' => 3.8772],
        'nantes' => ['latitude' => 47.2184, 'longitude' => -1.5536],
        'lille' => ['latitude' => 50.6292, 'longitude' => 3.0573],
        'bordeaux' => ['latitude' => 44.8378, 'longitude' => -0.5792],
    ];

    public function search(Request $request): JsonResponse
    {
        $token = config('services.duffel.access_token');

        if (! $token) {
            return response()->json([
                'data' => [],
                'meta' => [
                    'source' => 'fallback',
                    'message' => 'Duffel is not configured.',
                ],
            ], 503);
        }

        $validated = $request->validate([
            'city' => ['nullable', 'string', 'max:80'],
            'check_in_date' => ['nullable', 'date_format:Y-m-d'],
            'check_out_date' => ['nullable', 'date_format:Y-m-d', 'after:check_in_date'],
            'rooms' => ['nullable', 'integer', 'min:1', 'max:6'],
            'adults' => ['nullable', 'integer', 'min:1', 'max:8'],
            'radius' => ['nullable', 'numeric', 'min:1', 'max:50'],
        ]);

        $city = (string) ($validated['city'] ?? self::DEFAULT_CITY);
        $coordinates = $this->coordinatesFor($city);
        $checkInDate = $validated['check_in_date'] ?? now()->addWeeks(3)->toDateString();
        $checkOutDate = $validated['check_out_date'] ?? now()->addWeeks(3)->addDays(2)->toDateString();
        $adults = (int) ($validated['adults'] ?? 1);

        $payload = [
            'data' => [
                'rooms' => (int) ($validated['rooms'] ?? 1),
                'location' => [
                    'radius' => (int) ($validated['radius'] ?? 5),
                    'geographic_coordinates' => $coordinates,
                ],
                'check_in_date' => $checkInDate,
                'check_out_date' => $checkOutDate,
                'guests' => array_fill(0, $adults, ['type' => 'adult']),
            ],
        ];

        try {
            $response = Http::baseUrl(config('services.duffel.base_url'))
                ->acceptJson()
                ->withHeaders([
                    'Accept-Encoding' => 'gzip',
                    'Content-Type' => 'application/json',
                    'Duffel-Version' => config('services.duffel.version'),
                ])
                ->withToken($token)
                ->timeout(22)
                ->post('/stays/search', $payload);
        } catch (ConnectionException) {
            return response()->json([
                'data' => [],
                'meta' => [
                    'source' => 'duffel',
                    'message' => 'Impossible de joindre Duffel pour le moment.',
                ],
            ], 503);
        }

        if (! $response->successful()) {
            $message = $response->status() === 403
                ? 'L’accès aux hôtels Duffel n’est pas encore activé sur ce compte.'
                : 'La recherche d’hôtels Duffel est indisponible pour le moment.';

            return response()->json([
                'data' => [],
                'meta' => [
                    'source' => 'duffel',
                    'status' => $response->status(),
                    'message' => $message,
                ],
            ], $response->status());
        }

        $results = collect(Arr::get($response->json(), 'data.results', []))
            ->map(fn (array $result): array => $this->normaliseHotel($result, $city))
            ->filter(fn (array $hotel): bool => filled($hotel['name']))
            ->values()
            ->all();

        return response()->json([
            'data' => $results,
            'meta' => [
                'source' => 'duffel',
                'city' => $city,
                'check_in_date' => $checkInDate,
                'check_out_date' => $checkOutDate,
            ],
        ]);
    }

    private function coordinatesFor(string $city): array
    {
        return self::CITY_COORDINATES[strtolower(trim($city))] ?? self::CITY_COORDINATES['paris'];
    }

    private function normaliseHotel(array $result, string $city): array
    {
        $accommodation = Arr::get($result, 'accommodation', []);
        $amount = $this->firstAmount($result);
        $displayAmount = $amount ? (string) round($amount * 1.15) : null;
        $currency = $this->firstCurrency($result) ?? 'EUR';
        $rating = Arr::get($accommodation, 'rating') ?? Arr::get($accommodation, 'star_rating');
        $amenities = collect(Arr::get($accommodation, 'amenities', []))
            ->map(fn ($amenity) => is_array($amenity) ? ($amenity['name'] ?? $amenity['type'] ?? null) : $amenity)
            ->filter()
            ->take(4)
            ->values()
            ->all();

        return [
            'id' => Arr::get($result, 'id'),
            'search_result_id' => Arr::get($result, 'id'),
            'name' => Arr::get($accommodation, 'name'),
            'location' => trim(sprintf('%s, %s', Arr::get($accommodation, 'city_name', $city), Arr::get($accommodation, 'country_code', 'France')), ' ,'),
            'price' => $displayAmount ? number_format((float) $displayAmount, 0, ',', ' ').' '.$this->currencyLabel($currency) : 'Prix sur demande',
            'rating' => $rating ? number_format((float) $rating, 1) : '4.6',
            'category' => $this->categoryFor((float) ($rating ?? 4.2)),
            'room' => 'Chambre disponible',
            'distance' => 'Accès central',
            'availability' => 'Réservation disponible',
            'benefits' => $amenities ?: ['Wi-Fi', 'Réception', 'Service client', 'Confirmation rapide'],
            'details' => [
                'Tarif confirmé avant réservation',
                'Détails complets disponibles au devis',
                'Accompagnement StudyWay disponible',
            ],
            'image' => Arr::get($accommodation, 'images.0.url') ?? Arr::get($accommodation, 'photo.url'),
        ];
    }

    private function firstAmount(array $result): ?float
    {
        foreach (['cheapest_rate_total_amount', 'cheapest_rate.amount', 'total_amount'] as $path) {
            $value = Arr::get($result, $path);

            if (is_numeric($value)) {
                return (float) $value;
            }
        }

        return null;
    }

    private function firstCurrency(array $result): ?string
    {
        foreach (['cheapest_rate_currency', 'cheapest_rate.currency', 'total_currency'] as $path) {
            $value = Arr::get($result, $path);

            if (is_string($value) && $value !== '') {
                return $value;
            }
        }

        return null;
    }

    private function categoryFor(float $rating): string
    {
        return $rating >= 4.7 ? 'Premium' : ($rating >= 4.4 ? 'Confort' : 'Sélection');
    }

    private function currencyLabel(string $currency): string
    {
        return strtoupper($currency) === 'XOF' ? 'FCFA' : strtoupper($currency);
    }
}
