<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\UserContribution;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UserContributionController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            // fetch contributions with user details that are approved
            $contributions = UserContribution::with('user:id,username,avatar')->where('status', 'approved')->get();
            return response()->json($contributions);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAll(): JsonResponse
    {
        try{
            $contributions = UserContribution::with('user:id,username,avatar')->get();
            return response()->json($contributions);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $validated['user_id'] = $request->user()->id;

            if ($request->hasFile('media')) {
                $file = $request->file('media');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('images', $filename, 'public');
                $validated['media'] = $filename;
            }

            $contribution = UserContribution::create($validated);

            if (!$contribution) {
                Log::error('Failed to create contribution');
                return response()->json(null, 500);
            }

            return response()->json($contribution, 201);

        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, $id): JsonResponse
    {
        try{
            $contribution = UserContribution::findOrFail($id);
            $contribution->status = $request->status;
            $contribution->save();
            return response()->json($contribution);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
       try{
            $contribution = UserContribution::with('user:id,username')->findOrFail($id);
            return response()->json($contribution);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
       }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try{
            // Get the authenticated user
            $user = $request->user();

            // Check if the authenticated user is the owner of the contribution
            $contribution = UserContribution::findOrFail($id);

            if ($user->id !== $contribution->user_id) {
                // not the owner
                return response()->json(['message' => 'Unauthorized'], 401); 
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'media' => 'nullable|string|max:255',
            ]);

            $contribution->update(array_merge($validated, ['user_id' => $user->id]));
            return response()->json($contribution);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try{
            // Get the authenticated user
            $user = $request->user();

            // Check if the authenticated user is the owner of the contribution
            $contribution = UserContribution::findOrFail($id);

            if ($user->id !== $contribution->user_id) {
                // not the owner
                return response()->json(['message' => 'Unauthorized'], 401); 
            }

            $contribution->delete();
            return response()->json(['message' => 'Article Deleted Successfully'], 200);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    // function to get users contributions by user id
    public function getUserContributions(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $contributions = UserContribution::with('user:id,username,avatar')->where('status', 'approved')->where('user_id', $user->id)->get();

            return response()->json($contributions);
        } catch (\Exception $e) {
            Log::error('An error occurred', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}