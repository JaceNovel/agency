<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->uuid,
            'type'               => $this->type,
            'name'               => $this->name,
            'mime_type'          => $this->mime_type,
            'size'               => $this->size,
            'status'             => $this->status,
            'version'            => $this->version,
            'validation_comment' => $this->validation_comment,
            'validated_at'       => $this->validated_at?->toDateTimeString(),
            'validated_by'       => $this->whenLoaded('validatedBy', fn () => $this->validatedBy?->name),
            'created_at'         => $this->created_at?->toDateTimeString(),
        ];
    }
}
