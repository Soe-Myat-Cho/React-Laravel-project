<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemFactory> */
    use HasFactory;

    protected $guarded = [];

    // an order item belongs to an order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // an order item belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // an order item belongs to a product variant
    public function productVariant()
    {
        return $this->belongsTo(ProductVariants::class);
    }
}
