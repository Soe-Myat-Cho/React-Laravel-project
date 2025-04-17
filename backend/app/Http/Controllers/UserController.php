<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register()
    {
        try {
            $validated = Validator::make(request()->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required',
            ]);

            if ($validated->fails()) {
                return response()->json(['error' => $validated->errors()], 422);
            }
            $user = User::create([
                'name' => request()->name,
                'email' => request()->email,
                'password' => bcrypt(request()->password)
            ]);
            //$user->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function login()
    {
        try {
            $validated = Validator::make(request()->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validated->fails()) {
                return response()->json(['error' => $validated->errors()], 422);
            }
            $user = User::where('email', request()->email)->first();

            if (!$user || !Hash::check(request()->password, $user->password)) {
                return response()->json(['error' => 'The provided credentials are incorrect.'], 401);
            }
            $user->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User logged in successfully',
                'user' => $user,
                'token' => $token,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function logout()
    {
        try {
            request()->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'User logged out successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
