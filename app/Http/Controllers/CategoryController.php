<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions as Helper;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
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
        return response()->json(CategoryResource::collection(Category::all()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        if (Category::query()->where('name', $request->name)->exists()) {
            return response('Category name already exist', 422);
        }
        DB::beginTransaction();
        try {
            $category = Category::query()->create($request->all());
            if ($request->has('file') && $request->file != "null") {
                $image_name = Helper::saveImage($request, 'categories');
                $category->photo()->updateOrCreate([
                    'photoUrl' => $image_name
                ]);
            }
            DB::commit();
            return \response(new CategoryResource($category));
        } catch (\Exception $exception) {
            DB::rollBack();
            return \response('Something went wrong', 422);
        }
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
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
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
        try {
            $category = Category::query()->find($id);
            $category->update($request->all());
            if ($request->has('file') && $request->file != "null") {
                $image_name = Helper::saveImage($request, 'categories');
                $category->photo()->updateOrCreate([
                    'photoable_id' => $category->id
                ],
                    [
                        'photoUrl' => $image_name
                    ]);
            }
            DB::commit();

            $category = Category::query()->find($id);
            return \response(new CategoryResource($category));

        } catch (\Exception $exception) {
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
            Category::query()->find($id)->delete();
            DB::commit();
            return \response(new CategoryResource(Category::withTrashed()->find($id)));
        } catch (\Exception $exception) {
            DB::rollBack();
            return response('Something went wrong', 422);
        }
    }
}
