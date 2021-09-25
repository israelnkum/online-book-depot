<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use function response;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }


    public function getUserDetails()
    {
        $user = Auth::user();
        return response(new UserResource($user));
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
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            User::query()->find($id)->update($request->all());
            DB::commit();

            $user = User::query()->find($id);
            return response(new UserResource($user));

        } catch (Exception $exception) {
            DB::rollBack();
            return response('Something went wrong', 422);
        }
    }

    public function getAuthUser()
    {
        $user = Auth::user();
        return response([
            'firstName' => $user->otherNames,
            'role' => $user->roles->first()->name
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * @param Request $request
     * @return Application|ResponseFactory|Response
     * @throws ValidationException
     */
    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        DB::beginTransaction();
        $user = Auth::User();
        try {
            if (!Hash::check($request['currentPassword'], $user->password)) {
                return response('Current Password is incorrect', 400);
            } elseif (Hash::check($request['password'], $user->password)) {
                return response('New Password is the same as current', 400);
            } else {
                $user->update([
                    'password' => Hash::make($request->password)
                ]);
                DB::commit();
                return response(new UserResource($user));
            }
        } catch (Exception $exception) {
            DB::rollBack();
            return response('Something went wrong!', 400);
        }
    }

    public function makePayment(Request $request)
    {
        $user = Auth::user();
        $data = [
            "tx_ref" =>  "oss-".Str::random(32),
            "redirect_url" => "http://localhost:3000/home",
            "amount" => $request->amount,
            "currency"=>"GHS",
            "country" => "GH",
            "customer" => [
                "email" => $user->email,
                "phonenumber" => $user->phoneNumber,
                "name" => $user->name
            ],
            "customizations" => [
                "title" => "Online Stationery Shop",
                "description" => "Payment for items in cart",
                "logo" => "http://localhost:3000/storage/assets/logo.png"
            ]
        ];

        try {
            DB::beginTransaction();
            $paymentLink = HelperFunctions::initiatePayment($data);

            DB::commit();
        }catch (\Exception $exception){
            DB::rollBack();
            return \response('Sorry! Something went wrong, Please try again', 400);
        }
    }

}
