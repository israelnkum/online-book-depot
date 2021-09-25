<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'customerId',
        'orderNumber',
        'pickupLocationId',
        'deliveryAddressId',
        'status'
    ];

    public function payments(): HasOne
    {
        return $this->hasOne(Payment::class, 'orderId');
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'orderId');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customerId');
    }

    public function pickupStation(): BelongsTo
    {
        return $this->belongsTo(PickupStation::class, 'pickupLocationId');
    }

    public function deliveryAddress(): BelongsTo
    {
        return $this->belongsTo(AddressBook::class, 'deliveryAddressId');
    }
}
