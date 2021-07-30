<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\LandingItemResource;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\JsonResponse;

class LandingPageController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function getAllItems(): JsonResponse
    {
        return response()->json(LandingItemResource::collection(Item::all()));
    }

    public function getAllCategories(): JsonResponse
    {
        return response()->json(CategoryResource::collection(Category::all()));
    }

    public function getCategoryItems($categoryId): JsonResponse
    {
        $items = Category::find($categoryId)->items;
        return response()->json(LandingItemResource::collection($items));
    }

    public function getItemDetail($itemId): JsonResponse
    {
        $item = Item::find($itemId);
        return response()->json(new ItemResource($item));
    }
}
