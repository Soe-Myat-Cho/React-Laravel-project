<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariants;

class CartController extends Controller
{

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

            $currentQuantity = $existingItem ? $existingItem->quantity : 0;

            // CHECK STOCK BEFORE ADDING
            if (($currentQuantity + $quantity) > $variant->stock) {
                return response()->json([
                    'error' => 'Not enough stock available'
                ], 400);
            }

            if ($existingItem) {
                $existingItem->increment('quantity', $quantity);
            } else {
                $cart->cartItems()->create([
                    'product_variant_id' => $variant->id,
                    'quantity' => $quantity,
                ]);
            }

            return response()->json($cart->load('cartItems'), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateCartItem($id)
    {
        $cartItem = CartItem::with('productVariant')->findOrFail($id);

        $quantity = request('quantity');

        if ($quantity <= 0) {
            return response()->json(['error' => 'Invalid quantity'], 400);
        }

        // Check stock
        if ($cartItem->productVariant->stock < $quantity) {
            return response()->json([
                'error' => 'Not enough stock available'
            ], 400);
        }

        $cartItem->update([
            'quantity' => $quantity
        ]);

        return response()->json($cartItem);
    }
}
