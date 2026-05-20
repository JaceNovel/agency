<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ParcoursupFormation extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'admission_rate' => 'float',
        'capacity' => 'integer',
        'tuition' => 'integer',
    ];

    public function favorites(): HasMany
    {
        return $this->hasMany(ParcoursupFavorite::class);
    }
}
