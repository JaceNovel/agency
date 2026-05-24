<?php

namespace App\Repositories;

use App\Models\Application;
use App\Models\Document;
use App\Models\Payment;
use App\Models\Student;
use App\Models\University;

class DashboardRepository
{
    public function studentOverview(?Student $student): array
    {
        $studentId = $student?->id;

        return [
            'stats' => [
                'dossiers'      => $student ? $student->documents()->count() : 0,
                'approved'      => $studentId ? Document::where('student_id', $studentId)->where('status', 'approved')->count() : 0,
                'pending'       => $studentId ? Document::where('student_id', $studentId)->where('status', 'pending')->count() : 0,
                'universities'  => University::count(),
            ],
            'progress' => $student?->profile_completion ?? 68,
            'visa_status' => $student?->visa_status ?? 'in_review',
            'recent_payments' => $studentId ? Payment::where('student_id', $studentId)->latest()->limit(5)->get() : collect(),
            'applications'    => $studentId ? Application::where('student_id', $studentId)->latest()->limit(5)->get() : collect(),
            'timeline'        => [],
        ];
    }
}
