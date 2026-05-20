<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('parcoursup_formations', function (Blueprint $table) {
            $table->id();
            $table->string('formation_id')->unique();
            $table->string('formation_name')->index();
            $table->string('university_name')->nullable()->index();
            $table->string('city')->nullable()->index();
            $table->string('region')->nullable()->index();
            $table->string('country')->default('France')->index();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('formation_type')->nullable()->index();
            $table->string('specialization')->nullable()->index();
            $table->string('duration')->nullable();
            $table->decimal('admission_rate', 5, 2)->nullable()->index();
            $table->unsignedInteger('capacity')->nullable();
            $table->string('website')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('tuition')->nullable();
            $table->timestamps();

            if (DB::getDriverName() !== 'sqlite') {
                $table->fullText(['formation_name', 'university_name', 'city', 'specialization']);
            }
        });

        Schema::create('parcoursup_favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parcoursup_formation_id')->constrained('parcoursup_formations')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'parcoursup_formation_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('parcoursup_favorites');
        Schema::dropIfExists('parcoursup_formations');
    }
};
