<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisaApplicationResource;
use App\Models\VisaApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminVisaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $visas = VisaApplication::with('student.user', 'assignedAgent')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => VisaApplicationResource::collection($visas),
            'meta' => ['total' => $visas->total()],
        ]);
    }

    public function update(Request $request, string $uuid): JsonResponse
    {
        $data = $request->validate([
            'status'          => ['sometimes', 'string', 'in:not_started,preparation,submitted,appointment,interview,decision,approved,rejected'],
            'appointment_date'=> ['sometimes', 'nullable', 'date'],
            'agent_notes'     => ['sometimes', 'nullable', 'string', 'max:2000'],
            'rejection_reason'=> ['sometimes', 'nullable', 'string', 'max:500'],
        ]);

        $visa = VisaApplication::where('uuid', $uuid)->firstOrFail();
        $visa->update($data);

        return response()->json(['data' => new VisaApplicationResource($visa->fresh())]);
    }

    public function assign(Request $request, string $uuid): JsonResponse
    {
        $request->validate(['agent_uuid' => ['required', 'string']]);

        $visa = VisaApplication::where('uuid', $uuid)->firstOrFail();

        $agent = \App\Models\User::where('uuid', $request->agent_uuid)->firstOrFail();
        $visa->update(['assigned_agent_id' => $agent->id]);

        return response()->json(['message' => 'Agent assigné.']);
    }
}
