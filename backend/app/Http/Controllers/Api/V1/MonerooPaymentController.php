<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FlightReservation;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MonerooPaymentController extends Controller
{
    public function initialize(Request $request): JsonResponse
    {
        $secretKey = config('services.moneroo.secret_key');

        if (! $secretKey) {
            return response()->json([
                'data' => null,
                'meta' => ['message' => 'Moneroo is not configured. Add MONEROO_SECRET_KEY in the backend .env file.'],
            ], 503);
        }

        $validated = $request->validate([
            'amount' => ['required', 'integer', 'min:1'],
            'currency' => ['required', 'string', 'size:3'],
            'description' => ['nullable', 'string', 'max:180'],
            'offer_id' => ['required', 'string', 'max:120'],
            'provider' => ['nullable', 'string', 'max:120'],
            'code' => ['nullable', 'string', 'max:80'],
            'origin' => ['nullable', 'string', 'max:80'],
            'destination' => ['nullable', 'string', 'max:80'],
            'departure' => ['nullable', 'string', 'max:80'],
            'arrival' => ['nullable', 'string', 'max:80'],
            'duration' => ['nullable', 'string', 'max:80'],
            'baggage' => ['nullable', 'string', 'max:120'],
            'cabin_class' => ['nullable', 'string', 'max:80'],
            'ticket' => ['nullable', 'array'],
            'customer.email' => ['required', 'email', 'max:160'],
            'customer.first_name' => ['required', 'string', 'max:80'],
            'customer.last_name' => ['required', 'string', 'max:80'],
            'customer.phone' => ['nullable', 'string', 'max:40'],
            'customer.born_on' => ['nullable', 'date_format:Y-m-d'],
            'customer.gender' => ['nullable', 'string', 'in:f,m'],
        ]);

        $customer = $validated['customer'];
        $payload = [
            'amount' => $validated['amount'],
            'currency' => Str::upper($validated['currency']),
            'description' => $validated['description'] ?? $this->paymentDescription($validated),
            'customer' => [
                'email' => $customer['email'],
                'first_name' => $customer['first_name'],
                'last_name' => $customer['last_name'],
            ],
            'return_url' => config('services.moneroo.return_url'),
            'metadata' => [
                'type' => 'flight_ticket',
                'duffel_offer_id' => $validated['offer_id'],
                'provider' => $validated['provider'] ?? '',
                'ticket_code' => $validated['code'] ?? '',
                'route' => trim(($validated['origin'] ?? '').'-'.($validated['destination'] ?? ''), '-'),
            ],
        ];

        if (! empty($customer['phone'])) {
            $payload['customer']['phone'] = $customer['phone'];
        }

        $reservation = FlightReservation::query()->create([
            'reference' => 'SW-BLT-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
            'status' => 'payment_pending',
            'payment_status' => 'initiated',
            'duffel_offer_id' => $validated['offer_id'],
            'provider' => $validated['provider'] ?? null,
            'ticket_code' => $validated['code'] ?? null,
            'origin' => $validated['origin'] ?? null,
            'destination' => $validated['destination'] ?? null,
            'departure' => $validated['departure'] ?? null,
            'arrival' => $validated['arrival'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'baggage' => $validated['baggage'] ?? null,
            'cabin_class' => $validated['cabin_class'] ?? null,
            'customer_amount' => $validated['amount'],
            'customer_currency' => Str::upper($validated['currency']),
            'customer' => $customer,
            'ticket_snapshot' => $validated['ticket'] ?? [],
        ]);

        $payload['metadata']['reservation_id'] = $reservation->uuid;
        $payload['metadata']['reservation_reference'] = $reservation->reference;

        try {
            $response = Http::baseUrl(config('services.moneroo.base_url'))
                ->acceptJson()
                ->asJson()
                ->withToken($secretKey)
                ->timeout(20)
                ->post('/v1/payments/initialize', $payload);
        } catch (ConnectionException) {
            return response()->json([
                'data' => null,
                'meta' => ['message' => 'Impossible de joindre Moneroo pour le moment.'],
            ], 503);
        }

        if (! $response->successful()) {
            return response()->json([
                'data' => null,
                'meta' => [
                    'status' => $response->status(),
                    'message' => $response->json('message') ?: 'Le paiement Moneroo ne peut pas être initialisé.',
                    'errors' => $response->json('errors'),
                ],
            ], $response->status());
        }

        $reservation->update([
            'moneroo_payment_id' => $response->json('data.id'),
        ]);

        return response()->json([
            'data' => [
                'id' => $response->json('data.id'),
                'checkout_url' => $response->json('data.checkout_url'),
                'reservation' => [
                    'id' => $reservation->uuid,
                    'reference' => $reservation->reference,
                ],
            ],
            'meta' => [
                'message' => $response->json('message'),
            ],
        ], 201);
    }

    public function verify(string $paymentId): JsonResponse
    {
        $secretKey = config('services.moneroo.secret_key');

        if (! $secretKey) {
            return response()->json([
                'data' => null,
                'meta' => ['message' => 'Moneroo is not configured.'],
            ], 503);
        }

        try {
            $response = Http::baseUrl(config('services.moneroo.base_url'))
                ->acceptJson()
                ->withToken($secretKey)
                ->timeout(15)
                ->get("/v1/payments/{$paymentId}/verify");
        } catch (ConnectionException) {
            return response()->json([
                'data' => null,
                'meta' => ['message' => 'Impossible de vérifier le paiement Moneroo pour le moment.'],
            ], 503);
        }

        if ($response->successful()) {
            $status = $response->json('data.status');
            $reservation = FlightReservation::query()
                ->where('moneroo_payment_id', $paymentId)
                ->first();

            if ($reservation && $status) {
                $reservation->update([
                    'payment_status' => $status,
                    'status' => $status === 'success' ? 'payment_success' : ($status === 'failed' ? 'payment_failed' : $reservation->status),
                    'paid_at' => $status === 'success' ? now() : $reservation->paid_at,
                ]);
            }
        }

        return response()->json($response->json(), $response->status());
    }

    public function webhook(Request $request): JsonResponse
    {
        $secret = config('services.moneroo.webhook_secret');
        $signature = (string) $request->header('X-Moneroo-Signature');

        if ($secret) {
            $computedSignature = hash_hmac('sha256', $request->getContent(), $secret);

            if (! hash_equals($computedSignature, $signature)) {
                return response()->json(['message' => 'Forbidden'], 403);
            }
        }

        $event = $request->input('event');
        $paymentId = $request->input('data.id');

        if ($paymentId && str_starts_with((string) $event, 'payment.')) {
            $reservation = FlightReservation::query()
                ->where('moneroo_payment_id', $paymentId)
                ->first();

            if ($reservation) {
                $reservation->update([
                    'payment_status' => $request->input('data.status', $reservation->payment_status),
                    'status' => $event === 'payment.success' ? 'payment_success' : ($event === 'payment.failed' ? 'payment_failed' : $reservation->status),
                    'paid_at' => $event === 'payment.success' ? now() : $reservation->paid_at,
                ]);
            }
        }

        return response()->json(['message' => 'Webhook received']);
    }

    private function paymentDescription(array $validated): string
    {
        $provider = $validated['provider'] ?? 'compagnie';
        $code = $validated['code'] ?? $validated['offer_id'];

        return "Billet {$provider} {$code}";
    }
}
