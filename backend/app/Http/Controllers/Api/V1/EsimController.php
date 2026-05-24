<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EsimResource;
use App\Models\Esim;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EsimController extends Controller
{
    public function plans(): JsonResponse
    {
        return response()->json([
            'data' => [],
            'meta' => ['message' => 'Le fournisseur eSIM n’est pas configuré.'],
        ], 503);
    }

    public function myEsims(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        $esims = Esim::where('student_id', $student?->id)->latest()->get();

        return response()->json(['data' => EsimResource::collection($esims)]);
    }

    public function purchase(Request $request): JsonResponse
    {
        $request->validate([
            'plan_id' => ['required', 'string'],
        ]);

        $student = $request->user()->student;

        if (!$student) {
            return response()->json(['message' => 'Profil étudiant requis.'], 422);
        }

        return response()->json([
            'data' => null,
            'meta' => ['message' => 'Le fournisseur eSIM n’est pas configuré.'],
        ], 503);
    }
}
