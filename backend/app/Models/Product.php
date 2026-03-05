<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'quantity', 'discount_percentage', 'image1', 'image2', 'image3', 'category_id'];

    //filter wirh category_id
    public function scopeFilter($query, array $filters)
    {
        //dd($filters['category_id']);
        if (isset($filters['category_id']) && $filters['category_id'] != 'all') {

            $query->when($filters['category_id'] ?? false, function ($query, $category_id) {
                return $query->where('category_id', $category_id);
            });
        }
    }

    //a product belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    //a product has many cart items
    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'product_id');
    }

    //a product has many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }

    public function productVariants()
    {
        return $this->hasMany(ProductVariants::class, 'product_id');
    }
}
