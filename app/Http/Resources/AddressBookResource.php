<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'userId' => $this->userId,
            'otherNames' => $this->otherNames,
            'surName' => $this->surName,
            'phoneNumber' => $this->phoneNumber,
            'phoneNumberAlt' => $this->phoneNumberAlt,
            'address' => $this->address,
            'additionalInfo' => $this->additionalInfo,
            'region' => $this->region,
            'city' => $this->city,
        ];
    }
}
