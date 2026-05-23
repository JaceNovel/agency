<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisaApplicationResource;
use App\Models\VisaApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VisaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        if (!$student) {
            return response()->json(['data' => []]);
        }

        $visas = VisaApplication::where('student_id', $student->id)
            ->with('assignedAgent')
            ->latest()
            ->get();

        return response()->json(['data' => VisaApplicationResource::collection($visas)]);
    }

    public function show(Request $request, string $uuid): JsonResponse
    {
        $student = $request->user()->student;

        $visa = VisaApplication::where('uuid', $uuid)
            ->where('student_id', $student?->id)
            ->with('assignedAgent')
            ->firstOrFail();

        return response()->json(['data' => new VisaApplicationResource($visa)]);
    }

    public function store(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        if (!$student) {
            return response()->json(['message' => 'Profil étudiant introuvable.'], 422);
        }

        $data = $request->validate([
            'visa_type'           => ['required', 'string', 'max:60'],
            'destination_country' => ['required', 'string', 'max:60'],
        ]);

        $existing = VisaApplication::where('student_id', $student->id)
            ->whereNotIn('status', ['approved', 'rejected'])
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Un dossier visa est déjà en cours.'], 422);
        }

        $visa = VisaApplication::create([
            'student_id'          => $student->id,
            'visa_type'           => $data['visa_type'],
            'destination_country' => $data['destination_country'],
            'status'              => 'preparation',
        ]);

        return response()->json(['data' => new VisaApplicationResource($visa)], 201);
    }
}
