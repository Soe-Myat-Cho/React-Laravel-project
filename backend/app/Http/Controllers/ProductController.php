<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        //dd(request(['category_id']));
        try {
            $products = Product::filter(request(['category_id']))->inRandomOrder()->with('category')->get();
            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function discounted()
    {
        try {
            $products = Product::where('discount_percentage', '>', 0)->orderBy('discount_percentage', 'desc')->with('category')->get();
            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Product $product)
    {
        try {
            return response()->json(
                $product->load('productVariants') //product now has productVariants
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function uploadImage(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'image1' => ['required', 'image'],
                'image2' => ['required', 'image'],
                'image3' => ['required', 'image'],
            ]);

            if ($validated->fails()) {
                return response()->json([
                    'error' => 'Validation Error',
                    'errors' => $validated->errors()
                ], 422);
            }

            $image1 = '/storage/' . $request->file('image1')->store('products');
            $image2 = '/storage/' . $request->file('image2')->store('products');
            $image3 = '/storage/' . $request->file('image3')->store('products');

            return response()->json([
                'image1' => $image1,
                'image2' => $image2,
                'image3' => $image3,
                'message' => 'Images uploaded successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        //dd($request->all());
        try {
            $validated = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
                'quantity' => 'required',
                'discount_percentage' => 'required',
                'image1' => 'required',
                'image2' => 'required',
                'image3' => 'required',
                'category_id' => ['required', 'exists:categories,id'],
            ]);

            if ($validated->fails()) {
                return response()->json([
                    'error' => 'Validation Error',
                    'errors' => $validated->errors()
                ], 422);
            }

            $product = Product::create(request()->all());

            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Product $product, Request $request)
    {
        //dd($request->all());
        try {
            $validated = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
                'quantity' => 'required',
                'discount_percentage' => 'required',
                'image1' => 'required',
                'image2' => 'required',
                'image3' => 'required',
                'category_id' => ['required', 'exists:categories,id'],
            ]);

            if ($validated->fails()) {
                return response()->json([
                    'error' => 'Validation Error',
                    'errors' => $validated->errors()
                ], 422);
            }

            $product->update(request()->all());

            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return response()->json([
                'message' => 'Product deleted successfully',
                'status' => 204
            ], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
