<?php

namespace App\Http\Controllers\API\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        
        try {
            
            $request->validate([
                'username' => 'required|string|max:255|unique:users,username',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            // Check if username is already taken
            if (User::where('username', $request->username)->exists()) {
                return response()->json(['message' => 'Username is already taken.'], 409);
            }

            // Check if email is already taken
            if (User::where('email', $request->email)->exists()) {
                return response()->json(['message' => 'Email is already taken.'], 409);
            }

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            event(new Registered($user));

            Auth::login($user);

            return response()->json([
                'message' => 'Registered successfully.',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during registration.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }
}
