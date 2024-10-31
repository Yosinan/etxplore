<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CulturalArticle;

class FilteringController extends Controller
{
    // app/Http/Controllers/API/ArticleController.php
    public function filterByRegion($region_id)
    {
        // Retrieve cultural articles filtered by region_id directly from CulturalArticle
        $culturalArticles = CulturalArticle::where('region_id', $region_id)->get();
    
        // Check if any cultural articles exist for the specified region_id
        if ($culturalArticles->isEmpty()) {
            return response()->json(['error' => 'No cultural articles found for this region.'], 404);
        }
    
        // Return the filtered cultural articles
        return response()->json(['data' => $culturalArticles], 200);
    }
    
 
    public function filterByTags(Request $request)
    {
        // Validate the incoming request for tag_ids array
        $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'integer|exists:tags,id',  // Ensure all tag_ids are valid integers and exist in the tags table
        ]);
 
        $tagIds = $request->input('tag_ids');  // Retrieve tag_ids from the request
 
        // Retrieve cultural articles that are associated with the provided tags
        $culturalArticles = CulturalArticle::whereHas('tags', function ($query) use ($tagIds) {
            $query->whereIn('tags.id', $tagIds);
        })->get();
 
        // If no articles are found, return a 404 error
        if ($culturalArticles->isEmpty()) {
            return response()->json(['error' => 'No cultural articles found for the selected tags.'], 404);
        }
 
        // Return the filtered cultural articles
        return response()->json(['data' => $culturalArticles], 200);
    }
 
    public function filterByCategories(Request $request)
 {
     // Step 1: Validate the incoming request for category_ids array
     $request->validate([
         'category_ids' => 'required|array',              // Ensure 'category_ids' is provided and is an array
         'category_ids.*' => 'integer|exists:categories,id', // Each element in 'category_ids' must be an integer and must exist in the 'categories' table
     ]);
 
     // Step 2: Retrieve category_ids from the request
     $categoryIds = $request->input('category_ids');
 
     // Step 3: Retrieve cultural articles that are associated with the provided categories
     $culturalArticles = CulturalArticle::whereHas('categories', function ($query) use ($categoryIds) {
         $query->whereIn('categories.id', $categoryIds);   // This queries the pivot table 'cultural_article_category'
     })->get();
 
     // Step 4: Check if any articles were found
     if ($culturalArticles->isEmpty()) {
         return response()->json(['error' => 'No cultural articles found for the selected categories.'], 404);
     }
 
     // Step 5: Return the filtered cultural articles
     return response()->json(['data' => $culturalArticles], 200);
 }

 //Search cultural articles based on query.


 public function search(Request $request)
 {
     // Validate the incoming request
     $request->validate([
         'search' => 'required|string'
     ]);
 
     // Retrieve the search term from the request body
     $searchTerm = $request->input('search');
 
     // Perform the search on multiple columns
     $culturalArticles = CulturalArticle::where('title', 'LIKE', "%{$searchTerm}%")
         ->orWhere('description', 'LIKE', "%{$searchTerm}%")
         ->orWhere('history', 'LIKE', "%{$searchTerm}%")
         ->orWhere('traditions', 'LIKE', "%{$searchTerm}%")
         ->orWhere('language', 'LIKE', "%{$searchTerm}%")
         ->orWhere('practices', 'LIKE', "%{$searchTerm}%")
         ->get();
 
     // Return the search results
     return response()->json(['data' => $culturalArticles], 200);
 }
 
}
