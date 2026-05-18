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
        return [
            'stats' => [
                'dossiers' => $student ? $student->documents()->count() : Document::count(),
                'approved' => Document::where('status', 'approved')->count(),
                'pending' => Document::where('status', 'pending')->count(),
                'universities' => University::count(),
            ],
            'progress' => $student?->profile_completion ?? 68,
            'visa_status' => $student?->visa_status ?? 'in_review',
            'recent_payments' => Payment::latest()->limit(5)->get(),
            'applications' => Application::latest()->limit(5)->get(),
            'timeline' => [
                ['title' => 'Entretien Campus France', 'date' => '2026-06-20', 'status' => 'upcoming'],
                ['title' => 'Depot de dossier universite', 'date' => '2026-06-22', 'status' => 'upcoming'],
                ['title' => 'Paiement frais universitaires', 'date' => '2026-06-25', 'status' => 'upcoming'],
            ],
        ];
    }
}
