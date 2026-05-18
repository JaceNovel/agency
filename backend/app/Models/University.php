<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory, HasUuid;

    protected $guarded = ['id'];

    protected $casts = [
        'levels' => 'array',
        'specialties' => 'array',
        'required_documents' => 'array',
        'is_featured' => 'boolean',
    ];
}
