<?php

namespace App\Models;

use App\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    protected $table = 'parents';

    use HasFactory, HasUuid;

    protected $guarded = ['id'];

    protected $casts = [
        'can_pay' => 'boolean',
        'can_view_documents' => 'boolean',
    ];
}
