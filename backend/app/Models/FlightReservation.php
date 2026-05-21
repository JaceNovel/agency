<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightReservation extends Model
{
    use HasFactory, HasUuid;

    protected $guarded = ['id'];

    protected $casts = [
        'customer' => 'array',
        'ticket_snapshot' => 'array',
        'duffel_order' => 'array',
        'paid_at' => 'datetime',
        'issued_at' => 'datetime',
    ];
}
