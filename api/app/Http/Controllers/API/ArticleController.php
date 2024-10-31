<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CulturalArticle;
use App\Models\TravelInformation;
use App\Models\Accommodation;
use App\Models\LocalTransport;
use App\Models\CulturalArticleCategory;
use App\Models\CulturalArticleTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleController extends Controller
{
     // Display a specific cultural article and related data
    public function index()
    {
        try {
            $culturalArticle = CulturalArticle::with([
                'travelInformation',
                'travelInformation.accommodations',
                'travelInformation.localTransport',
                'categories',
            ])->get();

            return response()->json($culturalArticle, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Cultural Article not found'], 404);
        }
    }

    // Store a newly created cultural article and related data
    public function store(Request $request)
    {
        DB::beginTransaction(); // Begin transaction for atomic operation
        try {
            // Validate incoming data
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'history' => 'nullable|string',
                'traditions' => 'nullable|string',
                'language' => 'nullable|string',
                'practices' => 'nullable|string',
                //media should be File!
                'media' => 'nullable|array',
                'media.*' => 'nullable|file',
                'region_id' => 'required|exists:regions,id',
                'travel_tips' => 'nullable|string',
                'accommodations' => 'nullable|array',
                'accommodations.*.hotel_name' => 'required|string|max:255',
                'accommodations.*.link_to_booking_site' => 'nullable|string',
                'local_transports' => 'nullable|array',
                'local_transports.*.transport_type' => 'required|string|max:255',
                'local_transports.*.details' => 'nullable|string',
                'categories' => 'nullable|array',
                'categories.*' => 'integer|exists:categories,id',
            ]);

            // Handle media files upload and store paths
            $mediaPaths = [];
            if ($request->hasFile('media')) {
                foreach ($request->file('media') as $file) {
                    // Store each media file in the 'public/media' directory
                    $path = $file->store('media', 'public'); 
                    // Add the storage path to the array
                    $mediaPaths[] = $path;
                }
            }

            // Store cultural article
            $culturalArticle = CulturalArticle::create([
                'title' => $request->title,
                'description' => $request->description,
                'history' => $request->history,
                'traditions' => $request->traditions,
                'language' => $request->language,
                'practices' => $request->practices,
                'media' => json_encode($mediaPaths),
                'region_id' => $request->region_id,
            ]);

            // Store travel information
            $travelInformation = TravelInformation::create([
                'cultural_article_id' => $culturalArticle->id,
                'travel_tips' => $request->travel_tips,
            ]);

            // Store accommodations
            if ($request->has('accommodations')) {
                foreach ($request->accommodations as $accommodationData) {
                    Accommodation::create([
                        'travel_information_id' => $travelInformation->id,
                        'hotel_name' => $accommodationData['hotel_name'],
                        'link_to_booking_site' => $accommodationData['link_to_booking_site'] ?? null,
                    ]);
                }
            }

            // Store local transports
            if ($request->has('local_transports')) {
                foreach ($request->local_transports as $transportData) {
                    LocalTransport::create([
                        'travel_information_id' => $travelInformation->id,
                        'transport_type' => $transportData['transport_type'],
                        'details' => $transportData['details'] ?? null,
                    ]);
                }
            }

            // Store cultural article categories
            if ($request->has('categories')) {
                foreach ($request->categories as $categoryId) {
                    CulturalArticleCategory::create([
                        'cultural_article_id' => $culturalArticle->id,
                        'category_id' => $categoryId,
                    ]);
                }
            }

            DB::commit(); // Commit transaction if everything is successful
            return response()->json(['message' => 'Cultural Article created successfully!', 'data' => $culturalArticle], 201);
        } catch (ValidationException $e) {
            DB::rollBack(); // Rollback transaction in case of validation error
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction in case of any other error
            return response()->json(['error' => 'Failed to create Cultural Article', 'message' => $e->getMessage()], 500);
        }
    }

    // Display a specific cultural article and related data
    public function show($id)
    {
        try {
            $culturalArticle = CulturalArticle::with([
                'travelInformation',
                'travelInformation.accommodations',
                'travelInformation.localTransport',
                'categories',
            ])->findOrFail($id);

            // $culturalArticle->media = json_decode($culturalArticle->media, true);

            return response()->json($culturalArticle, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Cultural Article not found'], 404);
        }
    }

    // Update an existing cultural article and related data
    public function update(Request $request, $id)
    {
        DB::beginTransaction(); // Start transaction for updating
        try {
            $culturalArticle = CulturalArticle::findOrFail($id);
            $culturalArticle->update($request->all());

            // // Update travel information
            // $travelInformation = $culturalArticle->travelInformation;
            // $travelInformation->update(['travel_tips' => $request->travel_tips]);

            // // Update accommodations
            // Accommodation::where('travel_information_id', $travelInformation->id)->delete();
            // if ($request->has('accommodations')) {
            //     foreach ($request->accommodations as $accommodationData) {
            //         Accommodation::create([
            //             'travel_information_id' => $travelInformation->id,
            //             'hotel_name' => $accommodationData['hotel_name'],
            //             'link_to_booking_site' => $accommodationData['link_to_booking_site'] ?? null,
            //         ]);
            //     }
            // }

            // // Update local transports
            // LocalTransport::where('travel_information_id', $travelInformation->id)->delete();
            // if ($request->has('local_transports')) {
            //     foreach ($request->local_transports as $transportData) {
            //         LocalTransport::create([
            //             'travel_information_id' => $travelInformation->id,
            //             'transport_type' => $transportData['transport_type'],
            //             'details' => $transportData['details'] ?? null,
            //         ]);
            //     }
            // }

            // // Update categories
            // CulturalArticleCategory::where('cultural_article_id', $culturalArticle->id)->delete();
            // if ($request->has('categories')) {
            //     foreach ($request->categories as $categoryId) {
            //         CulturalArticleCategory::create([
            //             'cultural_article_id' => $culturalArticle->id,
            //             'category_id' => $categoryId,
            //         ]);
            //     }
            // }

            DB::commit(); // Commit transaction on success
            return response()->json(['message' => 'Cultural Article updated successfully!'], 200);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction on error
            return response()->json(['error' => 'Failed to update Cultural Article', 'message' => $e->getMessage()], 500);
        }
    }

    // Remove a specific cultural article
    public function destroy($id)
    {
        try {
            $culturalArticle = CulturalArticle::findOrFail($id);
            $culturalArticle->delete();
            return response()->json(['message' => 'Cultural Article deleted successfully!'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Cultural Article not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete Cultural Article', 'message' => $e->getMessage()], 500);
        }
    }

    // filter by region
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

 
    // filter by category
    public function filterByCategories(Request $request)
    {
        
        $request->validate([
         'category_ids' => 'required|array',              // Ensure 'category_ids' is provided and is an array
         'category_ids.*' => 'integer|exists:categories,id', // Each element in 'category_ids' must be an integer and must exist in the 'categories' table
        ]);
 
        $categoryIds = $request->input('category_ids');

        // Fetch cultural articles by category
        $culturalArticles = CulturalArticle::whereHas('categories', function($query) use ($categoryIds) {
            $query->whereIn('categories.id', $categoryIds);
        })->get();

        if($culturalArticles->isEmpty()) {
            return response()->json(['error' => 'No cultural articles found for this category.'], 404);
        }

        return response()->json(['data' => $culturalArticles], 200);
    }

    //Search cultural articles based on query.
    public function search(Request $request)
    {
    
        // Retrieve the search term from the query parameters
        $searchTerm = $request->query('q');
    
        // Perform the search on multiple columns
        $culturalArticles = CulturalArticle::where('title', 'LIKE', "%{$searchTerm}%")
            ->orWhere('description', 'LIKE', "%{$searchTerm}%")
            ->orWhere('history', 'LIKE', "%{$searchTerm}%")
            ->orWhere('traditions', 'LIKE', "%{$searchTerm}%")
            ->orWhere('language', 'LIKE', "%{$searchTerm}%")
            ->orWhere('practices', 'LIKE', "%{$searchTerm}%")
            ->get();

        
        if($culturalArticles->isEmpty()) {
            return response()->json(['error' => 'No cultural articles found for ' . $searchTerm], 404);
        }
    
        // Return the search results
        return response()->json(['data' => $culturalArticles], 200);
    }


    public function filterArticles(Request $request)
    {
        try{
        $request->validate([
            'region_id' => 'nullable|integer|exists:regions,id', // Validate region_id if provided
            'category_ids' => 'nullable|array', // Validate category_ids if provided
            'category_ids.*' => 'integer|exists:categories,id', // Each element in category_ids must exist in the categories table
        ]);

        $query = CulturalArticle::query(); // Start a query on the CulturalArticle model

        // Filter by region if provided
        if ($request->has('region_id')) {
            $query->where('region_id', $request->input('region_id'));
        }

        // Filter by categories if provided
        if ($request->has('category_ids')) {
            $query->whereHas('categories', function($query) use ($request) {
                $query->whereIn('categories.id', $request->input('category_ids'));
            });
        }

        $culturalArticles = $query->get(); // Execute the query to get the filtered articles

        // Check if any cultural articles exist
        if ($culturalArticles->isEmpty()) {
            return response()->json(['error' => 'No cultural articles found for the specified filters.'], 404);
        }

        // Return the filtered cultural articles
        return response()->json(['data' => $culturalArticles], 200);
    
    }
        catch (\Exception $e) {
            return response()->json(['error' => 'Failed to filter cultural articles.', 'message' => $e->getMessage()], 500);
    }
}

}
