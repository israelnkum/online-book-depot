<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AddressBook extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;
    protected $appends =[
        'name'
    ];

    public function getNameAttribute(){
        return  $this->otherNames." ".$this->surName;
    }

    protected $fillable = [
        'userId',
        'otherNames',
        'surName',
        'phoneNumber',
        'phoneNumberAlt',
        'address',
        'additionalInfo',
        'region',
        'city',
    ];
}
