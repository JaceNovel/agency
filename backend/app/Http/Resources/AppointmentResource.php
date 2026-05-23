<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->uuid,
            'name'              => $this->name,
            'email'             => $this->email,
            'phone'             => $this->phone,
            'subject'           => $this->subject,
            'message'           => $this->message,
            'date'              => $this->date?->toDateString(),
            'time'              => $this->time,
            'type'              => $this->type,
            'status'            => $this->status,
            'google_event_id'   => $this->google_event_id,
            'google_event_link' => $this->google_event_link,
            'created_at'        => $this->created_at?->toDateTimeString(),
        ];
    }
}
