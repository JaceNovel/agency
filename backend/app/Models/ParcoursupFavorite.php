<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParcoursupFavorite extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function formation(): BelongsTo
    {
        return $this->belongsTo(ParcoursupFormation::class, 'parcoursup_formation_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
