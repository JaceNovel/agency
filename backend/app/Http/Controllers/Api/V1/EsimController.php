<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EsimResource;
use App\Models\Esim;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EsimController extends Controller
{
    // Available eSIM plans (mocked until real API integration)
    private array $plans = [
        ['id' => 'plan-fr-10', 'provider' => 'BNESIM', 'plan_name' => 'France 10 Go', 'country' => 'FR', 'data_gb' => 10, 'validity_days' => 30, 'has_calls' => false, 'has_sms' => false, 'price' => 18500, 'currency' => 'XOF'],
        ['id' => 'plan-fr-20', 'provider' => 'BNESIM', 'plan_name' => 'France 20 Go', 'country' => 'FR', 'data_gb' => 20, 'validity_days' => 30, 'has_calls' => true,  'has_sms' => true,  'price' => 31000, 'currency' => 'XOF'],
        ['id' => 'plan-eu-10', 'provider' => 'BNESIM', 'plan_name' => 'Europe 10 Go', 'country' => 'EU', 'data_gb' => 10, 'validity_days' => 30, 'has_calls' => false, 'has_sms' => false, 'price' => 23000, 'currency' => 'XOF'],
        ['id' => 'plan-eu-20', 'provider' => 'Airalo',  'plan_name' => 'Europe 20 Go', 'country' => 'EU', 'data_gb' => 20, 'validity_days' => 30, 'has_calls' => true,  'has_sms' => true,  'price' => 40000, 'currency' => 'XOF'],
    ];

    public function plans(): JsonResponse
    {
        return response()->json(['data' => $this->plans]);
    }

    public function myEsims(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        $esims = Esim::where('student_id', $student?->id)->latest()->get();

        return response()->json(['data' => EsimResource::collection($esims)]);
    }

    public function purchase(Request $request): JsonResponse
    {
        $data = $request->validate([
            'plan_id' => ['required', 'string'],
        ]);

        $student = $request->user()->student;

        if (!$student) {
            return response()->json(['message' => 'Profil étudiant requis.'], 422);
        }

        $plan = collect($this->plans)->firstWhere('id', $data['plan_id']);

        if (!$plan) {
            return response()->json(['message' => 'Forfait introuvable.'], 404);
        }

        $esim = Esim::create([
            'student_id'    => $student->id,
            'provider'      => $plan['provider'],
            'plan_name'     => $plan['plan_name'],
            'country'       => $plan['country'],
            'data_gb'       => $plan['data_gb'],
            'validity_days' => $plan['validity_days'],
            'has_calls'     => $plan['has_calls'],
            'has_sms'       => $plan['has_sms'],
            'price'         => $plan['price'],
            'currency'      => $plan['currency'],
            'status'        => 'pending',
        ]);

        return response()->json(['data' => new EsimResource($esim)], 201);
    }
}
