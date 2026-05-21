<?php

namespace App\Repositories;

use App\Models\ParcoursupFormation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

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

    public function stats(): array
    {
        return Cache::remember('parcoursup:stats', now()->addMinutes(30), function () {
            return [
                'formations' => ParcoursupFormation::query()->count(),
                'regions' => ParcoursupFormation::query()->whereNotNull('region')->distinct('region')->count('region'),
                'domains' => ParcoursupFormation::query()->whereNotNull('specialization')->distinct('specialization')->count('specialization'),
                'establishments' => ParcoursupFormation::query()->whereNotNull('university_name')->distinct('university_name')->count('university_name'),
            ];
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
                'image_url',
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
                $this->applyTextSearch($query, $search);
            })
            ->when($request->filled('city'), fn (Builder $query) => $query->where('city', 'like', '%'.trim((string) $request->query('city')).'%'))
            ->when($request->filled('region'), fn (Builder $query) => $query->where('region', 'like', '%'.trim((string) $request->query('region')).'%'))
            ->when($request->filled('specialization'), function (Builder $query) use ($request) {
                $this->applyDomainSearch($query, trim((string) $request->query('specialization')));
            })
            ->when($request->filled('formation_type'), fn (Builder $query) => $query->where('formation_type', 'like', '%'.trim((string) $request->query('formation_type')).'%'))
            ->when($request->filled('admission_rate'), fn (Builder $query) => $query->where('admission_rate', '>=', (float) $request->query('admission_rate')));
    }

    private function applyTextSearch(Builder $query, string $search): void
    {
        $terms = collect(preg_split('/\s+/', $search) ?: [])
            ->map(fn (string $term) => trim($term))
            ->filter()
            ->values();

        $query->where(function (Builder $query) use ($search, $terms) {
            foreach ([$search, ...$terms] as $term) {
                $query->orWhere(function (Builder $query) use ($term) {
                    $like = "%{$term}%";
                    $query->where('formation_name', 'like', $like)
                        ->orWhere('university_name', 'like', $like)
                        ->orWhere('city', 'like', $like)
                        ->orWhere('region', 'like', $like)
                        ->orWhere('formation_type', 'like', $like)
                        ->orWhere('specialization', 'like', $like);
                });
            }
        });
    }

    private function applyDomainSearch(Builder $query, string $domain): void
    {
        $terms = $this->domainTerms($domain);

        $query->where(function (Builder $query) use ($terms) {
            foreach ($terms as $term) {
                $like = "%{$term}%";
                $query->orWhere('specialization', 'like', $like)
                    ->orWhere('formation_name', 'like', $like)
                    ->orWhere('formation_type', 'like', $like);
            }
        });
    }

    private function domainTerms(string $domain): array
    {
        $normalized = Str::of($domain)->ascii()->lower()->toString();

        return match ($normalized) {
            'sante' => ['Santé', 'Sante', 'sanitaire', 'social', 'médecine', 'medecine', 'infirmier', 'biologie', 'opticien', 'diététique', 'dietetique', 'STAPS'],
            'informatique' => ['Informatique', 'numérique', 'numerique', 'cybersécurité', 'cybersecurite', 'réseaux', 'reseaux', 'multimédia', 'multimedia'],
            'droit' => ['Droit', 'juridique', 'notarial', 'administration publique'],
            'commerce' => ['Commerce', 'commercial', 'management', 'gestion', 'marketing', 'vente', 'relation client'],
            'ingenierie' => ['Ingénieur', 'Ingenieur', 'ingénierie', 'ingenierie', 'industriel', 'maintenance', 'électronique', 'electronique', 'mécanique', 'mecanique'],
            'arts' => ['Arts', 'design', 'mode', 'audiovisuel', 'audio-visuel', 'architecture', 'graphique'],
            default => [$domain, Str::ascii($domain)],
        };
    }
}
