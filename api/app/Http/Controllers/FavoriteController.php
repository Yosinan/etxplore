<?php

namespace App\Http\Controllers;

use App\Models\CulturalArticle;
use App\Models\Favorite;
use App\Models\UserContribution;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Add an item to favorites
     */
    public function addFavorite(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:cultural_article,user_contribution', // Modify to use the exact class names
            'id' => 'required|integer',
        ]);

        $user = $request->user();
        $type = $request->input('type');
        $id = $request->input('id');

        // Determine the model type based on the input
        $favoritable = null;
        if ($type === 'cultural_article') {
            $favoritable = CulturalArticle::findOrFail($id);
        } elseif ($type === 'user_contribution') {
            $favoritable = UserContribution::findOrFail($id);
        }

        // Check if it already exists in favorites
        $exists = Favorite::where('user_id', $user->id)
            ->where('favoritable_id', $id)
            ->where('favoritable_type', get_class($favoritable))
            ->exists();

        if ($exists) {
            return response()->json(['message' => ucfirst($type) . ' has already been added to favorites!']);
        }

        // Add to favorites
        $user->favorites()->create([
            'favoritable_id' => $favoritable->id,
            'favoritable_type' => get_class($favoritable),
        ]);

        return response()->json(['message' => ucfirst($type) . ' added to favorites']);
    }

    /**
     * Remove an item from favorites
     */
    public function removeFavorite(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:cultural_article,user_contribution',
            'id' => 'required|integer',
        ]);

        $user = $request->user();
        $type = $request->input('type');
        $id = $request->input('id');

        // Determine the model type based on the input
        $favoritable = null;
        if ($type === 'cultural_article') {
            $favoritable = CulturalArticle::findOrFail($id);
        } elseif ($type === 'user_contribution') {
            $favoritable = UserContribution::findOrFail($id);
        }

        // Find the favorite entry
        $favorite = Favorite::where('user_id', $user->id)
            ->where('favoritable_id', $id)
            ->where('favoritable_type', get_class($favoritable))
            ->first();

        if (!$favorite) {
            return response()->json(['message' => ucfirst($type) . ' is not in favorites!']);
        }

        $favorite->delete();
        return response()->json(['message' => ucfirst($type) . ' removed from favorites']);
    }

    /**
     * Get all the user's favorites
     */
    public function getFavorites(Request $request)
    {
        try {
            $user = $request->user();
            $favorites = $user->favorites()
                             ->with(['favoritable.user:id,username,avatar'])
                            ->get();

            // Filter out null favoritable items
            $favorites = $favorites->filter(function ($favorite) {
                return $favorite->favoritable !== null;
            });

            $articles = [];
            $contributions = [];

            foreach ($favorites as $favorite) {
                if ($favorite->favoritable_type === CulturalArticle::class) {
                    $articles[] = $favorite->favoritable;
                } elseif ($favorite->favoritable_type === UserContribution::class) {
                    $contributions[] = $favorite->favoritable;
                }
            }

            return response()->json([
                'articles' => $articles,
                'user_contributions' => $contributions,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
