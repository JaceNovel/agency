<?php

namespace App\Services;

use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data): array
    {
        return DB::transaction(function () use ($data): array {
            $role = $data['role'];

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'country' => $data['country'] ?? null,
                'password' => $data['password'],
            ]);

            $user->assignRole($role);

            if ($role === 'STUDENT') {
                Student::create([
                    'user_id' => $user->id,
                    'student_code' => 'SW-' . now()->format('ym') . '-' . str_pad((string) $user->id, 5, '0', STR_PAD_LEFT),
                ]);
            }

            activity('auth')->causedBy($user)->performedOn($user)->log('registered');

            return [
                'user' => $user->fresh(),
                'token' => $user->createToken('studyway-web')->plainTextToken,
            ];
        });
    }

    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont invalides.'],
            ]);
        }

        $user->forceFill(['last_login_at' => now()])->save();
        activity('auth')->causedBy($user)->performedOn($user)->log('logged_in');

        return [
            'user' => $user,
            'token' => $user->createToken($data['device_name'] ?? 'studyway-web')->plainTextToken,
        ];
    }
}
