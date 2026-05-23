<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $conversations = $request->user()
            ->conversations()
            ->with(['messages' => fn ($q) => $q->latest()->limit(1), 'users'])
            ->latest('last_message_at')
            ->get();

        return response()->json(['data' => ConversationResource::collection($conversations)]);
    }

    public function show(Request $request, string $uuid): JsonResponse
    {
        $conversation = Conversation::where('uuid', $uuid)
            ->whereHas('users', fn ($q) => $q->where('users.id', $request->user()->id))
            ->with(['messages.user', 'users'])
            ->firstOrFail();

        // Mark messages as read
        $conversation->messages()
            ->where('user_id', '!=', $request->user()->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json([
            'data' => [
                'conversation' => new ConversationResource($conversation),
                'messages'     => MessageResource::collection($conversation->messages),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'   => ['sometimes', 'string', 'max:120'],
            'type'    => ['sometimes', 'string', 'in:support,travel,housing,visa,general'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $student = $request->user()->student;

        $conversation = Conversation::create([
            'type'       => $data['type'] ?? 'support',
            'title'      => $data['title'] ?? 'Nouvelle conversation',
            'student_id' => $student?->id,
        ]);

        $conversation->users()->attach($request->user()->id);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id'         => $request->user()->id,
            'body'            => $data['message'],
        ]);

        $conversation->update(['last_message_at' => now()]);

        return response()->json(['data' => new ConversationResource($conversation->load('messages', 'users'))], 201);
    }

    public function sendMessage(Request $request, string $uuid): JsonResponse
    {
        $request->validate([
            'body'        => ['required', 'string', 'max:2000'],
            'attachments' => ['sometimes', 'array'],
        ]);

        $conversation = Conversation::where('uuid', $uuid)
            ->whereHas('users', fn ($q) => $q->where('users.id', $request->user()->id))
            ->firstOrFail();

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id'         => $request->user()->id,
            'body'            => $request->body,
            'attachments'     => $request->attachments,
        ]);

        $conversation->update(['last_message_at' => now()]);

        return response()->json(['data' => new MessageResource($message->load('user'))], 201);
    }
}
