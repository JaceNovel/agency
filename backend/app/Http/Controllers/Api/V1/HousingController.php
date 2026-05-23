<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\HousingRequest;
use App\Models\Logement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HousingController extends Controller
{
    public function listings(Request $request): JsonResponse
    {
        $query = Logement::query();

        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('max_price')) {
            $query->where('monthly_price', '<=', $request->max_price);
        }
        if ($request->boolean('no_guarantor')) {
            $query->where('requires_guarantor', false);
        }

        $listings = $query->where('availability_status', 'available')->paginate(20);

        return response()->json([
            'data' => $listings->items(),
            'meta' => [
                'current_page' => $listings->currentPage(),
                'last_page'    => $listings->lastPage(),
                'total'        => $listings->total(),
            ],
        ]);
    }

    public function myRequests(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        $requests = HousingRequest::where('student_id', $student?->id)
            ->with('logement')
            ->latest()
            ->get();

        return response()->json(['data' => $requests]);
    }

    public function storeRequest(Request $request): JsonResponse
    {
        $data = $request->validate([
            'city'           => ['required', 'string', 'max:80'],
            'guarantor_type' => ['required', 'in:none,visale,garantme,private'],
            'move_in_date'   => ['nullable', 'date'],
            'budget_max'     => ['nullable', 'integer', 'min:0'],
            'logement_id'    => ['nullable', 'string'],
            'notes'          => ['nullable', 'string', 'max:500'],
        ]);

        $student = $request->user()->student;

        if (!$student) {
            return response()->json(['message' => 'Profil étudiant requis.'], 422);
        }

        $logementId = null;
        if (!empty($data['logement_id'])) {
            $logement = Logement::where('uuid', $data['logement_id'])->first();
            $logementId = $logement?->id;
        }

        $housingRequest = HousingRequest::create([
            'student_id'     => $student->id,
            'logement_id'    => $logementId,
            'city'           => $data['city'],
            'guarantor_type' => $data['guarantor_type'],
            'move_in_date'   => $data['move_in_date'] ?? null,
            'budget_max'     => $data['budget_max'] ?? null,
            'notes'          => $data['notes'] ?? null,
        ]);

        return response()->json(['data' => $housingRequest], 201);
    }
}
