<?php

namespace App\Services;

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\EventAttendee;
use Google\Service\Calendar\EventDateTime;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class GoogleCalendarService
{
    private Client $client;
    private ?Calendar $service = null;

    // Calendar ID — set GOOGLE_CALENDAR_ID in .env (defaults to primary)
    private string $calendarId;

    // Business hours (Europe/Paris)
    private const OPEN_HOUR  = 9;
    private const CLOSE_HOUR = 18;
    private const SLOT_MINUTES = 60;

    public function __construct()
    {
        $this->calendarId = config('services.google.calendar_id', 'primary');
        $this->client     = $this->buildClient();
    }

    private function buildClient(): Client
    {
        $client = new Client();
        $client->setApplicationName('StudyWay Booking');
        $client->setScopes([Calendar::CALENDAR, Calendar::CALENDAR_EVENTS]);
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');

        $credPath = storage_path('app/google/credentials.json');

        if (file_exists($credPath)) {
            $client->setAuthConfig($credPath);
        }

        $client->setRedirectUri(rtrim(config('app.url'), '/') . '/api/v1/calendar/callback');

        $tokenPath = storage_path('app/google/token.json');

        if (file_exists($tokenPath)) {
            $token = json_decode(file_get_contents($tokenPath), true);
            $client->setAccessToken($token);

            if ($client->isAccessTokenExpired() && $client->getRefreshToken()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
                file_put_contents($tokenPath, json_encode($client->getAccessToken()));
            }
        }

        return $client;
    }

    private function isConfigured(): bool
    {
        return file_exists(storage_path('app/google/credentials.json'))
            && file_exists(storage_path('app/google/token.json'))
            && !$this->client->isAccessTokenExpired();
    }

    private function getService(): Calendar
    {
        if ($this->service === null) {
            $this->service = new Calendar($this->client);
        }

        return $this->service;
    }

    /**
     * Return available 1-hour slots for a given date.
     * If Google Calendar is not configured, returns a sensible mock set.
     */
    public function getAvailableSlots(Carbon $date): array
    {
        if (!$this->isConfigured()) {
            return $this->getMockSlots($date);
        }

        try {
            return $this->fetchSlotsFromCalendar($date);
        } catch (\Throwable $e) {
            Log::warning('Google Calendar slot fetch failed', ['error' => $e->getMessage()]);
            return $this->getMockSlots($date);
        }
    }

    private function fetchSlotsFromCalendar(Carbon $date): array
    {
        $tz       = 'Europe/Paris';
        $dayStart = $date->copy()->setTimezone($tz)->startOfDay()->setHour(self::OPEN_HOUR)->setMinute(0)->setSecond(0);
        $dayEnd   = $date->copy()->setTimezone($tz)->startOfDay()->setHour(self::CLOSE_HOUR)->setMinute(0)->setSecond(0);

        $response = $this->getService()->freebusy->query(new \Google\Service\Calendar\FreeBusyRequest([
            'timeMin'  => $dayStart->toRfc3339String(),
            'timeMax'  => $dayEnd->toRfc3339String(),
            'timeZone' => $tz,
            'items'    => [['id' => $this->calendarId]],
        ]));

        $busy = collect($response->getCalendars()[$this->calendarId]->getBusy())
            ->map(fn($b) => [
                'start' => Carbon::parse($b->getStart())->setTimezone($tz),
                'end'   => Carbon::parse($b->getEnd())->setTimezone($tz),
            ]);

        $slots  = [];
        $cursor = $dayStart->copy();

        while ($cursor->copy()->addMinutes(self::SLOT_MINUTES)->lte($dayEnd)) {
            $slotEnd  = $cursor->copy()->addMinutes(self::SLOT_MINUTES);
            $occupied = $busy->first(fn($b) => $cursor->lt($b['end']) && $slotEnd->gt($b['start']));
            $slots[]  = [
                'time'      => $cursor->format('H:i'),
                'available' => $occupied === null,
            ];
            $cursor->addMinutes(self::SLOT_MINUTES);
        }

        return $slots;
    }

    private function getMockSlots(Carbon $date): array
    {
        // Weekends have no slots
        if ($date->isWeekend()) {
            return [];
        }

        $slots = [];

        for ($h = self::OPEN_HOUR; $h < self::CLOSE_HOUR; $h++) {
            // Simulate a few booked slots (11h and 14h are "taken" deterministically)
            $taken   = in_array($h, [11, 14], true);
            $slots[] = [
                'time'      => sprintf('%02d:00', $h),
                'available' => !$taken,
            ];
        }

        return $slots;
    }

    /**
     * Create a calendar event for the appointment.
     */
    public function createAppointment(array $data): array
    {
        if (!$this->isConfigured()) {
            return $this->mockConfirmation($data);
        }

        try {
            return $this->insertEvent($data);
        } catch (\Throwable $e) {
            Log::warning('Google Calendar event creation failed', ['error' => $e->getMessage()]);
            return $this->mockConfirmation($data);
        }
    }

    private function insertEvent(array $data): array
    {
        $tz    = 'Europe/Paris';
        $start = Carbon::parse("{$data['date']} {$data['time']}", $tz);
        $end   = $start->copy()->addMinutes(self::SLOT_MINUTES);

        $attendee = new EventAttendee();
        $attendee->setEmail($data['email']);
        $attendee->setDisplayName($data['name']);

        $startDt = new EventDateTime();
        $startDt->setDateTime($start->toRfc3339String());
        $startDt->setTimeZone($tz);

        $endDt = new EventDateTime();
        $endDt->setDateTime($end->toRfc3339String());
        $endDt->setTimeZone($tz);

        $event = new Event([
            'summary'     => "Rendez-vous StudyWay – {$data['name']}",
            'description' => "Objet : {$data['subject']}\nTéléphone : {$data['phone']}\nMessage : {$data['message']}",
            'start'       => $startDt,
            'end'         => $endDt,
            'attendees'   => [$attendee],
            'reminders'   => [
                'useDefault'  => false,
                'overrides'   => [
                    ['method' => 'email', 'minutes' => 60],
                    ['method' => 'popup', 'minutes' => 15],
                ],
            ],
        ]);

        $created = $this->getService()->events->insert($this->calendarId, $event, ['sendUpdates' => 'all']);

        return [
            'success'  => true,
            'event_id' => $created->getId(),
            'link'     => $created->getHtmlLink(),
            'date'     => $data['date'],
            'time'     => $data['time'],
            'name'     => $data['name'],
            'email'    => $data['email'],
        ];
    }

    private function mockConfirmation(array $data): array
    {
        return [
            'success'  => true,
            'event_id' => 'mock_' . uniqid(),
            'link'     => null,
            'date'     => $data['date'],
            'time'     => $data['time'],
            'name'     => $data['name'],
            'email'    => $data['email'],
        ];
    }

    /** Return the OAuth authorization URL (used in setup). */
    public function getAuthUrl(): string
    {
        return $this->client->createAuthUrl();
    }

    /** Exchange an auth code for a token and persist it. */
    public function handleAuthCode(string $code): void
    {
        $token = $this->client->fetchAccessTokenWithAuthCode($code);
        if (isset($token['error'])) {
            throw new \RuntimeException($token['error_description'] ?? $token['error']);
        }
        $this->client->setAccessToken($token);
        file_put_contents(storage_path('app/google/token.json'), json_encode($token));
    }
}
