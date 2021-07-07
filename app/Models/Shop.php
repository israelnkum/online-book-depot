<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    use HasFactory, UsesUuid,SoftDeletes;
    protected $fillable = [
        'name',
        'contactNumber',
        'contactNumberAlt',
        'email',
        'location',
        'address',
    ];
}
