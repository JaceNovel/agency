<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\GoogleCalendarService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

class CalendarController extends Controller
{
    public function __construct(private readonly GoogleCalendarService $calendar) {}

    /**
     * GET /api/v1/calendar/slots?date=2025-06-10
     * Returns available 1-hour time slots for the requested date.
     */
    public function slots(Request $request): JsonResponse
    {
        $request->validate([
            'date' => ['required', 'date', 'after_or_equal:today'],
        ]);

        $date  = Carbon::parse($request->input('date'));

        if ($date->isWeekend()) {
            return response()->json([
                'date'  => $date->toDateString(),
                'slots' => [],
                'note'  => 'Pas de rendez-vous le week-end.',
            ]);
        }

        try {
            $slots = $this->calendar->getAvailableSlots($date);
        } catch (\Throwable $exception) {
            return response()->json([
                'message' => 'Le calendrier de rendez-vous n’est pas configuré.',
            ], 503);
        }

        return response()->json([
            'date'  => $date->toDateString(),
            'slots' => $slots,
        ]);
    }

    /**
     * POST /api/v1/calendar/appointments
     * Books an appointment and creates a Google Calendar event.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'date'    => ['required', 'date', 'after_or_equal:today'],
            'time'    => ['required', 'regex:/^\d{2}:\d{2}$/'],
            'name'    => ['required', 'string', 'max:120'],
            'email'   => ['required', 'email'],
            'phone'   => ['required', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:200'],
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        $data['message'] = $data['message'] ?? '';

        try {
            $result = $this->calendar->createAppointment($data);
        } catch (\Throwable $exception) {
            return response()->json([
                'message' => 'Le calendrier de rendez-vous n’est pas configuré.',
            ], 503);
        }

        return response()->json($result, 201);
    }

    /**
     * GET /api/v1/calendar/auth
     * Returns the Google OAuth authorization URL (admin setup only).
     */
    public function authUrl(): JsonResponse
    {
        return response()->json(['url' => $this->calendar->getAuthUrl()]);
    }

    /**
     * GET /api/v1/calendar/callback?code=...
     * Handles the OAuth callback and stores the token.
     */
    public function callback(Request $request): JsonResponse
    {
        $request->validate(['code' => ['required', 'string']]);

        $this->calendar->handleAuthCode($request->input('code'));

        return response()->json(['success' => true, 'message' => 'Google Calendar connecté avec succès.']);
    }
}
