<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $guarded = [];

    //an order has many order items
    public function order_items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    //an order belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if ($filters['date'] ?? false) {

            $start = Carbon::parse($filters['date'])->startOfDay();
            $end = Carbon::parse($filters['date'])->endOfDay();

            $query->whereBetween('created_at', [$start, $end]);
        }
    }
}
