<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property string $password
 * @property string email
 * @property string name
 * @property string phoneNumber
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable, UsesUuid,SoftDeletes;

    protected $appends =[
        'name'
    ];

    public function getNameAttribute(){
        return  $this->otherNames." ".$this->surName;
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'otherNames',
        'surName',
        'phoneNumber',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class,'role_users', 'userId','roleId')
            ->withPivot('deleted_at')
            ->withoutGlobalScope( SoftDeletingScope::class)
            ->using(new class extends Pivot{ use UsesUuid; });
    }

    public function addressBooks(): HasMany
    {
        return $this->hasMany(AddressBook::class, 'userId');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'customerId');
    }
}
