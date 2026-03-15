<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total_price' => $this->faker->randomFloat(2, 20, 500),
            'payment_method' => 'cod',
            'shipping_address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'receiver_name' => $this->faker->name(),
            'delivery_notes' => $this->faker->optional()->sentence(),
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed']),
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
