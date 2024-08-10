<?php

namespace Database\Seeders;

use App\Models\PickupStation;
use Illuminate\Database\Seeder;

class PickupLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $regions = [
            'Ahafo',
            'Ashanti',
            'Bono East',
            'Brong Ahafo',
            'Central',
            'Eastern',
            'Greater Accra',
            'North East',
            'Northern',
            'Savannah',
            'Oti',
            'Upper East',
            'Upper West',
            'Volta',
            'Western',
            'Western North'
        ];

        foreach ($regions as $region) {
            PickupStation::updateOrCreate([
                'name' => "Location 1",
                'region' => $region,
            ], [
                'name' => "Location 1",
                'shippingFee' => 50,
                'address' => 'Address 1',
                'contactPerson' => 'Contact Person',
                'phoneNumber' => '0000000000',
                'region' => $region,
            ]);
        }
    }
}
