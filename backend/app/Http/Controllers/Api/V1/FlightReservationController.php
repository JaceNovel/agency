<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FlightReservation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class FlightReservationController extends Controller
{
    public function index(): JsonResponse
    {
        $reservations = FlightReservation::query()
            ->latest()
            ->limit(20)
            ->get()
            ->map(fn (FlightReservation $reservation): array => $this->normalise($reservation));

        return response()->json([
            'data' => $reservations,
        ]);
    }

    public function show(FlightReservation $reservation): JsonResponse
    {
        return response()->json([
            'data' => $this->normalise($reservation),
        ]);
    }

    public function ticket(FlightReservation $reservation): Response
    {
        $html = $this->ticketHtml($reservation);
        $pdf = Pdf::loadHTML($html)->setPaper('a4');

        return $pdf->download("billet-{$reservation->reference}.pdf");
    }

    private function normalise(FlightReservation $reservation): array
    {
        return [
            'id' => $reservation->uuid,
            'reference' => $reservation->reference,
            'status' => $reservation->status,
            'status_label' => $this->statusLabel($reservation->status),
            'payment_status' => $reservation->payment_status,
            'moneroo_payment_id' => $reservation->moneroo_payment_id,
            'provider_order_id' => $reservation->duffel_order_id,
            'booking_reference' => $reservation->booking_reference,
            'ticket_number' => $reservation->ticket_number,
            'provider' => $reservation->provider,
            'ticket_code' => $reservation->ticket_code,
            'origin' => $reservation->origin,
            'destination' => $reservation->destination,
            'departure' => $reservation->departure,
            'arrival' => $reservation->arrival,
            'duration' => $reservation->duration,
            'baggage' => $reservation->baggage,
            'cabin_class' => $reservation->cabin_class,
            'amount' => $reservation->customer_amount,
            'currency' => $reservation->customer_currency,
            'price_label' => $this->formatMoney($reservation->customer_amount, $reservation->customer_currency),
            'customer' => $reservation->customer,
            'created_at' => $reservation->created_at?->toIso8601String(),
            'paid_at' => $reservation->paid_at?->toIso8601String(),
            'issued_at' => $reservation->issued_at?->toIso8601String(),
            'ticket_url' => route('flight-reservations.ticket', $reservation),
        ];
    }

    private function ticketHtml(FlightReservation $reservation): string
    {
        $customer = $reservation->customer ?? [];
        $passenger = trim(($customer['first_name'] ?? '').' '.($customer['last_name'] ?? '')) ?: 'Passager StudyWay';
        $status = $this->statusLabel($reservation->status);
        $price = $this->formatMoney($reservation->customer_amount, $reservation->customer_currency);
        $bookingReference = $reservation->booking_reference ?: 'En cours de confirmation';
        $ticketNumber = $reservation->ticket_number ?: 'Disponible après émission';

        return <<<HTML
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: DejaVu Sans, sans-serif; color: #0f172a; margin: 34px; }
    .header { border-bottom: 3px solid #1d4ed8; padding-bottom: 18px; margin-bottom: 28px; }
    .brand { font-size: 28px; font-weight: 800; color: #123a8c; }
    .muted { color: #64748b; font-size: 13px; }
    .panel { border: 1px solid #dbeafe; border-radius: 10px; padding: 18px; margin-top: 16px; }
    .grid { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .grid td { padding: 10px 0; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    .label { color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .value { font-size: 16px; font-weight: 800; }
    .badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 8px 12px; border-radius: 999px; font-weight: 800; }
    .route { font-size: 34px; font-weight: 900; margin: 18px 0 8px; }
    .footer { margin-top: 32px; font-size: 12px; color: #64748b; line-height: 1.7; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">StudyWay</div>
    <div class="muted">Billet de voyage - {$this->escape($reservation->reference)}</div>
  </div>
  <span class="badge">{$this->escape($status)}</span>
  <div class="route">{$this->escape($reservation->origin ?: 'Départ')} → {$this->escape($reservation->destination ?: 'Arrivée')}</div>
  <div class="muted">{$this->escape($reservation->provider ?: 'Compagnie')} · {$this->escape($reservation->ticket_code ?: 'Vol à confirmer')}</div>
  <div class="panel">
    <table class="grid">
      <tr><td><div class="label">Passager</div><div class="value">{$this->escape($passenger)}</div></td><td><div class="label">Email</div><div class="value">{$this->escape($customer['email'] ?? '-')}</div></td></tr>
      <tr><td><div class="label">Départ</div><div class="value">{$this->escape($reservation->departure ?: '-')}</div></td><td><div class="label">Arrivée</div><div class="value">{$this->escape($reservation->arrival ?: '-')}</div></td></tr>
      <tr><td><div class="label">Durée</div><div class="value">{$this->escape($reservation->duration ?: '-')}</div></td><td><div class="label">Cabine</div><div class="value">{$this->escape($reservation->cabin_class ?: '-')}</div></td></tr>
      <tr><td><div class="label">Référence réservation</div><div class="value">{$this->escape($bookingReference)}</div></td><td><div class="label">Numéro e-ticket</div><div class="value">{$this->escape($ticketNumber)}</div></td></tr>
      <tr><td><div class="label">Bagage</div><div class="value">{$this->escape($reservation->baggage ?: '-')}</div></td><td><div class="label">Prix</div><div class="value">{$this->escape($price)}</div></td></tr>
    </table>
  </div>
  <div class="footer">
    Ce document est généré par StudyWay à partir des informations de réservation disponibles. Si le statut indique une émission en cours, le billet final sera mis à jour dès que la commande est confirmée et que les documents électroniques sont disponibles.
  </div>
</body>
</html>
HTML;
    }

    private function statusLabel(string $status): string
    {
        return match ($status) {
            'issued' => 'Billet émis',
            'duffel_order_created' => 'Commande créée',
            'payment_success' => 'Paiement validé',
            'payment_failed' => 'Paiement échoué',
            default => 'Paiement en attente',
        };
    }

    private function formatMoney(int $amount, string $currency): string
    {
        $value = number_format($amount, 0, ',', ' ');

        return strtoupper($currency) === 'XOF' ? "{$value} FCFA" : "{$value} ".strtoupper($currency);
    }

    private function escape(?string $value): string
    {
        return e($value ?? '');
    }
}
