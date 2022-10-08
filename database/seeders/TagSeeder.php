<?php

namespace Database\Seeders;

use App\Models\Tag;
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

        $tags = [
            'New Arrival',
            'Best Seller',
            'Top Rating',
            'Featured',
            'Trending'
        ];

        foreach ($tags as $tag){
            Tag::firstOrCreate([
                'name' => $tag
            ], [
                'id' => (string) Str::uuid(),
                'name' => $tag
            ]);
        }
    }
}
