<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            [ 'id' => (string) Str::uuid(),'name' => 'New Arrival'],
            [ 'id' => (string) Str::uuid(),'name' => 'Best Seller'],
            [ 'id' => (string) Str::uuid(),'name' => 'Top Rating'],
            [ 'id' => (string) Str::uuid(),'name' => 'Featured'],
            [ 'id' => (string) Str::uuid(),'name' => 'Trending'],
        ]);
    }
}
