<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDocumentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $documents = Document::with('student.user', 'validatedBy')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->type, fn ($q, $t) => $q->where('type', $t))
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => DocumentResource::collection($documents),
            'meta' => ['total' => $documents->total(), 'last_page' => $documents->lastPage()],
        ]);
    }

    public function validate(Request $request, string $uuid): JsonResponse
    {
        $request->validate([
            'status'             => ['required', 'in:validated,rejected'],
            'validation_comment' => ['nullable', 'string', 'max:500'],
        ]);

        $document = Document::where('uuid', $uuid)->firstOrFail();

        $document->update([
            'status'             => $request->status,
            'validation_comment' => $request->validation_comment,
            'validated_by'       => $request->user()->id,
            'validated_at'       => now(),
        ]);

        return response()->json(['data' => new DocumentResource($document->fresh())]);
    }
}
