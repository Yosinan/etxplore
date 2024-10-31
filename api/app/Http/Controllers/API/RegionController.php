<?php

// app/Http/Controllers/RegionController.php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegionController extends Controller
{
    // Retrieve all regions
    public function index()
    {
        $regions = Region::all();
        return response()->json($regions, 200);
    }

    // Retrieve a specific region by ID
    public function show($id)
    {
        $region = Region::find($id);

        if ($region) {
            return response()->json($region, 200);
        } else {
            return response()->json([
                'error' => 'Region not found'
            ], 404);
        }
    }

    // Create a new region
    public function store(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'region_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'message' => $validator->errors(),
            ], 422);
        }

        try {
            $region = Region::create($request->only('region_name', 'description'));

            return response()->json([
                'success' => true,
                'message' => 'Region created successfully',
                'data' => $region,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create Region',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Update an existing region
    public function update(Request $request, $id)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'region_name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'message' => $validator->errors(),
            ], 422);
        }

        $region = Region::find($id);

        if ($region) {
            try {
                $region->update($request->only('region_name', 'description'));

                return response()->json([
                    'success' => true,
                    'message' => 'Region updated successfully',
                    'data' => $region,
                ], 200);

            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to update Region',
                    'message' => $e->getMessage(),
                ], 500);
            }
        } else {
            return response()->json([
                'error' => 'Region not found'
            ], 404);
        }
    }

    // Delete a region
    public function destroy($id)
    {
        $region = Region::find($id);

        if ($region) {
            try {
                $region->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Region deleted successfully',
                ], 200);

            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to delete Region',
                    'message' => $e->getMessage(),
                ], 500);
            }
        } else {
            return response()->json([
                'error' => 'Region not found'
            ], 404);
        }
    }
}
