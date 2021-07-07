<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShopResource;
use App\Models\Shop;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|Response
     */
    public function index()
    {
        return response()->json(ShopResource::collection(Shop::all()));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        if (Shop::query()->where('name', $request->name)->exists()) {
            return response('Shop name already exist',422);
        }
        DB::beginTransaction();
        try {
            $shop = Shop::query()->create($request->all());
            DB::commit();
            return \response(new ShopResource($shop));
        }catch (\Exception $exception){
            DB::rollBack();
            return \response('Something went wrong', 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param string $id
     * @return Response
     */
    public function update(Request $request, string $id): Response
    {
        DB::beginTransaction();
        try
        {
            Shop::query()->find($id)->update($request->all());
            DB::commit();

            $shop = Shop::query()->find($id);
            return \response(new ShopResource($shop));

        }catch (\Exception $exception){
            DB::rollBack();
            return response('Something went wrong', 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return Response
     */
    public function destroy(string $id): Response
    {
        DB::beginTransaction();
        try {
            Shop::query()->find($id)->delete();
            DB::commit();
            return \response(new ShopResource(Shop::withTrashed()->find($id)));
        }catch (\Exception $exception){
            DB::rollBack();
            return response('Something went wrong',422);
        }
    }
}
