<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAppointmentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $appointments = Appointment::with('student.user', 'staff')
            ->when($request->date, fn ($q, $d) => $q->whereDate('date', $d))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderBy('date')
            ->orderBy('time')
            ->paginate(20);

        return response()->json([
            'data' => AppointmentResource::collection($appointments),
            'meta' => ['total' => $appointments->total()],
        ]);
    }

    public function update(Request $request, string $uuid): JsonResponse
    {
        $data = $request->validate([
            'status'   => ['sometimes', 'in:pending,confirmed,cancelled,done'],
            'staff_id' => ['sometimes', 'nullable', 'string'],
        ]);

        $appointment = Appointment::where('uuid', $uuid)->firstOrFail();

        if (!empty($data['staff_id'])) {
            $staff = \App\Models\User::where('uuid', $data['staff_id'])->first();
            $data['staff_id'] = $staff?->id;
        }

        $appointment->update($data);

        return response()->json(['data' => new AppointmentResource($appointment->fresh())]);
    }
}
