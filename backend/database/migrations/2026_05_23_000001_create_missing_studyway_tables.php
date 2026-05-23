<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visa_applications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assigned_agent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('visa_type')->default('student');
            $table->string('destination_country')->default('France');
            $table->string('status')->default('not_started')->index();
            // not_started | preparation | submitted | appointment | interview | decision | approved | rejected
            $table->date('appointment_date')->nullable();
            $table->date('submitted_at')->nullable();
            $table->date('decision_at')->nullable();
            $table->text('agent_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->json('required_documents')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('staff_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 30);
            $table->string('subject');
            $table->text('message')->nullable();
            $table->date('date');
            $table->time('time');
            $table->string('status')->default('pending')->index();
            // pending | confirmed | cancelled | done
            $table->string('google_event_id')->nullable();
            $table->string('google_event_link')->nullable();
            $table->string('type')->default('advisor')->index();
            // advisor | visa | agency
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('transport_bookings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->nullable()->constrained()->nullOnDelete();
            $table->string('provider')->default('StudyWay Transfer');
            $table->string('vehicle_type');
            $table->string('pickup_airport');
            $table->date('pickup_date');
            $table->time('pickup_time');
            $table->string('flight_number')->nullable();
            $table->string('destination_address');
            $table->unsignedTinyInteger('baggage_count')->default(2);
            $table->string('passenger_name');
            $table->string('passenger_email');
            $table->string('passenger_phone', 30);
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('price')->default(0);
            $table->string('currency', 8)->default('XOF');
            $table->string('status')->default('pending')->index();
            // pending | confirmed | in_progress | done | cancelled
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('esims', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('provider')->default('BNESIM');
            $table->string('plan_name');
            $table->string('iccid')->nullable();
            $table->string('qr_code_url')->nullable();
            $table->string('country', 5)->default('FR');
            $table->unsignedInteger('data_gb')->default(10);
            $table->unsignedInteger('validity_days')->default(30);
            $table->boolean('has_calls')->default(false);
            $table->boolean('has_sms')->default(false);
            $table->unsignedBigInteger('price');
            $table->string('currency', 8)->default('XOF');
            $table->string('status')->default('pending')->index();
            // pending | active | expired | cancelled
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('stays', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('duffel_accommodation_id')->nullable();
            $table->string('hotel_name');
            $table->string('city');
            $table->string('country')->default('France');
            $table->date('check_in');
            $table->date('check_out');
            $table->unsignedTinyInteger('guests')->default(1);
            $table->unsignedBigInteger('total_price');
            $table->string('currency', 8)->default('EUR');
            $table->string('status')->default('pending')->index();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('housing_requests', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('logement_id')->nullable()->constrained('logements')->nullOnDelete();
            $table->string('city');
            $table->string('guarantor_type')->default('none');
            // none | visale | garantme | private
            $table->date('move_in_date')->nullable();
            $table->unsignedSmallInteger('budget_max')->nullable();
            $table->string('status')->default('pending')->index();
            // pending | processing | found | signed | cancelled
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('type')->index();
            // housing | school | bank | insurance | agency | transport
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('website')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 30)->nullable();
            $table->string('logo_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('guardian_student', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('relationship')->default('parent');
            $table->boolean('can_pay')->default(true);
            $table->boolean('can_view_documents')->default(false);
            $table->primary(['user_id', 'student_id']);
        });

        // Add missing columns to students table
        Schema::table('students', function (Blueprint $table) {
            if (!Schema::hasColumn('students', 'nationality')) $table->string('nationality')->nullable();
            if (!Schema::hasColumn('students', 'birth_date')) $table->date('birth_date')->nullable();
            if (!Schema::hasColumn('students', 'birth_city')) $table->string('birth_city')->nullable();
            if (!Schema::hasColumn('students', 'passport_number')) $table->string('passport_number')->nullable();
            if (!Schema::hasColumn('students', 'passport_expiry')) $table->date('passport_expiry')->nullable();
            if (!Schema::hasColumn('students', 'current_level')) $table->string('current_level')->nullable();
            if (!Schema::hasColumn('students', 'bio')) $table->text('bio')->nullable();
            if (!Schema::hasColumn('students', 'languages')) $table->json('languages')->nullable();
            if (!Schema::hasColumn('students', 'has_guardian')) $table->boolean('has_guardian')->default(false);
        });

        // Add missing columns to users table
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'avatar_url')) $table->string('avatar_url')->nullable();
            if (!Schema::hasColumn('users', 'status')) $table->string('status')->default('active');
            if (!Schema::hasColumn('users', 'otp_code')) $table->string('otp_code', 10)->nullable();
            if (!Schema::hasColumn('users', 'otp_expires_at')) $table->timestamp('otp_expires_at')->nullable();
            if (!Schema::hasColumn('users', 'otp_verified_at')) $table->timestamp('otp_verified_at')->nullable();
            if (!Schema::hasColumn('users', 'last_login_at')) $table->timestamp('last_login_at')->nullable();
            if (!Schema::hasColumn('users', 'push_token')) $table->string('push_token')->nullable();
            if (!Schema::hasColumn('users', 'preferred_language')) $table->string('preferred_language', 5)->default('fr');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['avatar_url', 'status', 'otp_code', 'otp_expires_at', 'otp_verified_at', 'last_login_at', 'push_token', 'preferred_language']);
        });
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['nationality', 'birth_date', 'birth_city', 'passport_number', 'passport_expiry', 'current_level', 'bio', 'languages', 'has_guardian']);
        });
        Schema::dropIfExists('guardian_student');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('housing_requests');
        Schema::dropIfExists('stays');
        Schema::dropIfExists('esims');
        Schema::dropIfExists('transport_bookings');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('visa_applications');
    }
};
