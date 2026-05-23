<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminPaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $payments = Payment::with('student.user', 'validatedBy')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => PaymentResource::collection($payments),
            'meta' => ['total' => $payments->total()],
        ]);
    }

    public function validate(Request $request, string $uuid): JsonResponse
    {
        $request->validate(['status' => ['required', 'in:validated,rejected']]);

        $payment = Payment::where('uuid', $uuid)->firstOrFail();

        $payment->update([
            'status'       => $request->status,
            'validated_by' => $request->user()->id,
            'validated_at' => now(),
        ]);

        return response()->json(['data' => new PaymentResource($payment->fresh())]);
    }
}
