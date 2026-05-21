<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('parcoursup_formations', function (Blueprint $table) {
            if (! Schema::hasColumn('parcoursup_formations', 'image_url')) {
                $table->string('image_url')->nullable()->after('website');
            }
        });
    }

    public function down(): void
    {
        Schema::table('parcoursup_formations', function (Blueprint $table) {
            if (Schema::hasColumn('parcoursup_formations', 'image_url')) {
                $table->dropColumn('image_url');
            }
        });
    }
};
