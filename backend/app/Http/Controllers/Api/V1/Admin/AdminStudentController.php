<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminStudentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Student::with('user', 'school')
            ->when($request->search, fn ($q, $s) =>
                $q->whereHas('user', fn ($u) => $u->where('name', 'like', "%$s%")->orWhere('email', 'like', "%$s%"))
            )
            ->when($request->file_status, fn ($q, $s) => $q->where('file_status', $s))
            ->when($request->visa_status, fn ($q, $s) => $q->where('visa_status', $s))
            ->latest();

        $students = $query->paginate($request->integer('per_page', 20));

        return response()->json([
            'data' => StudentResource::collection($students),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page'    => $students->lastPage(),
                'total'        => $students->total(),
            ],
        ]);
    }

    public function show(string $uuid): JsonResponse
    {
        $student = Student::where('uuid', $uuid)
            ->with(['user', 'school', 'documents', 'payments', 'applications'])
            ->firstOrFail();

        return response()->json(['data' => new StudentResource($student)]);
    }

    public function update(Request $request, string $uuid): JsonResponse
    {
        $student = Student::where('uuid', $uuid)->firstOrFail();

        $data = $request->validate([
            'file_status'         => ['sometimes', 'string', 'in:draft,active,completed,archived,suspended'],
            'visa_status'         => ['sometimes', 'string', 'in:not_started,preparation,submitted,appointment,interview,decision,approved,rejected'],
            'assigned_staff_id'   => ['sometimes', 'nullable', 'string'],
            'mobility_agent_id'   => ['sometimes', 'nullable', 'string'],
            'profile_completion'  => ['sometimes', 'integer', 'min:0', 'max:100'],
        ]);

        if (!empty($data['assigned_staff_id'])) {
            $staff = User::where('uuid', $data['assigned_staff_id'])->first();
            $data['assigned_staff_id'] = $staff?->id;
        }
        if (!empty($data['mobility_agent_id'])) {
            $agent = User::where('uuid', $data['mobility_agent_id'])->first();
            $data['mobility_agent_id'] = $agent?->id;
        }

        $student->update($data);

        return response()->json(['data' => new StudentResource($student->fresh('user'))]);
    }

    public function addNote(Request $request, string $uuid): JsonResponse
    {
        $request->validate(['note' => ['required', 'string', 'max:2000']]);

        $student = Student::where('uuid', $uuid)->firstOrFail();

        $meta = $student->metadata ?? [];
        $meta['notes'][] = [
            'body'       => $request->note,
            'author_id'  => $request->user()->id,
            'author'     => $request->user()->name,
            'created_at' => now()->toDateTimeString(),
        ];

        $student->update(['metadata' => $meta]);

        return response()->json(['message' => 'Note ajoutée.']);
    }
}
