<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(20, 150),
            // 'quantity' => $this->faker->numberBetween(30, 100),
            'discount_percentage' => $this->faker->numberBetween(0, 20),
            'image1' => $this->faker->imageUrl(),
            'image2' => $this->faker->imageUrl(),
            'image3' => $this->faker->imageUrl(),
            'category_id' => Category::pluck('id')->random(),
        ];
    }
}
