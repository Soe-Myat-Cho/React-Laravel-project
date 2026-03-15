<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariants;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Category::factory()->create([
            'name' => 'Men',
            'description' => 'Men clothing category',
        ]);

        Category::factory()->create([
            'name' => 'Women',
            'description' => 'Women clothing category',
        ]);

        Category::factory()->create([
            'name' => 'Kids',
            'description' => 'Kids clothing category',
        ]);

        //Category::factory(5)->create();

        // Product::factory(40)
        //     ->has(ProductVariants::factory(3), 'productVariants')
        //     ->create();

        // User::factory(5)
        //     ->has(Cart::factory()->has(CartItem::factory(3), 'cartItems'))
        //     ->has(Order::factory(2)->has(OrderItem::factory(3), 'order_items'))
        //     ->create();

        // Product::factory(20)
        //     ->has(
        //         ProductVariants::factory()
        //             ->count(4)
        //             ->sequence(
        //                 ['size' => 'S'],
        //                 ['size' => 'M'],
        //                 ['size' => 'L'],
        //                 ['size' => 'XL'],
        //             )
        //     )
        //     ->create();

        // User::factory(5)
        //     ->has(Cart::factory()->has(CartItem::factory(3), 'cartItems'))
        //     ->has(Order::factory(2)->has(OrderItem::factory(3), 'order_items'))
        //     ->create();

        $this->call(ProductSeeder::class);

        $users = User::factory(5)->create();


        // create orders for users
        foreach ($users as $user) {

            \App\Models\Order::factory(3)
                ->for($user)
                ->has(
                    \App\Models\OrderItem::factory()
                        ->count(rand(1, 4)),
                    'order_items'
                )
                ->create();
        }
    }
}
