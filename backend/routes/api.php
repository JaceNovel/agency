<?php

use App\Http\Controllers\Api\V1\Admin\AdminAppointmentController;
use App\Http\Controllers\Api\V1\Admin\AdminConversationController;
use App\Http\Controllers\Api\V1\Admin\AdminDashboardController;
use App\Http\Controllers\Api\V1\Admin\AdminDocumentController;
use App\Http\Controllers\Api\V1\Admin\AdminPaymentController;
use App\Http\Controllers\Api\V1\Admin\AdminStudentController;
use App\Http\Controllers\Api\V1\Admin\AdminVisaController;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\ConversationController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\DocumentController;
use App\Http\Controllers\Api\V1\DuffelFlightController;
use App\Http\Controllers\Api\V1\DuffelStayController;
use App\Http\Controllers\Api\V1\EsimController;
use App\Http\Controllers\Api\V1\FlightReservationController;
use App\Http\Controllers\Api\V1\HousingController;
use App\Http\Controllers\Api\V1\MonerooPaymentController;
use App\Http\Controllers\Api\V1\ParcoursupFormationController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\ResourceIndexController;
use App\Http\Controllers\Api\V1\TransportBookingController;
use App\Http\Controllers\Api\V1\VisaController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:api')->group(function (): void {

    // ─── Auth ────────────────────────────────────────────────────────────────
    Route::prefix('auth')->group(function (): void {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('me', [AuthController::class, 'me']);
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });

    // ─── Public : Parcoursup ─────────────────────────────────────────────────
    Route::prefix('parcoursup')->group(function (): void {
        Route::get('stats', [ParcoursupFormationController::class, 'stats']);
        Route::get('formations', [ParcoursupFormationController::class, 'index']);
        Route::get('search', [ParcoursupFormationController::class, 'search']);
        Route::get('formations/{id}', [ParcoursupFormationController::class, 'show']);
    });

    // ─── Public : Flights ────────────────────────────────────────────────────
    Route::prefix('flights')->group(function (): void {
        Route::get('offers', [DuffelFlightController::class, 'search']);
        Route::get('offers/{offerId}', [DuffelFlightController::class, 'show']);
        Route::get('offers/{offerId}/seat-maps', [DuffelFlightController::class, 'seatMaps']);
    });

    // ─── Public : Stays ──────────────────────────────────────────────────────
    Route::prefix('stays')->group(function (): void {
        Route::get('hotels', [DuffelStayController::class, 'search']);
    });

    // ─── Public : Housing listings ───────────────────────────────────────────
    Route::get('housing/listings', [HousingController::class, 'listings']);

    // ─── Public : eSIM plans ─────────────────────────────────────────────────
    Route::get('esim/plans', [EsimController::class, 'plans']);

    // ─── Public : Calendar ───────────────────────────────────────────────────
    Route::prefix('calendar')->group(function (): void {
        Route::get('slots', [CalendarController::class, 'slots']);
        Route::post('appointments', [CalendarController::class, 'store']);
        Route::get('auth', [CalendarController::class, 'authUrl']);
        Route::get('callback', [CalendarController::class, 'callback']);
    });

    // ─── Public : Moneroo webhooks ───────────────────────────────────────────
    Route::post('payments/moneroo/webhook', [MonerooPaymentController::class, 'webhook']);

    // ─── Public : Flight reservations ────────────────────────────────────────
    Route::prefix('flight-reservations')->group(function (): void {
        Route::get('/', [FlightReservationController::class, 'index']);
        Route::get('{reservation}', [FlightReservationController::class, 'show']);
        Route::get('{reservation}/ticket', [FlightReservationController::class, 'ticket'])->name('flight-reservations.ticket');
    });

    // ─── Authenticated client routes ─────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function (): void {

        // Dashboard
        Route::get('dashboard', DashboardController::class);

        // Profile
        Route::prefix('profile')->group(function (): void {
            Route::get('/', [ProfileController::class, 'show']);
            Route::patch('/', [ProfileController::class, 'update']);
            Route::post('avatar', [ProfileController::class, 'updateAvatar']);
            Route::post('password', [ProfileController::class, 'updatePassword']);
            Route::post('push-token', [ProfileController::class, 'updatePushToken']);
        });

        // Visa
        Route::prefix('visa')->group(function (): void {
            Route::get('/', [VisaController::class, 'index']);
            Route::post('/', [VisaController::class, 'store']);
            Route::get('{uuid}', [VisaController::class, 'show']);
        });

        // Documents
        Route::prefix('documents')->group(function (): void {
            Route::get('/', [ResourceIndexController::class, 'documents']);
            Route::post('/', [DocumentController::class, 'store']);
        });

        // Payments
        Route::prefix('payments')->group(function (): void {
            Route::get('/', [ResourceIndexController::class, 'payments']);
            Route::post('moneroo/initialize', [MonerooPaymentController::class, 'initialize']);
            Route::get('moneroo/{paymentId}/verify', [MonerooPaymentController::class, 'verify']);
        });

        // Financing
        Route::get('financings', [ResourceIndexController::class, 'financings']);

        // Universities & Parcoursup
        Route::get('universities', [ResourceIndexController::class, 'universities']);
        Route::post('parcoursup/formations/{id}/favorite', [ParcoursupFormationController::class, 'favorite']);
        Route::delete('parcoursup/formations/{id}/favorite', [ParcoursupFormationController::class, 'unfavorite']);

        // Housing
        Route::prefix('housing')->group(function (): void {
            Route::get('my-requests', [HousingController::class, 'myRequests']);
            Route::post('requests', [HousingController::class, 'storeRequest']);
        });
        Route::get('logements', [ResourceIndexController::class, 'logements']);

        // Transport
        Route::prefix('transport')->group(function (): void {
            Route::get('bookings', [TransportBookingController::class, 'index']);
            Route::post('bookings', [TransportBookingController::class, 'store']);
            Route::get('bookings/{uuid}', [TransportBookingController::class, 'show']);
        });

        // eSIM
        Route::prefix('esim')->group(function (): void {
            Route::get('my-esims', [EsimController::class, 'myEsims']);
            Route::post('purchase', [EsimController::class, 'purchase']);
        });

        // Conversations & Messages
        Route::prefix('conversations')->group(function (): void {
            Route::get('/', [ConversationController::class, 'index']);
            Route::post('/', [ConversationController::class, 'store']);
            Route::get('{uuid}', [ConversationController::class, 'show']);
            Route::post('{uuid}/messages', [ConversationController::class, 'sendMessage']);
        });
        Route::get('messages', [ResourceIndexController::class, 'messages']);

        // Travel
        Route::get('travels', [ResourceIndexController::class, 'travels']);

        // Students (staff only)
        Route::middleware('role:SUPER_ADMIN|STAFF|MOBILITY_AGENT|ACCOUNTANT')->group(function (): void {
            Route::get('students', [ResourceIndexController::class, 'students']);
        });
    });

    // ─── Admin routes ─────────────────────────────────────────────────────────
    Route::prefix('admin')
        ->middleware(['auth:sanctum', 'role:SUPER_ADMIN|STAFF|MOBILITY_AGENT|ACCOUNTANT'])
        ->group(function (): void {

            Route::get('dashboard', AdminDashboardController::class);

            // Students
            Route::get('students', [AdminStudentController::class, 'index']);
            Route::get('students/{uuid}', [AdminStudentController::class, 'show']);
            Route::patch('students/{uuid}', [AdminStudentController::class, 'update']);
            Route::post('students/{uuid}/notes', [AdminStudentController::class, 'addNote']);

            // Documents
            Route::get('documents', [AdminDocumentController::class, 'index']);
            Route::match(['post', 'patch'], 'documents/{uuid}/validate', [AdminDocumentController::class, 'validate']);

            // Payments (accountant + super admin)
            Route::middleware('role:SUPER_ADMIN|ACCOUNTANT')->group(function (): void {
                Route::get('payments', [AdminPaymentController::class, 'index']);
                Route::match(['post', 'patch'], 'payments/{uuid}/validate', [AdminPaymentController::class, 'validate']);
            });

            // Visa
            Route::get('visa', [AdminVisaController::class, 'index']);
            Route::patch('visa/{uuid}', [AdminVisaController::class, 'update']);
            Route::post('visa/{uuid}/assign', [AdminVisaController::class, 'assign']);

            // Appointments
            Route::get('appointments', [AdminAppointmentController::class, 'index']);
            Route::patch('appointments/{uuid}', [AdminAppointmentController::class, 'update']);

            // Conversations (admin messaging)
            Route::get('conversations', [AdminConversationController::class, 'index']);
            Route::get('conversations/{uuid}', [AdminConversationController::class, 'show']);
            Route::post('conversations/{uuid}/messages', [AdminConversationController::class, 'sendMessage']);
        });
});
