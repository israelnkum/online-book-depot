<?php

use App\Http\Controllers\AddressBookController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PickupStationController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Http\Resources\PickupStationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::prefix('customer')->group(function () {
        Route::get('/details', [UserController::class, 'getUserDetails']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::resource('address', AddressBookController::class);
    });

    Route::prefix('users')->group(function () {
        Route::get('/customers', [UserController::class, 'customers']);
        Route::get('/admins', [UserController::class, 'admins']);
    });
    Route::resource('users', UserController::class);

    Route::prefix('user')->group(function () {
        Route::post('/change-password',[UserController::class, 'changePassword']);
    });

    Route::resource('shops', ShopController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('items', ItemController::class);
    Route::resource('brands', BrandController::class);
    Route::apiResource('pickup-stations', PickupStationController::class);
    Route::prefix('pickup-station')->group(function () {
        Route::get('/me/{locationId}', [PickupStationController::class, 'getMyPickupLocations']);
    });

    Route::get('/tags', [ItemController::class, 'getAllTags']);
    Route::get('/auth/me', [UserController::class, 'getAuthUser']);

    Route::prefix('order')->group(function () {
        Route::post('/create', [OrderController::class, 'createOrder']);
        Route::post('/pay', [OrderController::class, 'payForOrder']);
        Route::put('/update-order-status/{orderId}/{status}', [OrderController::class, 'updateOrderStatus']);
    });
    Route::get('/orders/all', [OrderController::class, 'getAllOrders']);
    Route::apiResource('orders', OrderController::class);

    Route::post('/payment', [UserController::class, 'makePayment']);
});


Route::prefix('landing')->group(function () {
    Route::get('/items', [LandingPageController::class, 'getAllItems']);
    Route::get('tag/items', [LandingPageController::class, 'getItemByTags']);
    Route::get('/categories', [LandingPageController::class, 'getAllCategories']);
    Route::prefix('/category')->group(function () {
        Route::get('/items/{id}', [LandingPageController::class, 'getCategoryItems']);
        Route::get('/item/{id}/detail', [LandingPageController::class, 'getItemDetail']);
    });
});

Route::middleware('auth:api')->get('/customer', function (Request $request) {
    return $request->user();
});
