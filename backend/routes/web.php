<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\Api\V1\Auth\AuthController;
use Illuminate\Support\Facades\Route as RouteFacade;

// Session-based auth endpoints for SPA (use after requesting /sanctum/csrf-cookie)
RouteFacade::post('/auth/session/register', [AuthController::class, 'sessionRegister']);
RouteFacade::post('/auth/session/login', [AuthController::class, 'sessionLogin']);
RouteFacade::post('/auth/session/logout', [AuthController::class, 'sessionLogout']);
