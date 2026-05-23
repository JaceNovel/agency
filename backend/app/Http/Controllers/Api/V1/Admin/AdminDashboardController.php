<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Conversation;
use App\Models\Document;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Travel;
use App\Models\User;
use App\Models\VisaApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $today = Carbon::today();

        return response()->json([
            'data' => [
                'stats' => [
                    'total_students'         => Student::count(),
                    'new_students_this_month' => Student::whereMonth('created_at', $today->month)->count(),
                    'pending_documents'      => Document::where('status', 'pending')->count(),
                    'pending_payments'       => Payment::where('status', 'pending')->count(),
                    'unread_messages'        => Conversation::whereHas('messages', fn ($q) => $q->whereNull('read_at'))->count(),
                    'travels_today'          => Travel::whereDate('departure_date', $today)->count(),
                    'active_visa_files'      => VisaApplication::whereNotIn('status', ['approved', 'rejected'])->count(),
                    'appointments_today'     => Appointment::whereDate('date', $today)->where('status', 'confirmed')->count(),
                ],
                'recent_students' => Student::with('user')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn ($s) => [
                        'id'          => $s->uuid,
                        'name'        => $s->user->name,
                        'email'       => $s->user->email,
                        'file_status' => $s->file_status,
                        'visa_status' => $s->visa_status,
                        'created_at'  => $s->created_at->toDateTimeString(),
                    ]),
                'pending_documents' => Document::where('status', 'pending')
                    ->with('student.user')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn ($d) => [
                        'id'           => $d->uuid,
                        'type'         => $d->type,
                        'name'         => $d->name,
                        'student_name' => $d->student->user->name ?? '—',
                        'created_at'   => $d->created_at->toDateTimeString(),
                    ]),
            ],
        ]);
    }
}
