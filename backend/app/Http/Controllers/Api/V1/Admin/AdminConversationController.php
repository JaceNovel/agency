<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminConversationController extends Controller
{
    public function index(): JsonResponse
    {
        $conversations = Conversation::with(['student', 'lastMessage'])
            ->withCount(['messages as unread_count' => function ($q) {
                $q->whereNull('read_at');
            }])
            ->orderByDesc('updated_at')
            ->get();

        return response()->json(['data' => ConversationResource::collection($conversations)]);
    }

    public function show(string $uuid): JsonResponse
    {
        $conversation = Conversation::with([
            'student',
            'messages' => fn ($q) => $q->orderBy('created_at'),
        ])
            ->where('id', $uuid)
            ->orWhere('uuid', $uuid)
            ->firstOrFail();

        // Mark all messages in this conversation as read
        $conversation->messages()->whereNull('read_at')->update(['read_at' => now()]);

        return response()->json([
            'data' => array_merge(
                (new ConversationResource($conversation))->resolve(),
                ['messages' => MessageResource::collection($conversation->messages)]
            ),
        ]);
    }

    public function sendMessage(Request $request, string $uuid): JsonResponse
    {
        $conversation = Conversation::where('id', $uuid)->orWhere('uuid', $uuid)->firstOrFail();

        $validated = $request->validate(['body' => 'required|string|max:5000']);

        $message = $conversation->messages()->create([
            'user_id' => $request->user()->id,
            'body'    => $validated['body'],
        ]);

        $conversation->update(['last_message_at' => now()]);

        return response()->json(['data' => new MessageResource($message)], 201);
    }
}
