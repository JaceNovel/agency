<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'student_code' => $this->student_code,
            'name' => $this->user?->name,
            'email' => $this->user?->email,
            'destination_country' => $this->destination_country,
            'program_level' => $this->program_level,
            'program_interest' => $this->program_interest,
            'profile_completion' => $this->profile_completion,
            'file_status' => $this->file_status,
            'visa_status' => $this->visa_status,
            'target_intake' => $this->target_intake,
            'applications_count' => $this->whenCounted('applications'),
            'documents_count' => $this->whenCounted('documents'),
            'payments_count' => $this->whenCounted('payments'),
        ];
    }
}
