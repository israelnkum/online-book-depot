<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory, UsesUuid,SoftDeletes;
    protected $fillable =[
        'name'
    ];

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class,'item_tags','itemId');
    }

}
