<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class TagController extends Controller
{
    // Display a listing of the tags
    public function index()
    {
        try {
            $tags = Tag::all();
            return response()->json($tags, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve tags', 'message' => $e->getMessage()], 500);
        }
    }

    // Store a newly created tag in storage
    public function store(Request $request)
    {
        try {
            $request->validate([
                'tag_name' => 'required|string|max:255|unique:tags,tag_name',
            ]);

            $tag = Tag::create([
                'tag_name' => $request->tag_name,
            ]);

            return response()->json(['message' => 'Tag created successfully!', 'data' => $tag], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create tag', 'message' => $e->getMessage()], 500);
        }
    }

    // Display the specified tag
    public function show($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            return response()->json($tag, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Tag not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve tag', 'message' => $e->getMessage()], 500);
        }
    }

    // Update the specified tag in storage
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'tag_name' => 'required|string|max:255|unique:tags,tag_name,' . $id,
            ]);

            $tag = Tag::findOrFail($id);
            $tag->update([
                'tag_name' => $request->tag_name,
            ]);

            return response()->json(['message' => 'Tag updated successfully!', 'data' => $tag], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Tag not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update tag', 'message' => $e->getMessage()], 500);
        }
    }

    // Remove the specified tag from storage
    public function destroy($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();

            return response()->json(['message' => 'Tag deleted successfully!'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Tag not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete tag', 'message' => $e->getMessage()], 500);
        }
    }
}
