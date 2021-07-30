<?php

use App\Http\Controllers\AddressBookController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
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

    Route::resource('users', UserController::class);
    Route::resource('shops', ShopController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('items', ItemController::class);
    Route::resource('brands', BrandController::class);

    Route::get('/tags', [ItemController::class, 'getAllTags']);
});

Route::prefix('landing')->group(function () {
    Route::get('/items', [LandingPageController::class, 'getAllItems']);
    Route::get('/categories', [LandingPageController::class, 'getAllCategories']);
    Route::prefix('/category')->group(function () {
        Route::get('/items/{id}', [LandingPageController::class, 'getCategoryItems']);
        Route::get('/item/{id}/detail', [LandingPageController::class, 'getItemDetail']);
    });
});

Route::middleware('auth:api')->get('/customer', function (Request $request) {
    return $request->user();
});
