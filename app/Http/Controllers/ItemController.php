<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
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
        return response()->json(ItemResource::collection(Item::all()));
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

        if (Item::query()->where('name', $request->name)->where('shopId', $request->shopId)->exists()) {
            return response('Item name already exist',422);
        }
        DB::beginTransaction();
        try {
            $request['userId'] = Auth::user()->id;
            $item = Item::query()->create($request->all());
            if ($request->has('file') && $request->file != "null"){
                $image_name = self::saveImage($request);
                $item->photo()->updateOrCreate([
                    'photoUrl'=> $image_name
                ]);
            }
            if ($request->has('tags')){
                foreach ($request->tags as $tag){
                    $t = Tag::query()->find($tag);
                    $item->tags()->attache($t);
                }
            }
//            $role = Role::query()->where('name', 'Customer')->first();
//            $user->roles()->attach($role);
            DB::commit();
            return \response(new ItemResource($item));
        }catch (\Exception $exception){
            DB::rollBack();
            return \response($exception->getMessage(), 422);
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
        if ($request->has('file') && $request->file != "null"){
          return \response('ee');
        }else{
            return \response('333333');
        }
        DB::beginTransaction();
        try
        {
            $item= Item::query()->find($id);
            $item->update($request->all());

            if ($request->has('file') && $request->file != "null"){
                $image_name = self::saveImage($request);
                $item->photo()->updateOrCreate([
                    'photoUrl'=> $image_name
                ]);
            }

            DB::commit();

//            $item = Item::query()->find($id);
            return \response(new ItemResource($item));

        }catch (\Exception $exception){
            DB::rollBack();
            return response('Something went wrong', 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return Response
     */
    public function destroy(string $id): Response
    {
        DB::beginTransaction();
        try {
            Item::query()->find($id)->delete();
            DB::commit();
            return \response(new ItemResource(Item::withTrashed()->find($id)));
        }catch (\Exception $exception){
            DB::rollBack();
            return response('Something went wrong',422);
        }
    }


    function saveImage(Request $request): string
    {
        $image_name = uniqid().'.'. $request->file('file')->getClientOriginalExtension();
        $request->file('file')->storeAs(env('APP_PHOTO_PATH').'/items/', $image_name);
        return $image_name;
    }


    public function getAllTags(): Response
    {
        try {
            return \response(Tag::all());
        }catch (\Exception $exception){
            return \response('Something went wrong', 422);
        }
    }
}
