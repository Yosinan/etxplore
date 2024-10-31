<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    // Display a listing of the categories
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json($categories, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve categories', 'message' => $e->getMessage()], 500);
        }
    }

    // Store a newly created category in storage
    public function store(Request $request)
    {
        try {
            $request->validate([
                'category_name' => 'required|string|max:255|unique:categories,category_name',
            ]);

            $category = Category::create([
                'category_name' => $request->category_name,
            ]);

            return response()->json(['message' => 'Category created successfully!', 'data' => $category], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create category', 'message' => $e->getMessage()], 500);
        }
    }

    // Display the specified category
    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);
            return response()->json($category, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Category not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve category', 'message' => $e->getMessage()], 500);
        }
    }

    // Update the specified category in storage
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'category_name' => 'required|string|max:255|unique:categories,category_name,' . $id,
            ]);

            $category = Category::findOrFail($id);
            $category->update([
                'category_name' => $request->category_name,
            ]);

            return response()->json(['message' => 'Category updated successfully!', 'data' => $category], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Category not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update category', 'message' => $e->getMessage()], 500);
        }
    }

    // Remove the specified category from storage
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return response()->json(['message' => 'Category deleted successfully!'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Category not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete category', 'message' => $e->getMessage()], 500);
        }
    }
}
