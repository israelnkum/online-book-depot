<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderItem extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'itemId',
        'orderId',
        'shopId',
        'qty',
        'unitPrice',
        'sellingPrice',
        'discountedPrice',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'orderId');
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class, 'itemId');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shopId');
    }
}
