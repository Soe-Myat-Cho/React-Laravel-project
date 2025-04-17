<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $Categorys = Category::all();
            return response()->json($Categorys);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Category $Category)
    {
        try {
            return response()->json($Category);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
            ]);

            if ($validated->fails()) {
                return response()->json(['error' => $validated->errors()], 422);
            }

            $Category = Category::create($request->all());
            return response()->json($Category, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Category $Category)
    {
        try {
            $validated = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
            ]);

            if ($validated->fails()) {
                return response()->json([
                    'message' => 'Validation Error!!',
                    'errors' => $validated->errors()
                ], 422);
            }

            if (!$Category) {
                return response()->json(['error' => 'Category not found'], 404);
            }

            $Category->update($request->all());
            return response()->json($Category);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Category $Category)
    {
        try {
            $Category->delete();
            return response()->json([
                'message' => 'Category deleted successfully',
                'status' => 204
            ], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
