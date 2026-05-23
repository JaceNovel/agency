<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Esim extends Model
{
    use HasUuid;

    protected $table = 'esims';

    protected $guarded = ['id'];

    protected $casts = [
        'has_calls' => 'boolean',
        'has_sms' => 'boolean',
        'activated_at' => 'datetime',
        'expires_at' => 'datetime',
        'metadata' => 'array',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
