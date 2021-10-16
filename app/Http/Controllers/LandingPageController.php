<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\ItemSearchResource;
use App\Http\Resources\TagResource;
use App\Http\Resources\LandingItemResource;
use App\Models\Category;
use App\Models\Item;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    /**
     * @param $itemId
     * @return JsonResponse
     */
    public function getItemDetail($itemId): JsonResponse
    {
        $item = Item::find($itemId);
        return response()->json(new ItemResource($item));
    }

    public function getItemByTags(){
        return response()->json(TagResource::collection(Tag::all()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function searchItems(Request $request): JsonResponse
    {
        $items = Item::query()
            ->where('name','like', '%' . $request['query'] . '%')
            ->get();

            return response()->json(ItemSearchResource::collection($items));
    }
}
