<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\DocumentController;
use App\Http\Controllers\Api\V1\ParcoursupFormationController;
use App\Http\Controllers\Api\V1\ResourceIndexController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:api')->group(function (): void {
    Route::prefix('auth')->group(function (): void {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('me', [AuthController::class, 'me']);
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });

    Route::prefix('parcoursup')->group(function (): void {
        Route::get('formations', [ParcoursupFormationController::class, 'index']);
        Route::get('search', [ParcoursupFormationController::class, 'search']);
        Route::get('formations/{id}', [ParcoursupFormationController::class, 'show']);
    });

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('dashboard', DashboardController::class);
        Route::get('students', [ResourceIndexController::class, 'students'])->middleware('role:SUPER_ADMIN|STAFF|MOBILITY_AGENT|ACCOUNTANT');
        Route::get('universities', [ResourceIndexController::class, 'universities']);
        Route::get('payments', [ResourceIndexController::class, 'payments']);
        Route::get('financings', [ResourceIndexController::class, 'financings']);
        Route::get('logements', [ResourceIndexController::class, 'logements']);
        Route::get('travels', [ResourceIndexController::class, 'travels']);
        Route::get('messages', [ResourceIndexController::class, 'messages']);
        Route::post('documents', [DocumentController::class, 'store']);
        Route::post('parcoursup/formations/{id}/favorite', [ParcoursupFormationController::class, 'favorite']);
        Route::delete('parcoursup/formations/{id}/favorite', [ParcoursupFormationController::class, 'unfavorite']);
    });
});
