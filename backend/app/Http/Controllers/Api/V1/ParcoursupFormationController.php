<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ParcoursupFormationResource;
use App\Models\ParcoursupFavorite;
use App\Repositories\ParcoursupFormationRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ParcoursupFormationController extends Controller
{
    public function __construct(private readonly ParcoursupFormationRepository $formations)
    {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        return ParcoursupFormationResource::collection($this->formations->paginate($request));
    }

    public function search(Request $request): AnonymousResourceCollection
    {
        return ParcoursupFormationResource::collection($this->formations->search($request));
    }

    public function show(Request $request, string $id): ParcoursupFormationResource
    {
        $formation = $this->formations->find($id);

        if ($request->user()) {
            $formation->is_favorite = ParcoursupFavorite::query()
                ->where('user_id', $request->user()->id)
                ->where('parcoursup_formation_id', $formation->id)
                ->exists();
        }

        return ParcoursupFormationResource::make($formation);
    }

    public function favorite(Request $request, string $id): JsonResponse
    {
        $formation = $this->formations->find($id);

        ParcoursupFavorite::query()->firstOrCreate([
            'user_id' => $request->user()->id,
            'parcoursup_formation_id' => $formation->id,
        ]);

        return response()->json(['favorited' => true]);
    }

    public function unfavorite(Request $request, string $id): JsonResponse
    {
        $formation = $this->formations->find($id);

        ParcoursupFavorite::query()
            ->where('user_id', $request->user()->id)
            ->where('parcoursup_formation_id', $formation->id)
            ->delete();

        return response()->json(['favorited' => false]);
    }
}
