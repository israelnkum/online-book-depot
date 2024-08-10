<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Resources\AllOrdersResource;
use App\Http\Resources\OrderResource;
use App\Models\Item;
use App\Models\Order;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use function response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $orders = Order::query()->where('customerId', Auth::user()->id)->get();
        return response()->json(AllOrdersResource::collection($orders));
    }

    public function createOrder(Request $request)
    {

        DB::beginTransaction();
        try {
            $id = HelperFunctions::generateFolderNumber();
            Log::info('here', [$id]);
            $order = Order::create([
                'customerId' => Auth::user()->id,
                'pickupLocationId' => $request->pickupLocationId,
                'deliveryAddressId' => $request->deliveryAddressId,
                'orderNumber' => $id
            ]);

            foreach ($request->cartItems as $item){
                $order->orderItems()->create([
                    'itemId' => $item['itemId'],
                    'shopId' => $item['shopId'],
                    'unitPrice' => $item['unitPrice'],
                    'sellingPrice' => $item['sellingPrice'],
                    'discountedPrice' => $item['discountedPrice'],
                    'qty' => $item['qty']
                ]);
            }

            DB::commit();
            return response(new OrderResource($order));
        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                "message" => $exception->getMessage()
            ]);
        }
    }


    /**
     * @return JsonResponse
     */
    public function getAllOrders(): JsonResponse
    {
        return response()->json(AllOrdersResource::collection(Order::all()));
    }
    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return Response
     */
    public function show(string $id): Response
    {
        $order = Order::query()->findOrFail($id);
        return response(new AllOrdersResource($order));
    }

    /**
     * @param string $orderId
     * @param string $status
     * @return Application|ResponseFactory|Response
     */
    public function updateOrderStatus(string $orderId, string $status){
        DB::beginTransaction();
        try {
            Order::query()->findOrFail($orderId)->update([
                'status' => $status
            ]);
            DB::commit();
            return response('Order status updated');
        }catch (Exception $exception){
            DB::rollBack();
            return response('Something went wrong', 400);
        }
    }

    public function payForOrder(Request $request){
        DB::beginTransaction();
        try {
            $order = Order::findOrFail($request['order']['id']);
            $order->update([
                'status' => $request['data']['status']
            ]);
            $order->payments()->create([
                'customerId' => $request['order']['customerId'],
                'amountPaid' => $request['data']['amount'],
                'deliveryFee' => $request['deliveryFee'],
                'itemTotal' => $request['itemTotal'],
                'txRef' => $request['data']['tx_ref'],
                'txId' => $request['data']['transaction_id'],
            ]);

            self::updateInventory($order->orderItems);

            DB::commit();
            return response('Success');
        }catch (Exception $exception){
            DB::rollBack();
            return response($exception, 400);
        }
    }

    public function updateInventory($orderItems) {
        foreach ($orderItems as $orderItem){
            $item = Item::find($orderItem->itemId);
            $item->update([
                'qtyInStock' => $item->qtyInStock - $orderItem->qty
            ]);
        }
    }
}
