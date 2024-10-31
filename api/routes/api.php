<?php

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\RegionController;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\API\UserContributionController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\API\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use GuzzleHttp\Middleware;
use App\Http\Controllers\FavoriteController;

Route::get('/user', function (Request $request) {
    $user = $request->user();
    $avatarPath = $user->avatar ? asset('storage/avatars/' . $user->avatar) : null;
    $user->avatar = $avatarPath;
    return response()->json($user);

})->middleware('auth:sanctum');

Route::get('/status', function (Request $request): JsonResponse {
    return response()->json(
        [
        'status' => 'ok',
        'message' => 'API is working fine'
    ]);
});

Route::middleware('guest')->group(function () {

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');



    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('tags', TagController::class);
    Route::apiResource('regions', RegionController::class);

    Route::get('/articles/filter', [ArticleController::class, 'filterArticles']);
    Route::get('/articles/filterByCategories', [ArticleController::class, 'filterByCategories']);
    Route::get('/articles/search', [ArticleController::class, 'search']);
    Route::apiResource('articles', ArticleController::class)->except(['filterByCategories', 'search', 'filterArticles']);
    Route::get('/articles/filterByRegion/{region_id}', [ArticleController::class, 'filterByRegion']);
    
    

});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

     // Get the user's profile information
    Route::get('profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // Update the user's profile information
    Route::post('profile/update', [ProfileController::class, 'update'])->name('profile.update');

    // Delete the user's account
    Route::delete('profile/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

// Events routes
Route::get('/events/current-month', [EventController::class, 'eventsForCurrentMonth'])->name('events.currentMonth');
Route::get('/events/upcoming', [EventController::class, 'upcomingEvents'])->name('events.upcoming');
Route::get('/events/all', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');


// public routes
Route::get('user-contributions', [UserContributionController::class, 'index']);
Route::get('user-contributions/{id}', [UserContributionController::class, 'show']);


// authenticated user routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('user-contributions', UserContributionController::class)->except('index');

    Route::get('/user-post', [UserContributionController::class, 'getUserContributions']);
    Route::post('/favorites/add', [FavoriteController::class, 'addFavorite']);
    Route::delete('/favorites/remove', [FavoriteController::class, 'removeFavorite']);
    Route::get('/favorites', [FavoriteController::class, 'getFavorites']);
    
});

// admin routes
Route::middleware('auth:sanctum', 'role:admin')->group(function () {
    Route::patch('user-contributions/{id}/status', [UserContributionController::class, 'updateStatus']);
    Route::get('admin/user-contributions', [UserContributionController::class, 'getAll']);
    //manage events
    Route::apiResource('events', EventController::class)->except('upcomingEvents');
});

