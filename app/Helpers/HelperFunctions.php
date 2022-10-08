<?php

namespace App\Helpers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HelperFunctions
{
    public static function saveImage(Request $request, $directory): string
    {
        $file = $request->file('file');
        $image_name = uniqid('', true).'.'. $file->getClientOriginalExtension();
        $file->storeAs(getenv('APP_PHOTO_PATH').'/'.$directory.'/', $image_name);
        return $image_name;
    }

    static function createUserName($firstName, $lastName): string
    {
        $username = $firstName.'.'.$lastName;
        $checkUsername = User::query()->where('username',$username)->count();

        if ($checkUsername > 0){
            $username = $username.'_'.mt_rand(10,150);
        }
        return $username;
    }

    static function initiatePayment($data)
    {
        return  Http::withHeaders([
            'FLWPUBK_TEST-ecfecd5c9e97cb5d55c3249d52b65d19-X' => 'FLWSECK_TEST789d6b8e0814'
        ])->withToken('FLWSECK_TEST-bf6d696ffb6451f1d2171e4b400a7a4e-X')
            ->post(env('MIX_REACT_APP_PAYMENT_PATH').'/payments', $data);
    }

    public static function generateFolderNumber(){
        $lastRecord = Order::withTrashed()->latest('id')->first()['orderNumber'];
        if ($lastRecord == '' ){
            $orderNumber = 'OSS-000001';
        }else{
            $orderNumber =  $lastRecord +1;
        }
        return $orderNumber;
    }
}
