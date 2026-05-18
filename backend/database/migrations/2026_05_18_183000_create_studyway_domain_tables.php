<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('status')->default('active')->index();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_id')->nullable()->constrained('schools')->nullOnDelete();
            $table->foreignId('assigned_staff_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('mobility_agent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('student_code')->unique();
            $table->string('destination_country')->nullable();
            $table->string('program_level')->nullable();
            $table->string('program_interest')->nullable();
            $table->unsignedTinyInteger('profile_completion')->default(15);
            $table->string('file_status')->default('draft')->index();
            $table->string('visa_status')->default('not_started')->index();
            $table->date('target_intake')->nullable();
            $table->json('travel_checklist')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('relationship')->default('parent');
            $table->boolean('can_pay')->default(true);
            $table->boolean('can_view_documents')->default(false);
            $table->timestamps();
        });

        Schema::create('universities', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('country')->index();
            $table->string('city')->index();
            $table->string('logo_url')->nullable();
            $table->string('website')->nullable();
            $table->unsignedInteger('estimated_cost')->default(0);
            $table->string('currency', 8)->default('EUR');
            $table->json('levels')->nullable();
            $table->json('specialties')->nullable();
            $table->json('required_documents')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('universite_id')->nullable()->constrained('universities')->nullOnDelete();
            $table->string('program_name');
            $table->string('status')->default('draft')->index();
            $table->date('submitted_at')->nullable();
            $table->date('decision_at')->nullable();
            $table->text('staff_notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('validated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('type')->index();
            $table->string('name');
            $table->string('disk')->default('private');
            $table->string('path');
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size')->default(0);
            $table->string('status')->default('pending')->index();
            $table->unsignedInteger('version')->default(1);
            $table->text('validation_comment')->nullable();
            $table->timestamp('validated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('validated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('reference')->unique();
            $table->string('label');
            $table->unsignedBigInteger('amount');
            $table->string('currency', 8)->default('XOF');
            $table->string('method')->default('bank_transfer');
            $table->string('status')->default('pending')->index();
            $table->string('proof_path')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('validated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('financings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('bank_partner')->nullable();
            $table->unsignedBigInteger('requested_amount');
            $table->unsignedBigInteger('approved_amount')->nullable();
            $table->string('currency', 8)->default('XOF');
            $table->unsignedSmallInteger('duration_months')->default(12);
            $table->decimal('interest_rate', 5, 2)->nullable();
            $table->string('status')->default('draft')->index();
            $table->date('submitted_at')->nullable();
            $table->date('approved_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('payment_id')->nullable()->constrained('payments')->nullOnDelete();
            $table->string('type')->index();
            $table->string('label');
            $table->bigInteger('amount');
            $table->string('currency', 8)->default('XOF');
            $table->string('status')->default('posted');
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();
        });

        Schema::create('logements', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->string('country')->default('France');
            $table->string('city')->index();
            $table->string('type')->index();
            $table->boolean('requires_guarantor')->default(false);
            $table->unsignedInteger('monthly_price');
            $table->string('currency', 8)->default('EUR');
            $table->string('availability_status')->default('available')->index();
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });

        Schema::create('travels', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('agent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('preparation')->index();
            $table->date('departure_date')->nullable();
            $table->string('pickup_location')->nullable();
            $table->timestamp('pickup_at')->nullable();
            $table->string('qr_code')->nullable();
            $table->json('checklist')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('travel_id')->constrained('travels')->cascadeOnDelete();
            $table->string('airline');
            $table->string('flight_number');
            $table->string('origin_code');
            $table->string('origin_city');
            $table->string('destination_code');
            $table->string('destination_city');
            $table->timestamp('departure_at');
            $table->timestamp('arrival_at');
            $table->string('status')->default('confirmed');
            $table->json('baggage')->nullable();
            $table->timestamps();
        });

        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('type')->default('support')->index();
            $table->string('title');
            $table->foreignId('student_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('assigned_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
        });

        Schema::create('conversation_user', function (Blueprint $table) {
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamp('read_at')->nullable();
            $table->primary(['conversation_id', 'user_id']);
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('body');
            $table->json('attachments')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversation_user');
        Schema::dropIfExists('conversations');
        Schema::dropIfExists('flights');
        Schema::dropIfExists('travels');
        Schema::dropIfExists('logements');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('financings');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('applications');
        Schema::dropIfExists('universities');
        Schema::dropIfExists('parents');
        Schema::dropIfExists('students');
        Schema::dropIfExists('schools');
    }
};
