<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Conversation;
use App\Models\Financing;
use App\Models\Flight;
use App\Models\Logement;
use App\Models\Message;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Travel;
use App\Models\University;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $permissions = [
            'students.view', 'students.manage',
            'finance.view', 'finance.validate',
            'travel.view', 'travel.manage',
            'documents.view', 'documents.validate',
            'messages.view', 'messages.reply',
            'admin.access',
        ];

        collect($permissions)->each(fn (string $permission) => Permission::firstOrCreate(['name' => $permission]));

        $roles = [
            'SUPER_ADMIN' => $permissions,
            'STAFF' => ['students.view', 'students.manage', 'documents.view', 'documents.validate', 'messages.view', 'messages.reply'],
            'ACCOUNTANT' => ['finance.view', 'finance.validate'],
            'MOBILITY_AGENT' => ['students.view', 'travel.view', 'travel.manage', 'messages.view', 'messages.reply'],
            'STUDENT' => ['documents.view', 'finance.view', 'travel.view', 'messages.view'],
            'PARENT' => ['finance.view', 'travel.view'],
            'SCHOOL_PARTNER' => ['students.view'],
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            Role::firstOrCreate(['name' => $roleName])->syncPermissions($rolePermissions);
        }

        $studentUser = User::create([
            'name' => 'Christelle Komi',
            'email' => 'christelle@studyway.test',
            'phone' => '+228 90 12 34 56',
            'country' => 'Togo',
            'password' => Hash::make('Password@123'),
            'email_verified_at' => now(),
        ]);
        $studentUser->assignRole('STUDENT');

        $agent = User::create([
            'name' => 'Koffi Adjo',
            'email' => 'agent@studyway.test',
            'phone' => '+228 90 12 34 56',
            'password' => Hash::make('Password@123'),
            'email_verified_at' => now(),
        ]);
        $agent->assignRole('MOBILITY_AGENT');

        $admin = User::create([
            'name' => 'Admin StudyWay',
            'email' => 'admin@studyway.test',
            'password' => Hash::make('Password@123'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('SUPER_ADMIN');

        $student = Student::create([
            'user_id' => $studentUser->id,
            'mobility_agent_id' => $agent->id,
            'student_code' => 'SW-2605-00001',
            'destination_country' => 'France',
            'program_level' => 'Master',
            'program_interest' => 'Data & Business',
            'profile_completion' => 74,
            'file_status' => 'in_review',
            'visa_status' => 'appointment_scheduled',
            'target_intake' => now()->addMonths(4),
        ]);

        $universities = [
            ['name' => 'Universite Paris-Saclay', 'country' => 'France', 'city' => 'Paris', 'estimated_cost' => 8500, 'levels' => ['Licence', 'Master'], 'specialties' => ['Ingenierie', 'Data'], 'is_featured' => true],
            ['name' => 'HEC Montreal', 'country' => 'Canada', 'city' => 'Montreal', 'estimated_cost' => 19500, 'levels' => ['Bachelor', 'MBA'], 'specialties' => ['Finance', 'Management'], 'is_featured' => true],
            ['name' => 'Universite de Geneve', 'country' => 'Suisse', 'city' => 'Geneve', 'estimated_cost' => 12000, 'levels' => ['Master'], 'specialties' => ['Droit', 'Relations internationales']],
        ];

        foreach ($universities as $university) {
            University::create($university + ['currency' => 'EUR', 'required_documents' => ['Passeport', 'Releves', 'Attestation']]);
        }

        Application::create([
            'student_id' => $student->id,
            'universite_id' => University::first()->id,
            'program_name' => 'Master Data Strategy',
            'status' => 'submitted',
            'submitted_at' => now()->subDays(8),
        ]);

        Payment::create([
            'student_id' => $student->id,
            'reference' => 'SWPAY-2605-001',
            'label' => 'Frais de dossier - Universite Paris-Saclay',
            'amount' => 150000,
            'status' => 'validated',
            'method' => 'mobile_money',
            'paid_at' => now()->subDays(3),
            'validated_at' => now()->subDays(2),
        ]);

        Financing::create([
            'student_id' => $student->id,
            'bank_partner' => 'Orabank Togo',
            'requested_amount' => 3500000,
            'approved_amount' => 3500000,
            'duration_months' => 12,
            'interest_rate' => 5.5,
            'status' => 'approved',
            'submitted_at' => now()->subDays(12),
            'approved_at' => now()->subDays(4),
        ]);

        Logement::create([
            'title' => 'Residence StudyWay Paris 15',
            'city' => 'Paris',
            'type' => 'residence',
            'requires_guarantor' => false,
            'monthly_price' => 720,
            'amenities' => ['WiFi', 'Meuble', 'Proche metro'],
        ]);

        $travel = Travel::create([
            'student_id' => $student->id,
            'agent_id' => $agent->id,
            'status' => 'flight_booked',
            'departure_date' => now()->addDays(23),
            'pickup_location' => 'Cite Baguida, Lome',
            'pickup_at' => now()->addDays(23)->setTime(19, 0),
            'checklist' => ['passport' => true, 'visa' => true, 'flight' => true, 'insurance' => true, 'bags' => false],
        ]);

        Flight::create([
            'travel_id' => $travel->id,
            'airline' => 'Turkish Airlines',
            'flight_number' => 'TK 618',
            'origin_code' => 'LFW',
            'origin_city' => 'Lome',
            'destination_code' => 'IST',
            'destination_city' => 'Istanbul',
            'departure_at' => now()->addDays(24)->setTime(23, 40),
            'arrival_at' => now()->addDays(25)->setTime(7, 25),
            'baggage' => ['checked' => '2 x 23 kg', 'cabin' => '8 kg'],
        ]);

        $conversation = Conversation::create([
            'type' => 'support',
            'title' => 'Support StudyWay',
            'student_id' => $student->id,
            'assigned_user_id' => $agent->id,
            'last_message_at' => now(),
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $agent->id,
            'body' => 'Bonjour Christelle, nous avons bien recu tous vos documents pour votre demande de visa et votre dossier est en verification.',
        ]);
    }
}
