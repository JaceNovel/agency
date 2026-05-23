<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load('student');

        return response()->json(['data' => new UserResource($user)]);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'               => ['sometimes', 'string', 'max:120'],
            'phone'              => ['sometimes', 'string', 'max:30'],
            'country'            => ['sometimes', 'string', 'max:80'],
            'preferred_language' => ['sometimes', 'string', 'in:fr,en,es'],
            'push_token'         => ['sometimes', 'string', 'max:255'],
        ]);

        $request->user()->update($data);

        return response()->json(['data' => new UserResource($request->user()->fresh())]);
    }

    public function updateAvatar(Request $request): JsonResponse
    {
        $request->validate(['avatar' => ['required', 'image', 'max:3072']]);

        $path = $request->file('avatar')->store('avatars', 'public');

        $request->user()->update(['avatar_url' => Storage::url($path)]);

        return response()->json(['data' => ['avatar_url' => Storage::url($path)]]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => ['required', 'min:8', 'confirmed'],
        ]);

        $request->user()->update(['password' => bcrypt($request->password)]);

        return response()->json(['message' => 'Mot de passe mis à jour.']);
    }

    public function updatePushToken(Request $request): JsonResponse
    {
        $request->validate(['push_token' => ['required', 'string', 'max:255']]);

        $request->user()->update(['push_token' => $request->push_token]);

        return response()->json(['message' => 'Token enregistré.']);
    }
}
