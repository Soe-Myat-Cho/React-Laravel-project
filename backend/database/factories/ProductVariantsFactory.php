<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariants>
 */
class ProductVariantsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sizes = ['S', 'M', 'L'];

        return [
            'size' => $this->faker->randomElement($sizes),
            'stock' => $this->faker->numberBetween(5, 30),
        ];
    }
}
