<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Travel extends Model
{
    use HasFactory, HasUuid;

    protected $table = 'travels';

    protected $guarded = ['id'];

    protected $casts = [
        'departure_date' => 'date',
        'pickup_at' => 'datetime',
        'checklist' => 'array',
        'metadata' => 'array',
    ];

    public function flights(): HasMany
    {
        return $this->hasMany(Flight::class);
    }
}
