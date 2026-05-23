<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class HousingRequest extends Model
{
    use HasUuid, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'move_in_date' => 'date',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function logement(): BelongsTo
    {
        return $this->belongsTo(Logement::class);
    }
}
