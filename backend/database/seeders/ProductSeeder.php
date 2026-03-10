<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductVariants;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [

            /* ================= MEN ================= */

            [
                'name' => 'Men Basic Cotton T-Shirt',
                'description' => 'Comfortable everyday cotton t-shirt',
                'price' => 6000,
                'discount_percentage' => 10,
                'category' => 'Men',
                'img_index' => 1,
                'category_id' => 1
            ],

            [
                'name' => 'Men Casual Hoodie',
                'description' => 'Warm and stylish casual hoodie',
                'price' => 12000,
                'discount_percentage' => 5,
                'category' => 'Men',
                'img_index' => 2,
                'category_id' => 1
            ],

            [
                'name' => 'Men Denim Jacket',
                'description' => 'Classic blue denim jacket',
                'price' => 27000,
                'discount_percentage' => 8,
                'category' => 'Men',
                'img_index' => 3,
                'category_id' => 1
            ],

            [
                'name' => 'Men Slim Fit Jeans',
                'description' => 'Modern slim fit denim jeans',
                'price' => 15000,
                'discount_percentage' => 7,
                'category' => 'Men',
                'img_index' => 4,
                'category_id' => 1
            ],

            [
                'name' => 'Men Casual Polo Shirt',
                'description' => 'Soft cotton polo shirt',
                'price' => 9000,
                'discount_percentage' => 6,
                'category' => 'Men',
                'img_index' => 5,
                'category_id' => 1
            ],

            [
                'name' => 'Men Sports Track Pants',
                'description' => 'Comfortable training track pants',
                'price' => 11000,
                'discount_percentage' => 5,
                'category' => 'Men',
                'img_index' => 6,
                'category_id' => 1
            ],

            [
                'name' => 'Men Leather Jacket',
                'description' => 'Premium leather biker jacket',
                'price' => 35000,
                'discount_percentage' => 10,
                'category' => 'Men',
                'img_index' => 7,
                'category_id' => 1
            ],

            [
                'name' => 'Men Casual Shorts',
                'description' => 'Breathable cotton summer shorts',
                'price' => 7500,
                'discount_percentage' => 5,
                'category' => 'Men',
                'img_index' => 8,
                'category_id' => 1
            ],

            [
                'name' => 'Men Winter Sweater',
                'description' => 'Warm knitted winter sweater',
                'price' => 18000,
                'discount_percentage' => 9,
                'category' => 'Men',
                'img_index' => 9,
                'category_id' => 1
            ],

            [
                'name' => 'Men Formal Shirt',
                'description' => 'Elegant slim fit formal shirt',
                'price' => 14000,
                'discount_percentage' => 6,
                'category' => 'Men',
                'img_index' => 10,
                'category_id' => 1
            ],


            /* ================= WOMEN ================= */

            [
                'name' => 'Women Floral Summer Dress',
                'description' => 'Light and comfortable summer dress',
                'price' => 13000,
                'discount_percentage' => 10,
                'category' => 'Women',
                'img_index' => 1,
                'category_id' => 2
            ],

            [
                'name' => 'Women Casual Blouse',
                'description' => 'Elegant everyday blouse',
                'price' => 9000,
                'discount_percentage' => 6,
                'category' => 'Women',
                'img_index' => 2,
                'category_id' => 2
            ],

            [
                'name' => 'Women Denim Jacket',
                'description' => 'Stylish denim jacket',
                'price' => 25000,
                'discount_percentage' => 8,
                'category' => 'Women',
                'img_index' => 3,
                'category_id' => 2
            ],

            [
                'name' => 'Women Skinny Jeans',
                'description' => 'Comfortable stretch skinny jeans',
                'price' => 16000,
                'discount_percentage' => 7,
                'category' => 'Women',
                'img_index' => 4,
                'category_id' => 2
            ],

            [
                'name' => 'Women Casual T-Shirt',
                'description' => 'Soft cotton casual t-shirt',
                'price' => 6500,
                'discount_percentage' => 5,
                'category' => 'Women',
                'img_index' => 5,
                'category_id' => 2
            ],

            [
                'name' => 'Women Fashion Skirt',
                'description' => 'Trendy midi fashion skirt',
                'price' => 12000,
                'discount_percentage' => 6,
                'category' => 'Women',
                'img_index' => 6,
                'category_id' => 2
            ],

            [
                'name' => 'Women Leather Jacket',
                'description' => 'Stylish premium leather jacket',
                'price' => 38000,
                'discount_percentage' => 9,
                'category' => 'Women',
                'img_index' => 7,
                'category_id' => 2
            ],

            [
                'name' => 'Women Cozy Sweater',
                'description' => 'Warm winter knit sweater',
                'price' => 17000,
                'discount_percentage' => 8,
                'category' => 'Women',
                'img_index' => 8,
                'category_id' => 2
            ],

            [
                'name' => 'Women Sports Leggings',
                'description' => 'Flexible sports leggings',
                'price' => 11000,
                'discount_percentage' => 5,
                'category' => 'Women',
                'img_index' => 9,
                'category_id' => 2
            ],

            [
                'name' => 'Women Evening Dress',
                'description' => 'Elegant evening party dress',
                'price' => 32000,
                'discount_percentage' => 10,
                'category' => 'Women',
                'img_index' => 10,
                'category_id' => 2
            ],


            /* ================= KIDS ================= */

            [
                'name' => 'Kids Cartoon T-Shirt',
                'description' => 'Fun cartoon printed t-shirt',
                'price' => 5000,
                'discount_percentage' => 0,
                'category' => 'Kids',
                'img_index' => 1,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Casual Hoodie',
                'description' => 'Warm and comfy kids hoodie',
                'price' => 9000,
                'discount_percentage' => 5,
                'category' => 'Kids',
                'img_index' => 2,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Denim Jacket',
                'description' => 'Stylish denim jacket for kids',
                'price' => 15000,
                'discount_percentage' => 6,
                'category' => 'Kids',
                'img_index' => 3,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Cotton Shorts',
                'description' => 'Soft cotton play shorts',
                'price' => 6000,
                'discount_percentage' => 3,
                'category' => 'Kids',
                'img_index' => 4,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Sports T-Shirt',
                'description' => 'Breathable sports t-shirt',
                'price' => 5500,
                'discount_percentage' => 4,
                'category' => 'Kids',
                'img_index' => 5,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Winter Jacket',
                'description' => 'Warm padded winter jacket',
                'price' => 20000,
                'discount_percentage' => 8,
                'category' => 'Kids',
                'img_index' => 6,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Pajama Set',
                'description' => 'Soft cotton sleepwear set',
                'price' => 7000,
                'discount_percentage' => 5,
                'category' => 'Kids',
                'img_index' => 7,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Cute Dress',
                'description' => 'Lovely casual kids dress',
                'price' => 10000,
                'discount_percentage' => 6,
                'category' => 'Kids',
                'img_index' => 8,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Jogger Pants',
                'description' => 'Comfortable everyday joggers',
                'price' => 8000,
                'discount_percentage' => 5,
                'category' => 'Kids',
                'img_index' => 9,
                'category_id' => 3
            ],

            [
                'name' => 'Kids Party Outfit',
                'description' => 'Stylish kids party outfit',
                'price' => 22000,
                'discount_percentage' => 10,
                'category' => 'Kids',
                'img_index' => 10,
                'category_id' => 3
            ],

        ];

        foreach ($products as $productData) {

            $product = Product::create([
                'name' => $productData['name'],
                'description' => $productData['description'],
                'price' => $productData['price'],
                'discount_percentage' => $productData['discount_percentage'],
                'image1' => $productData['category'] . '/img' . $productData['img_index'] . '.1.webp',
                'image2' => $productData['category'] . '/img' . $productData['img_index'] . '.2.webp',
                'image3' => $productData['category'] . '/img' . $productData['img_index'] . '.3.webp',
                'image4' => $productData['category'] . '/img' . $productData['img_index'] . '.4.webp',
                'category_id' => $productData['category_id']
            ]);

            // Create size variants
            foreach (['S', 'M', 'L', 'XL'] as $size) {
                ProductVariants::create([
                    'product_id' => $product->id,
                    'size' => $size,
                    'stock' => 50
                ]);
            }
        }
    }
}
