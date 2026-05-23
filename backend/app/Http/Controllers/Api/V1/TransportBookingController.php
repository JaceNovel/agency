<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransportBookingResource;
use App\Models\TransportBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransportBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $student = $request->user()->student;

        $bookings = TransportBooking::where('student_id', $student?->id)
            ->latest()
            ->get();

        return response()->json(['data' => TransportBookingResource::collection($bookings)]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'vehicle_type'        => ['required', 'string', 'max:60'],
            'pickup_airport'      => ['required', 'string', 'max:10'],
            'pickup_date'         => ['required', 'date', 'after_or_equal:today'],
            'pickup_time'         => ['required', 'regex:/^\d{2}:\d{2}$/'],
            'flight_number'       => ['nullable', 'string', 'max:20'],
            'destination_address' => ['required', 'string', 'max:255'],
            'baggage_count'       => ['required', 'integer', 'min:0', 'max:10'],
            'passenger_name'      => ['required', 'string', 'max:120'],
            'passenger_email'     => ['required', 'email'],
            'passenger_phone'     => ['required', 'string', 'max:30'],
            'notes'               => ['nullable', 'string', 'max:500'],
            'price'               => ['sometimes', 'integer', 'min:0'],
        ]);

        $student = $request->user()->student;

        $booking = TransportBooking::create([
            ...$data,
            'student_id' => $student?->id,
            'provider'   => 'StudyWay Transfer',
            'currency'   => 'XOF',
        ]);

        return response()->json(['data' => new TransportBookingResource($booking)], 201);
    }

    public function show(Request $request, string $uuid): JsonResponse
    {
        $student = $request->user()->student;

        $booking = TransportBooking::where('uuid', $uuid)
            ->where('student_id', $student?->id)
            ->firstOrFail();

        return response()->json(['data' => new TransportBookingResource($booking)]);
    }
}
