<?php

namespace App\Repositories;

use App\Models\ParcoursupFormation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ParcoursupFormationRepository
{
    public function paginate(Request $request): LengthAwarePaginator
    {
        $cacheKey = 'parcoursup:formations:'.md5(json_encode($request->query()));

        return Cache::remember($cacheKey, now()->addMinutes(20), function () use ($request) {
            return $this->query($request)
                ->latest('updated_at')
                ->paginate($request->integer('per_page', 12))
                ->withQueryString();
        });
    }

    public function search(Request $request): LengthAwarePaginator
    {
        $cacheKey = 'parcoursup:search:'.md5(json_encode($request->query()));

        return Cache::remember($cacheKey, now()->addMinutes(15), function () use ($request) {
            return $this->query($request)
                ->orderByRaw('admission_rate is null, admission_rate desc')
                ->paginate($request->integer('per_page', 12))
                ->withQueryString();
        });
    }

    public function find(string|int $id): ParcoursupFormation
    {
        return Cache::remember("parcoursup:formation:{$id}", now()->addMinutes(30), function () use ($id) {
            return ParcoursupFormation::query()
                ->where('id', $id)
                ->orWhere('formation_id', $id)
                ->firstOrFail();
        });
    }

    public function upsert(array $rows): void
    {
        ParcoursupFormation::query()->upsert(
            $rows,
            ['formation_id'],
            [
                'formation_name',
                'university_name',
                'city',
                'region',
                'country',
                'latitude',
                'longitude',
                'formation_type',
                'specialization',
                'duration',
                'admission_rate',
                'capacity',
                'website',
                'description',
                'tuition',
                'updated_at',
            ]
        );

        $this->flushCache();
    }

    public function flushCache(): void
    {
        Cache::flush();
    }

    private function query(Request $request): Builder
    {
        return ParcoursupFormation::query()
            ->when($request->filled('q'), function (Builder $query) use ($request) {
                $search = trim((string) $request->query('q'));
                $query->where(function (Builder $query) use ($search) {
                    $query->where('formation_name', 'like', "%{$search}%")
                        ->orWhere('university_name', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('specialization', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('city'), fn (Builder $query) => $query->where('city', $request->query('city')))
            ->when($request->filled('region'), fn (Builder $query) => $query->where('region', $request->query('region')))
            ->when($request->filled('specialization'), fn (Builder $query) => $query->where('specialization', 'like', '%'.$request->query('specialization').'%'))
            ->when($request->filled('formation_type'), fn (Builder $query) => $query->where('formation_type', $request->query('formation_type')))
            ->when($request->filled('admission_rate'), fn (Builder $query) => $query->where('admission_rate', '>=', (float) $request->query('admission_rate')));
    }
}
