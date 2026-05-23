<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->uuid,
            'body'        => $this->body,
            'attachments' => $this->attachments ?? [],
            'read_at'     => $this->read_at?->toDateTimeString(),
            'is_mine'     => $this->user_id === $request->user()?->id,
            'sender'      => $this->whenLoaded('user', fn () => [
                'id'     => $this->user->uuid,
                'name'   => $this->user->name,
                'avatar' => $this->user->avatar_url,
            ]),
            'created_at'  => $this->created_at?->toDateTimeString(),
        ];
    }
}
