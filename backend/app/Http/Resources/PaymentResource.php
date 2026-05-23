<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->uuid,
            'reference'    => $this->reference,
            'label'        => $this->label,
            'amount'       => $this->amount,
            'currency'     => $this->currency,
            'method'       => $this->method,
            'status'       => $this->status,
            'paid_at'      => $this->paid_at?->toDateTimeString(),
            'validated_at' => $this->validated_at?->toDateTimeString(),
            'created_at'   => $this->created_at?->toDateTimeString(),
        ];
    }
}
