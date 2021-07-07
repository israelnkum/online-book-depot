<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'brandId' => $this->brandId,
            'brand' => [
                'id' => $this->brand->id,
                'name' => $this->brand->name,
            ],
            'shopId' => $this->shopId,
            'shop' => [
                'id' => $this->shop->id,
                'name' => $this->shop->name,
            ],
            'categoryId' => $this->categoryId,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'userId' => $this->userId,
            'name' => $this->name,
            'description' => $this->description,
            'file' => $this->photo->photoUrl,
            'qtyInStock' => $this->qtyInStock,
            'sellingPrice' => $this->sellingPrice,
            'costPrice' => $this->costPrice,
            'discountedPrice' => $this->discountedPrice,
            'showIfCompleted' => $this->showIfCompleted,
            'reorderLevel' => $this->reorderLevel,
        ];
    }
}
