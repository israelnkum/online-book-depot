<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @class PickupStation
 * @property string name
 * @property string nearestLandMark
 * @property double shippingFee
 * @property string address
 * @property string contactPerson
 * @property string phoneNumber
 * @property string phoneNumberAlt
 * @property string additionalInfo
 * @property string region
 */
class PickupStation extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'name',
        'nearestLandMark',
        'shippingFee',
        'address',
        'contactPerson',
        'phoneNumber',
        'phoneNumberAlt',
        'additionalInfo',
        'region',
    ];
}
