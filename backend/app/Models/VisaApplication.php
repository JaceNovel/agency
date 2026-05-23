<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class VisaApplication extends Model
{
    use HasUuid, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'appointment_date' => 'date',
        'submitted_at' => 'date',
        'decision_at' => 'date',
        'required_documents' => 'array',
        'metadata' => 'array',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_agent_id');
    }
}
