<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'otherNames' => $this->otherNames,
            'surName' => $this->surName,
            'phoneNumber' => $this->phoneNumber,
            'email' =>  $this->email,
            'role' => $this->roles->first()->name
        ];
    }
}
