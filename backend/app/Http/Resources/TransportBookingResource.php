<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransportBookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->uuid,
            'provider'            => $this->provider,
            'vehicle_type'        => $this->vehicle_type,
            'pickup_airport'      => $this->pickup_airport,
            'pickup_date'         => $this->pickup_date?->toDateString(),
            'pickup_time'         => $this->pickup_time,
            'flight_number'       => $this->flight_number,
            'destination_address' => $this->destination_address,
            'baggage_count'       => $this->baggage_count,
            'passenger_name'      => $this->passenger_name,
            'passenger_email'     => $this->passenger_email,
            'passenger_phone'     => $this->passenger_phone,
            'price'               => $this->price,
            'currency'            => $this->currency,
            'status'              => $this->status,
            'created_at'          => $this->created_at?->toDateTimeString(),
        ];
    }
}
