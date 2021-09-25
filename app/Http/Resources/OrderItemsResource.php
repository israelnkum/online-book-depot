<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'item' => [
                'id' => $this->item->id,
                'name' => $this->item->name,
                'file' => $this->item->photo->photoUrl
            ],
            'orderId' => $this->orderId,
            'shop' => new ShopResource($this->shop),
            'qty' => $this->qty,
            'unitPrice' => $this->unitPrice,
            'sellingPrice' => $this->sellingPrice,
            'discountedPrice' => $this->discountedPrice,
        ];
    }
}
