<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;
    protected $fillable = [
        'shopId',
        'name',
    ];

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable')->withDefault([
            'photoUrl' => null
        ]);
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'categoryId');
    }
}
