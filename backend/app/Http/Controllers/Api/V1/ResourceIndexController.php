<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use App\Http\Resources\StudentResource;
use App\Models\Conversation;
use App\Models\Financing;
use App\Models\Logement;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Travel;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ResourceIndexController extends Controller
{
    public function students(Request $request): AnonymousResourceCollection
    {
        $students = Student::query()
            ->with('user')
            ->withCount(['applications', 'documents', 'payments'])
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return StudentResource::collection($students);
    }

    public function universities(Request $request): AnonymousResourceCollection
    {
        $items = University::query()
            ->when($request->search, fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->when($request->country, fn ($query, $country) => $query->where('country', $country))
            ->latest()
            ->paginate($request->integer('per_page', 12));

        return GenericResource::collection($items);
    }

    public function payments(Request $request): AnonymousResourceCollection
    {
        return GenericResource::collection(Payment::latest()->paginate($request->integer('per_page', 15)));
    }

    public function financings(Request $request): AnonymousResourceCollection
    {
        return GenericResource::collection(Financing::latest()->paginate($request->integer('per_page', 15)));
    }

    public function logements(Request $request): AnonymousResourceCollection
    {
        return GenericResource::collection(Logement::latest()->paginate($request->integer('per_page', 12)));
    }

    public function travels(Request $request): AnonymousResourceCollection
    {
        return GenericResource::collection(Travel::with('flights')->latest()->paginate($request->integer('per_page', 10)));
    }

    public function messages(Request $request): AnonymousResourceCollection
    {
        return GenericResource::collection(Conversation::with(['messages' => fn ($query) => $query->latest()->limit(20)])->latest('last_message_at')->paginate($request->integer('per_page', 10)));
    }
}
