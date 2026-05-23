<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisaApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->uuid,
            'visa_type'           => $this->visa_type,
            'destination_country' => $this->destination_country,
            'status'              => $this->status,
            'appointment_date'    => $this->appointment_date?->toDateString(),
            'submitted_at'        => $this->submitted_at?->toDateString(),
            'decision_at'         => $this->decision_at?->toDateString(),
            'agent_notes'         => $this->agent_notes,
            'rejection_reason'    => $this->rejection_reason,
            'required_documents'  => $this->required_documents ?? [],
            'assigned_agent'      => $this->whenLoaded('assignedAgent', fn () => [
                'id'   => $this->assignedAgent->uuid,
                'name' => $this->assignedAgent->name,
            ]),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
