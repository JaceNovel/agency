<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class DuffelFlightController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $token = config('services.duffel.access_token');

        if (! $token) {
            return response()->json([
                'data' => [],
                'meta' => ['message' => 'Le fournisseur de voyage n’est pas configuré.'],
            ], 503);
        }

        $validated = $request->validate([
            'origin' => ['nullable', 'string', 'size:3'],
            'destination' => ['nullable', 'string', 'size:3'],
            'departure_date' => ['nullable', 'date_format:Y-m-d'],
            'return_date' => ['nullable', 'date_format:Y-m-d', 'after:departure_date'],
            'extra_destination' => ['nullable', 'string', 'size:3'],
            'extra_departure_date' => ['nullable', 'date_format:Y-m-d', 'after:departure_date'],
            'adults' => ['nullable', 'integer', 'min:1', 'max:9'],
            'cabin_class' => ['nullable', 'string', 'in:economy,premium_economy,business,first'],
            'max_connections' => ['nullable', 'integer', 'min:0', 'max:2'],
        ]);

        $origin = strtoupper($validated['origin'] ?? 'LFW');
        $destination = strtoupper($validated['destination'] ?? 'CDG');
        $departureDate = $validated['departure_date'] ?? now()->addWeeks(5)->toDateString();
        $adults = (int) ($validated['adults'] ?? 1);

        $slices = [[
            'origin' => $origin,
            'destination' => $destination,
            'departure_date' => $departureDate,
        ]];

        if (! empty($validated['return_date'])) {
            $slices[] = [
                'origin' => $destination,
                'destination' => $origin,
                'departure_date' => $validated['return_date'],
            ];
        }

        if (! empty($validated['extra_destination']) && ! empty($validated['extra_departure_date'])) {
            $extraDestination = strtoupper($validated['extra_destination']);
            $slices[] = [
                'origin' => $destination,
                'destination' => $extraDestination,
                'departure_date' => $validated['extra_departure_date'],
            ];
        }

        $payload = [
            'data' => [
                'slices' => $slices,
                'passengers' => array_fill(0, $adults, ['type' => 'adult']),
                'cabin_class' => $validated['cabin_class'] ?? 'economy',
                'max_connections' => (int) ($validated['max_connections'] ?? 1),
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
                ->timeout(28)
                ->post('/air/offer_requests?return_offers=true', $payload);
        } catch (ConnectionException) {
            return response()->json([
                'data' => [],
                'meta' => ['message' => 'Impossible de joindre le fournisseur de voyage pour le moment.'],
            ], 503);
        }

        if (! $response->successful()) {
            return response()->json([
                'data' => [],
                'meta' => [
                    'status' => $response->status(),
                    'message' => $this->errorMessage($response->status()),
                ],
            ], $response->status());
        }

        $offers = collect(Arr::get($response->json(), 'data.offers', []))
            ->map(fn (array $offer): array => $this->normaliseOffer($offer))
            ->filter(fn (array $offer): bool => filled($offer['id']) && filled($offer['provider']))
            ->values()
            ->all();

        return response()->json([
            'data' => $offers,
            'meta' => [
                'source' => 'duffel',
                'origin' => $origin,
                'destination' => $destination,
                'departure_date' => $departureDate,
                'offer_request_id' => Arr::get($response->json(), 'data.id'),
            ],
        ]);
    }

    public function show(string $offerId): JsonResponse
    {
        $response = $this->duffelGet("/air/offers/{$offerId}?return_available_services=true");

        if ($response instanceof JsonResponse) {
            return $response;
        }

        $offer = $response->json('data', []);
        $normalisedOffer = $this->normaliseOffer($offer);

        return response()->json([
            'data' => [
                ...$normalisedOffer,
                'passengers' => collect(Arr::get($offer, 'passengers', []))
                    ->map(fn (array $passenger): array => [
                        'id' => Arr::get($passenger, 'id'),
                        'type' => Arr::get($passenger, 'type'),
                    ])
                    ->values()
                    ->all(),
                'available_services' => collect(Arr::get($offer, 'available_services', []))
                    ->map(fn (array $service): array => $this->normaliseService($service))
                    ->filter(fn (array $service): bool => filled($service['id']))
                    ->values()
                    ->all(),
                'raw_total_amount' => Arr::get($offer, 'total_amount'),
                'raw_total_currency' => Arr::get($offer, 'total_currency'),
            ],
        ]);
    }

    public function seatMaps(string $offerId): JsonResponse
    {
        $response = $this->duffelGet("/air/seat_maps?offer_id={$offerId}");

        if ($response instanceof JsonResponse) {
            return $response;
        }

        $seatMaps = collect($response->json('data', []))
            ->map(fn (array $seatMap): array => $this->normaliseSeatMap($seatMap))
            ->values()
            ->all();

        return response()->json([
            'data' => $seatMaps,
        ]);
    }

    private function normaliseOffer(array $offer): array
    {
        $slice = Arr::get($offer, 'slices.0', []);
        $segments = Arr::get($slice, 'segments', []);
        $firstSegment = $segments[0] ?? [];
        $lastSegment = $segments ? $segments[array_key_last($segments)] : [];
        $amount = (float) Arr::get($offer, 'total_amount', 0);
        $currency = Arr::get($offer, 'total_currency', 'EUR');
        $displayAmount = $this->displayAmount($amount, $currency);
        $originCode = Arr::get($firstSegment, 'origin.iata_code', Arr::get($slice, 'origin.iata_code'));
        $destinationCode = Arr::get($lastSegment, 'destination.iata_code', Arr::get($slice, 'destination.iata_code'));
        $departingAt = Arr::get($firstSegment, 'departing_at');
        $arrivingAt = Arr::get($lastSegment, 'arriving_at');
        $segmentCount = count($segments);
        $stops = max(0, $segmentCount - 1);
        $airlineName = Arr::get($offer, 'owner.name', Arr::get($firstSegment, 'marketing_carrier.name', 'Compagnie aérienne'));
        $airlineCode = Arr::get($offer, 'owner.iata_code', Arr::get($firstSegment, 'marketing_carrier.iata_code'));
        $flightNumber = trim((string) Arr::get($firstSegment, 'marketing_carrier_flight_number'));

        return [
            'id' => Arr::get($offer, 'id'),
            'mode' => 'flight',
            'provider' => $airlineName,
            'code' => trim(($airlineCode ? $airlineCode.' ' : '').$flightNumber) ?: Arr::get($offer, 'id'),
            'logo' => $airlineCode ? "https://images.kiwi.com/airlines/64x64/".strtoupper($airlineCode).'.png' : null,
            'origin' => $originCode ? "{$originCode}" : 'Départ',
            'destination' => $destinationCode ? "{$destinationCode}" : 'Arrivée',
            'departure' => $this->formatTime($departingAt),
            'arrival' => $this->formatTime($arrivingAt),
            'duration' => $this->formatDuration((string) Arr::get($slice, 'duration', ''), $departingAt, $arrivingAt),
            'stops' => $stops,
            'stopLabel' => $stops === 0 ? 'Direct' : "{$stops} escale".($stops > 1 ? 's' : ''),
            'baggage' => $this->baggageLabel($firstSegment),
            'className' => $this->cabinClassLabel((string) Arr::get($offer, 'cabin_class', 'economy')),
            'price' => $displayAmount,
            'priceLabel' => $this->formatMoney($displayAmount, 'XOF'),
            'currency' => 'XOF',
            'raw_price' => $amount,
            'raw_currency' => $currency,
            'refundable' => (bool) Arr::get($offer, 'conditions.refund_before_departure.allowed', false),
            'tags' => array_values(array_filter([
                $stops === 0 ? 'Direct' : 'Avec escale',
                $this->baggageLabel($firstSegment),
                Arr::get($offer, 'conditions.change_before_departure.allowed') ? 'Modifiable' : null,
            ])),
        ];
    }

    private function normaliseService(array $service): array
    {
        $amount = (float) Arr::get($service, 'total_amount', 0);
        $currency = Arr::get($service, 'total_currency', 'EUR');
        $displayAmount = $this->displayAmount($amount, $currency);
        $type = (string) Arr::get($service, 'type', 'service');
        $metadata = Arr::get($service, 'metadata', []);

        return [
            'id' => Arr::get($service, 'id'),
            'type' => $type,
            'passenger_id' => Arr::get($service, 'passenger_id'),
            'segment_ids' => Arr::get($service, 'segment_ids', []),
            'name' => Arr::get($service, 'name') ?: $this->serviceLabel($type, $metadata),
            'description' => Arr::get($service, 'description') ?: $this->serviceDescription($type, $metadata),
            'raw_price' => $amount,
            'price' => $displayAmount,
            'currency' => 'XOF',
            'raw_currency' => $currency,
            'priceLabel' => $this->formatMoney($displayAmount, 'XOF'),
            'raw' => $service,
        ];
    }

    private function normaliseSeatMap(array $seatMap): array
    {
        return [
            'id' => Arr::get($seatMap, 'id'),
            'segment_id' => Arr::get($seatMap, 'segment_id'),
            'slice_id' => Arr::get($seatMap, 'slice_id'),
            'cabins' => collect(Arr::get($seatMap, 'cabins', []))
                ->map(fn (array $cabin): array => [
                    'id' => Arr::get($cabin, 'id'),
                    'name' => Arr::get($cabin, 'name'),
                    'deck' => Arr::get($cabin, 'deck'),
                    'rows' => collect(Arr::get($cabin, 'rows', []))
                        ->map(fn (array $row): array => [
                            'sections' => collect(Arr::get($row, 'sections', []))
                                ->map(fn (array $section): array => [
                                    'elements' => collect(Arr::get($section, 'elements', []))
                                        ->map(fn (array $element): array => $this->normaliseSeatElement($element))
                                        ->values()
                                        ->all(),
                                ])
                                ->values()
                                ->all(),
                        ])
                        ->values()
                        ->all(),
                ])
                ->values()
                ->all(),
        ];
    }

    private function normaliseSeatElement(array $element): array
    {
        $availableServices = collect(Arr::get($element, 'available_services', []))
            ->map(fn (array $service): array => $this->normaliseService($service))
            ->values()
            ->all();

        return [
            'type' => Arr::get($element, 'type'),
            'designator' => Arr::get($element, 'designator'),
            'name' => Arr::get($element, 'name'),
            'available' => count($availableServices) > 0,
            'available_services' => $availableServices,
        ];
    }

    private function serviceLabel(string $type, array $metadata): string
    {
        if ($type === 'baggage') {
            $quantity = Arr::get($metadata, 'maximum_quantity') ?: Arr::get($metadata, 'quantity');

            return $quantity ? "{$quantity} bagage en soute" : 'Bagage en soute';
        }

        if ($type === 'seat') {
            return 'Siège';
        }

        return ucfirst(str_replace('_', ' ', $type));
    }

    private function serviceDescription(string $type, array $metadata): string
    {
        if ($type === 'baggage') {
            $weight = Arr::get($metadata, 'maximum_weight_kg') ?: Arr::get($metadata, 'weight_kg');

            return $weight ? "{$weight} kg" : 'Service ajouté au billet';
        }

        return 'Service ajouté au billet';
    }

    private function formatTime(?string $value): string
    {
        return $value ? Carbon::parse($value)->format('H:i') : '--:--';
    }

    private function formatDuration(string $duration, ?string $departingAt = null, ?string $arrivingAt = null): string
    {
        if (preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?/', $duration, $matches)) {
            $hours = (int) ($matches[1] ?? 0);
            $minutes = (int) ($matches[2] ?? 0);

            return trim(($hours ? "{$hours}h " : '').($minutes ? "{$minutes}m" : ''));
        }

        if ($departingAt && $arrivingAt) {
            $minutes = Carbon::parse($departingAt)->diffInMinutes(Carbon::parse($arrivingAt));
            $hours = intdiv($minutes, 60);
            $remainingMinutes = $minutes % 60;

            return trim(($hours ? "{$hours}h " : '').($remainingMinutes ? "{$remainingMinutes}m" : ''));
        }

        return 'Durée à confirmer';
    }

    private function baggageLabel(array $segment): string
    {
        $bags = Arr::get($segment, 'passengers.0.baggages.0.quantity');

        return $bags ? "{$bags} bagage".($bags > 1 ? 's' : '').' inclus' : 'Bagage selon tarif';
    }

    private function cabinClassLabel(string $value): string
    {
        return match ($value) {
            'premium_economy' => 'Premium économie',
            'business' => 'Business',
            'first' => 'Première',
            default => 'Économique',
        };
    }

    private function formatMoney(float $amount, string $currency): string
    {
        $value = number_format($amount, 0, ',', ' ');

        return strtoupper($currency) === 'XOF' ? "{$value} FCFA" : "{$value} ".strtoupper($currency);
    }

    private function displayAmount(float $amount, string $currency): int
    {
        return (int) round($this->convertToXof($amount, $currency) * 1.15);
    }

    private function convertToXof(float $amount, string $currency): float
    {
        return match (strtoupper($currency)) {
            'XOF', 'XAF' => $amount,
            'EUR' => $amount * 655.957,
            'USD' => $amount * 610,
            'GBP' => $amount * 765,
            'CAD' => $amount * 445,
            default => $amount,
        };
    }

    private function airlineDomain(string $iata): string
    {
        return match (strtoupper($iata)) {
            'AF' => 'airfrance.com',
            'AT' => 'royalairmaroc.com',
            'BA' => 'britishairways.com',
            'DL' => 'delta.com',
            'EK' => 'emirates.com',
            'ET' => 'ethiopianairlines.com',
            'KL' => 'klm.com',
            'LH' => 'lufthansa.com',
            'QR' => 'qatarairways.com',
            'TK' => 'turkishairlines.com',
            'UA' => 'united.com',
            'WB' => 'rwandair.com',
            'SN' => 'brusselsairlines.com',
            default => 'duffel.com',
        };
    }

    private function errorMessage(int $status): string
    {
        return match ($status) {
            401 => 'La clé fournisseur est invalide ou expirée.',
            403 => 'L’accès aux billets réels n’est pas activé sur ce compte.',
            default => 'La recherche de billets est indisponible pour le moment.',
        };
    }

    private function duffelGet(string $path): JsonResponse|\Illuminate\Http\Client\Response
    {
        $token = config('services.duffel.access_token');

        if (! $token) {
            return response()->json([
                'data' => null,
                'meta' => ['message' => 'Le fournisseur de voyage n’est pas configuré.'],
            ], 503);
        }

        try {
            $response = Http::baseUrl(config('services.duffel.base_url'))
                ->acceptJson()
                ->withHeaders([
                    'Accept-Encoding' => 'gzip',
                    'Duffel-Version' => config('services.duffel.version'),
                ])
                ->withToken($token)
                ->timeout(24)
                ->get($path);
        } catch (ConnectionException) {
            return response()->json([
                'data' => null,
                'meta' => ['message' => 'Impossible de joindre le fournisseur de voyage pour le moment.'],
            ], 503);
        }

        if (! $response->successful()) {
            return response()->json([
                'data' => null,
                'meta' => [
                    'status' => $response->status(),
                    'message' => 'Les détails du billet ne sont pas disponibles pour le moment.',
                ],
            ], $response->status());
        }

        return $response;
    }
}
