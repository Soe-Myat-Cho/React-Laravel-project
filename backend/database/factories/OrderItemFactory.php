<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\ProductVariants;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_variant_id' => ProductVariants::inRandomOrder()->first()->id,
            'price' => $this->faker->randomFloat(2, 10, 200),
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }
}
