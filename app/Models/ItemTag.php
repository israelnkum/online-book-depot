<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemTag extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $table = 'item_tags';

    public function item(): BelongsTo{
        return $this->belongsTo(Item::class, 'itemId');
    }

    public function tag(): BelongsTo{
        return $this->belongsTo(Tag::class, 'tagId');
    }

    protected $fillable = [ 'roleId', 'userId'];
}
