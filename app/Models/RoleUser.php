<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RoleUser extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $table = 'role_users';

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'userId');
    }

    public function role(): BelongsTo{
        return $this->belongsTo(Role::class, 'roleId');
    }

    protected $fillable = [ 'roleId', 'userId'];
}
