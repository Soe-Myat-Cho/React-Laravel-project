<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;

class CartItemController extends Controller
{
    // public function getCartItems()
    // {
    //     try {
    //         if (!request()->user()) {   //check if user is logged in
    //             return response()->json(['error' => 'User not found'], 401);
    //         }
    //         $cart_items = request()->user()->cart->cartItems()->with('productVariant.product')->get();
    //         return response()->json($cart_items);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    public function getCartItems()
    {
        try {
            $user = request()->user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            if (!$user->cart) {
                return response()->json([]);
            }

            $cart_items = $user->cart
                ->cartItems()
                ->with('productVariant.product')
                ->get();

            return response()->json($cart_items);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // public function removeFromCart(CartItem $cartItem)
    // {
    //     try {
    //         if (!request()->user()) {   //check if user is logged in
    //             return response()->json(['error' => 'User not found'], 401);
    //         }
    //         $cartItem->delete();
    //         return response()->json(['message' => 'Item removed from cart']);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    public function removeFromCart(CartItem $cartItem)
    {
        try {
            $user = request()->user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            if ($cartItem->cart->user_id !== $user->id) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $cartItem->delete();

            return response()->json(['message' => 'Item removed from cart']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
