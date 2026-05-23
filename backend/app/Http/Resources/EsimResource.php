<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EsimResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->uuid,
            'provider'      => $this->provider,
            'plan_name'     => $this->plan_name,
            'iccid'         => $this->iccid,
            'qr_code_url'   => $this->qr_code_url,
            'country'       => $this->country,
            'data_gb'       => $this->data_gb,
            'validity_days' => $this->validity_days,
            'has_calls'     => $this->has_calls,
            'has_sms'       => $this->has_sms,
            'price'         => $this->price,
            'currency'      => $this->currency,
            'status'        => $this->status,
            'activated_at'  => $this->activated_at?->toDateTimeString(),
            'expires_at'    => $this->expires_at?->toDateTimeString(),
        ];
    }
}
