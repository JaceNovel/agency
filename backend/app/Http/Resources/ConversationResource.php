<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->uuid,
            'db_id'           => $this->id,
            'type'            => $this->type,
            'title'           => $this->title,
            'last_message_at' => $this->last_message_at?->toDateTimeString(),
            'updated_at'      => $this->updated_at?->toDateTimeString(),
            'unread_count'    => $this->unread_count ?? 0,
            'last_message'    => $this->whenLoaded('lastMessage', fn () => $this->lastMessage?->body)
                ?? $this->whenLoaded('messages', fn () => $this->messages->last()?->body),
            'student'         => $this->whenLoaded('student', fn () => $this->student ? [
                'id'         => $this->student->id,
                'first_name' => $this->student->first_name ?? $this->student->user?->first_name,
                'last_name'  => $this->student->last_name ?? $this->student->user?->last_name,
                'email'      => $this->student->email ?? $this->student->user?->email,
            ] : null),
            'user'            => $this->whenLoaded('user', fn () => $this->user ? [
                'id'    => $this->user->id,
                'name'  => $this->user->name,
                'email' => $this->user->email,
            ] : null),
            'created_at'      => $this->created_at?->toDateTimeString(),
        ];
    }
}
