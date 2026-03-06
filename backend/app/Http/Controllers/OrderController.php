<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{

    public function order()
    {
        try {
            $user = request()->user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            $validated = Validator::make(request()->all(), [
                'total_price' => 'required',
                'shipping_address' => 'required',
            ]);

            if ($validated->fails()) {
                return response()->json(['error' => $validated->errors()], 400);
            }

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => request('total_price'),
                'shipping_address' => request('shipping_address'),
            ]);

            $cart_items = $user->cart
                ->cartItems()
                ->with('productVariant.product')
                ->get();

            foreach ($cart_items as $cart_item) {

                $variant = $cart_item->productVariant;
                $product = $variant->product;

                $discountedPrice =
                    $product->price -
                    ($product->price * ($product->discount_percentage / 100));

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $cart_item->quantity,
                    'price' => $discountedPrice
                ]);

                $cart_item->delete();
            }

            return response()->json($order->load('order_items'), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
