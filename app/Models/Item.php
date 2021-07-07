<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class Item extends Model
{
    use HasFactory, UsesUuid,SoftDeletes;

    protected $fillable = [
        'brandId',
        'shopId',
        'categoryId',
        'userId',
        'name',
        'description',
        'qtyInStock',
        'costPrice',
        'sellingPrice',
        'discountedPrice',
        'showIfCompleted',
        'reorderLevel',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brandId');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shopId');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable')->withDefault([
            'photoUrl' => null
        ]);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class,'item_tags', 'itemId','tagId')
            ->withPivot('deleted_at')
            ->withoutGlobalScope( SoftDeletingScope::class)
            ->using(new class extends Pivot{ use UsesUuid; });
    }
}
