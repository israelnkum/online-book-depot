<?php

namespace Database\Seeders;

use App\Models\Shop;
use Illuminate\Database\Seeder;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Shop::firstOrCreate([
            'name' => 'Shop 1',
            'contactNumber' => '0541223366',
            'contactNumberAlt' => '0541223366',
            'email' => 'shop1@gmail.com',
            'location' => 'Takoradi',
            'address' => 'Takoradi Mkt Circle',
        ]);
    }
}
