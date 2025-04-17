<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//register user
Route::post('/register', [UserController::class, 'register']);

//login user
Route::post('/login', [UserController::class, 'login']);

//logout user
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// get all products && can be filtered by category
Route::get('/products', [ProductController::class, 'index']);

// get single product
Route::get('/products/{product}', [ProductController::class, 'show']);

//get all categories
Route::get('/categories', [CategoryController::class, 'index']);

// get single category
Route::get('/categories/{category}', [CategoryController::class, 'show']);

//create category
Route::post('/categories', [CategoryController::class, 'store']);

//update category
Route::put('/categories/{category}', [CategoryController::class, 'update']);

//delete category
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

//product image upload
Route::post('/products/upload', [ProductController::class, 'uploadImage']);

//create product
Route::post('/products', [ProductController::class, 'store']);

//update product
Route::put('/products/{product}', [ProductController::class, 'update']);

//delete product
Route::delete('/products/{product}', [ProductController::class, 'destroy']);

//add to cart
Route::post('/cart/{product}', [CartController::class, 'addToCart'])->middleware('auth:sanctum');

//get cart-items
Route::get('/cart-items', [CartItemController::class, 'getCartItems'])->middleware('auth:sanctum');

//remove cart-item
Route::delete('/cart-items/{cartItem}', [CartItemController::class, 'removeFromCart'])->middleware('auth:sanctum');

//order
Route::post('/order', [OrderController::class, 'order'])->middleware('auth:sanctum');
