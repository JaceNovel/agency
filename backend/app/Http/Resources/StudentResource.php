<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $notes = collect($this->metadata['notes'] ?? [])
            ->map(fn ($n) => [
                'note'       => $n['body'] ?? $n['note'] ?? '',
                'author'     => $n['author'] ?? '',
                'created_at' => $n['created_at'] ?? '',
            ])
            ->toArray();

        return [
            'id'                  => $this->uuid,
            'student_code'        => $this->student_code,
            // Flat user fields for easy Flutter consumption
            'name'                => $this->user?->name,
            'first_name'          => $this->user?->first_name ?? explode(' ', $this->user?->name ?? '')[0],
            'last_name'           => $this->user?->last_name ?? implode(' ', array_slice(explode(' ', $this->user?->name ?? ''), 1)),
            'email'               => $this->user?->email,
            'phone'               => $this->user?->phone ?? $this->user?->phone_number,
            'avatar_url'          => $this->user?->avatar_url,
            // Student-specific
            'destination_country' => $this->destination_country,
            'nationality'         => $this->nationality,
            'birth_date'          => $this->birth_date,
            'birth_city'          => $this->birth_city,
            'passport_number'     => $this->passport_number,
            'passport_expiry'     => $this->passport_expiry,
            'current_level'       => $this->current_level,
            'program_level'       => $this->program_level,
            'program_interest'    => $this->program_interest,
            'profile_completion'  => $this->profile_completion,
            'file_status'         => $this->file_status,
            'status'              => $this->file_status,
            'visa_status'         => $this->visa_status,
            'target_intake'       => $this->target_intake,
            // Nested relations (loaded on detail only)
            'documents'           => $this->whenLoaded('documents', fn () =>
                DocumentResource::collection($this->documents)
            ),
            'payments'            => $this->whenLoaded('payments', fn () =>
                PaymentResource::collection($this->payments)
            ),
            'notes'               => $notes,
            // Counts
            'applications_count'  => $this->whenCounted('applications'),
            'documents_count'     => $this->whenCounted('documents'),
            'payments_count'      => $this->whenCounted('payments'),
            'created_at'          => $this->created_at?->toDateTimeString(),
        ];
    }
}
