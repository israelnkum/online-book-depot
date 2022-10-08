<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $cost  = $this->faker->numberBetween(20, 600);
        $selling  = $this->faker->numberBetween($cost, 600);
        return [
            'brandId' => Brand::firstOrCreate([
                'name'=>'First Brand'
            ])->id,
            'shopId' => Shop::first()->id,
            'categoryId' => Category::firstOrCreate([
                'name'=>'First Brand'
            ])->id,
            'userId' => User::first()->id,
            'name' => $this->faker->realText(50),
            'description' => $this->faker->realText,
            'qtyInStock' => $this->faker->numberBetween(20, 600),
            'costPrice'  => $cost,
            'sellingPrice' => $selling,
            'discountedPrice' => $selling - 3,
            'showIfCompleted' => 1,
            'reorderLevel' => 0,
        ];
    }
}
