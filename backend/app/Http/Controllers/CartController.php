<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariants;

class CartController extends Controller
{
    // public function addToCart(ProductVariants $productVariant)
    // {
    //     dd("hi");
    //     try {
    //         //return response()->json(request()->user()->cart, 201);

    //         if (!request()->user()) {   //check if user is logged in
    //             return response()->json(['error' => 'User not found'], 401);
    //         }
    //         if (request()->user()->cart) {  //check if user has a cart
    //             $cart = request()->user()->cart;
    //         } else {
    //             $cart = Cart::create(['user_id' => request()->user()->id]);
    //         }

    //         // $cart->cartItems()->create([
    //         //     'product_id' => $product->id,
    //         // ]);


    //         $existingItem = $cart->cartItems() // Check if item already exists
    //             ->where('product_variant_id', $productVariant->id)
    //             ->first();

    //         $quantity = request()->quantity ?? 1; // if quantity is not provided, default to 1

    //         if ($existingItem) {
    //             $existingItem->increment('quantity', $quantity);
    //         } else {
    //             $cart->cartItems()->create([
    //                 'product_variant_id' => $productVariant->id,
    //                 'quantity' => $quantity,
    //             ]);
    //         }

    //         // return response()->json($cart, 201);

    //         // return response()->json($cart->load('cartItems.productVariant.product'), 201);
    //         return response()->json($cart->cartItems()->with('product')->get(), 201);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    public function addToCart(ProductVariants $variant)
    {
        try {
            $user = request()->user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            $cart = $user->cart ?? Cart::create([
                'user_id' => $user->id
            ]);

            $quantity = request('quantity', 1);

            $existingItem = $cart->cartItems()
                ->where('product_variant_id', $variant->id)
                ->first();

            if ($existingItem) {
                $existingItem->increment('quantity', $quantity);
            } else {
                $cart->cartItems()->create([
                    'product_variant_id' => $variant->id,
                    'quantity' => $quantity,
                ]);
            }

            // Check if the quantity exceeds the stock
            if ($existingItem && ($existingItem->quantity + $quantity) > $variant->stock) {
                return response()->json([
                    'error' => 'Not enough stock available'
                ], 400);
            }

            return response()->json($cart->load('cartItems'), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
