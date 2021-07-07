<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class BrandController extends Controller
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
        return response()->json(BrandResource::collection(Brand::all()));
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
        if (Brand::query()->where('name', $request->name)->exists()) {
            return response('Brand name already exist',422);
        }
        DB::beginTransaction();
        try {
            $Brand = Brand::query()->create($request->all());
            DB::commit();
            return \response(new BrandResource($Brand));
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
            Brand::query()->find($id)->update($request->all());
            DB::commit();

            $brand = Brand::query()->find($id);
            return \response(new BrandResource($brand));

        }catch (\Exception $exception){
            DB::rollBack();
            return response('Something went wrong', 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            Brand::query()->find($id)->delete();
            DB::commit();
            return \response(new BrandResource(Brand::withTrashed()->find($id)));
        }catch (\Exception $exception){
            DB::rollBack();
            return response('Something went wrong',422);
        }
    }
}
