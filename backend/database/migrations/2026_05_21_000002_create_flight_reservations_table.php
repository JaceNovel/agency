<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flight_reservations', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('reference')->unique();
            $table->string('status')->default('payment_pending')->index();
            $table->string('payment_status')->default('initiated')->index();
            $table->string('moneroo_payment_id')->nullable()->index();
            $table->string('duffel_offer_id')->nullable()->index();
            $table->string('duffel_order_id')->nullable()->index();
            $table->string('booking_reference')->nullable();
            $table->string('ticket_number')->nullable();
            $table->string('provider')->nullable();
            $table->string('ticket_code')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->string('departure')->nullable();
            $table->string('arrival')->nullable();
            $table->string('duration')->nullable();
            $table->string('baggage')->nullable();
            $table->string('cabin_class')->nullable();
            $table->unsignedBigInteger('customer_amount');
            $table->string('customer_currency', 8)->default('XOF');
            $table->json('customer')->nullable();
            $table->json('ticket_snapshot')->nullable();
            $table->json('duffel_order')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('issued_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flight_reservations');
    }
};
