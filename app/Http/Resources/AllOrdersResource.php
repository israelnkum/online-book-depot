<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Resources\Json\JsonResource;

class AllOrdersResource extends JsonResource
{
    public $collects = Order::class;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $status = $this->status;
        $color = "";
        if ( $status === "successful"){
            $color = "green";
        }
        else if($status === 'canceled'){
            $color = "red";
        }
        else if($status === "pending"){
            $color = "yellow";
        }
        return [
            'id' => $this->id,
            'customer' => new UserResource($this->customer),
            'orderNumber' => $this->orderNumber,
            'status' => $status,
            'color' => $color,
            'itemCount' => $this->orderItems->count(),
            'items' => OrderItemsResource::collection($this->orderItems),
            'deliveryAddress' => new AddressBookResource($this->deliveryAddress),
            'pickupStation' => new PickupStationResource($this->pickupStation),
            'payments' => new PaymentResource($this->payments),
        ];
    }
}
