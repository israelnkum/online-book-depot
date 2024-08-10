<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressBookResource;
use App\Http\Resources\UserResource;
use App\Models\AddressBook;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AddressBookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $addresses = Auth::user()->addressBooks;
        return response()->json(AddressBookResource::collection($addresses));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        if (AddressBook::query()->where('address', '=',$request->address)->exists()) {
            return response('Address name already exist',422);
        }
        DB::beginTransaction();
        try {
            $user = User::query()->find($request->userId);
            if ($user->addressBooks()->count() == 0) {
                $request['default'] = true;
            }
            $user->addressBooks()->create($request->all());
            $address = $user->addressBooks()->latest()->first();
            DB::commit();
            return \response(new AddressBookResource($address));
        }catch (Exception $exception){
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
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try
        {
            AddressBook::query()->find($id)->update($request->all());
            DB::commit();

            $address = AddressBook::query()->find($id);
            return \response(new AddressBookResource($address));

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
        //
    }
}
