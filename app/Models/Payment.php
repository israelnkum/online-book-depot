<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'orderId',
        'customerId',
        'deliveryFee',
        'itemTotal',
        'amountPaid',
        'txRef',
        'txId',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'orderId');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customerId');
    }
}
