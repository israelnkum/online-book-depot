<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LandingItemResource extends JsonResource
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
            'brand' => [
                'id' => $this->brand->id,
                'name' => $this->brand->name,
            ],
            'shop' => [
                'id' => $this->shop->id,
                'name' => $this->shop->name,
            ],
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'name' => $this->name,
            'file' => $this->photo->photoUrl,
            'sellingPrice' => $this->sellingPrice,
            'description' => $this->description,
            'discountedPrice' => $this->discountedPrice,
        ];
    }
}
