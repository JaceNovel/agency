<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParcoursupFormationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'formation_id' => $this->formation_id,
            'formation_name' => $this->formation_name,
            'university_name' => $this->university_name,
            'city' => $this->city,
            'region' => $this->region,
            'country' => $this->country,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'formation_type' => $this->formation_type,
            'specialization' => $this->specialization,
            'duration' => $this->duration,
            'admission_rate' => $this->admission_rate,
            'capacity' => $this->capacity,
            'website' => $this->website,
            'image_url' => $this->image_url,
            'description' => $this->description,
            'tuition' => $this->tuition,
            'is_favorite' => (bool) ($this->is_favorite ?? false),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
