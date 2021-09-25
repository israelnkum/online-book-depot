<?php

namespace App\Http\Controllers;

use App\Http\Resources\PickupStationResource;
use App\Models\AddressBook;
use App\Models\PickupStation;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PickupStationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(PickupStationResource::collection(PickupStation::all()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        // check if name is already taken
        $checkEmail = PickupStation::query()->where('name',$request->name)->count();
        if ($checkEmail > 0){
            return response('Station with the same name already exist', 400);
        }

        DB::beginTransaction();
        try {

            // add PickupStation to db
             $station = PickupStation::create($request->all());

            DB::commit();
            return response(new PickupStationResource($station));
        }catch (Exception $exception){
            DB::rollBack();
            return response($exception,400);
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
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  string  $id
     * @return Response
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {

            // add PickupStation to db
            $station = PickupStation::find($id);
            $station->update($request->all());

            DB::commit();
            return response(new PickupStationResource($station));
        }catch (Exception $exception){
            DB::rollBack();
            return response($exception,400);
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
        //
    }

    /**
     * @param $locationId
     * @return Application|ResponseFactory|Response
     */
    public function getMyPickupLocations($locationId){
        $location = AddressBook::query()->find($locationId);

        $pickups = PickupStation::query()->where('region', $location->region)->get();
        return \response(PickupStationResource::collection($pickups));
    }
}
