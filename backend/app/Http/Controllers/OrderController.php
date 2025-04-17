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
            $validated = Validator::make(request()->all(), [
                'total_price' => 'required',
                'shipping_address' => 'required',
            ]);

            if ($validated->fails()) {
                return response()->json(['error' => $validated->errors()], 400);
            }

            $order = Order::create([
                'user_id' => request()->user()->id,
                'total_price' => request('total_price'),
                'shipping_address' => request('shipping_address'),
            ]);

            $cart_items = request()->user()->cart->cartItems()->with('product')->get();
            foreach ($cart_items as $cart_item) {
                $order_item = new OrderItem();
                $order_item->order_id = $order->id;
                $order_item->product_id = $cart_item->product_id;
                $order_item->price = $cart_item->product->price;
                $order_item->save();
                $cart_item->delete();
            }

            // Mail::to(request()->user()->email)->send(new OrderMail(request()->user()->name));

            return response()->json($order, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
