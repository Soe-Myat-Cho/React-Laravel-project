<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    public function addToCart(Product $product)
    {
        try {
            //return response()->json(request()->user()->cart, 201);

            if (!request()->user()) {   //check if user is logged in
                return response()->json(['error' => 'User not found'], 401);
            }
            if (request()->user()->cart) {  //check if user has a cart
                $cart = request()->user()->cart;
            } else {
                $cart = Cart::create(['user_id' => request()->user()->id]);
            }

            $cart->cartItems()->create([
                'product_id' => $product->id,
            ]);

            return response()->json($cart, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
