<?php

namespace App\Services;

use App\Repositories\ParcoursupFormationRepository;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ParcoursupOpenDataService
{
    public function __construct(private readonly ParcoursupFormationRepository $formations)
    {
    }

    /**
     * @throws ConnectionException
     */
    public function sync(int $limit = 100, int $maxPages = 0): int
    {
        if ($maxPages === 0) {
            return $this->syncExport();
        }

        return $this->syncRecords($limit, $maxPages);
    }

    /**
     * @throws ConnectionException
     */
    private function syncExport(): int
    {
        $response = Http::retry(3, 400)
            ->timeout(120)
            ->get(config('services.parcoursup.exports_json_url'));

        if ($response->failed()) {
            Log::error('Parcoursup export sync failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return 0;
        }

        $records = $response->json();

        if (! is_array($records)) {
            Log::error('Parcoursup export sync returned an invalid payload', [
                'payload_type' => gettype($records),
            ]);

            return 0;
        }

        $synced = 0;

        collect($records)
            ->filter(fn (mixed $record) => is_array($record))
            ->chunk(500)
            ->each(function ($chunk) use (&$synced): void {
                $rows = $chunk
                    ->map(fn (array $record) => $this->mapRecord($record))
                    ->filter(fn (array $row) => filled($row['formation_id']) && filled($row['formation_name']))
                    ->values()
                    ->all();

                if ($rows !== []) {
                    $this->formations->upsert($rows);
                    $synced += count($rows);
                }
            });

        return $synced;
    }

    /**
     * @throws ConnectionException
     */
    private function syncRecords(int $limit = 100, int $maxPages = 1): int
    {
        $offset = 0;
        $synced = 0;
        $page = 0;
        $limit = min(max($limit, 1), 100);

        do {
            if ($offset + $limit > 10000) {
                Log::warning('Parcoursup records sync stopped before the OpenData offset limit', [
                    'offset' => $offset,
                    'limit' => $limit,
                ]);

                break;
            }

            $response = Http::retry(3, 400)
                ->timeout(25)
                ->get(config('services.parcoursup.records_url'), [
                    'limit' => $limit,
                    'offset' => $offset,
                ]);

            if ($response->failed()) {
                Log::error('Parcoursup sync failed', [
                    'offset' => $offset,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                break;
            }

            $payload = $response->json();
            $records = $payload['records'] ?? [];
            $rows = collect($records)
                ->map(fn (array $record) => $this->mapRecord($record))
                ->filter(fn (array $row) => filled($row['formation_id']) && filled($row['formation_name']))
                ->values()
                ->all();

            if ($rows !== []) {
                $this->formations->upsert($rows);
                $synced += count($rows);
            }

            $offset += $limit;
            $page++;
            $total = (int) ($payload['total_count'] ?? $payload['nhits'] ?? 0);
        } while (count($records) === $limit && ($total === 0 || $offset < $total) && $page < $maxPages);

        return $synced;
    }

    private function mapRecord(array $record): array
    {
        $fields = $record['record']['fields'] ?? $record['fields'] ?? $record;
        $now = now();
        $coordinates = $this->coordinates($fields);
        $formationName = $this->field($fields, ['lib_for_voe_ins', 'formation', 'libelle_formation', 'fil_lib_voe_acc']);
        $university = $this->field($fields, ['g_ea_lib_vx', 'etablissement', 'etab_lib', 'lib_etab']);
        $specialization = $this->field($fields, ['fil_lib_voe_acc', 'fili', 'libelle_filiere', 'formation_type']);

        return [
            'formation_id' => (string) ($this->field($fields, ['cod_aff_form', 'formation_id', 'id_pformation']) ?? Arr::get($record, 'record.id')),
            'formation_name' => (string) ($formationName ?? $specialization ?? 'Formation Parcoursup'),
            'university_name' => $university,
            'city' => $this->field($fields, ['ville_etab', 'commune_etab', 'ville']),
            'region' => $this->field($fields, ['region_etab_aff', 'region_etab', 'region']),
            'country' => 'France',
            'latitude' => $coordinates[0],
            'longitude' => $coordinates[1],
            'formation_type' => $this->field($fields, ['fili', 'type_formation', 'formation_type']),
            'specialization' => $specialization,
            'duration' => $this->inferDuration($formationName, $specialization),
            'admission_rate' => $this->numeric($this->field($fields, ['taux_acces_ens', 'taux_acces', 'taux_admission'])),
            'capacity' => (int) $this->numeric($this->field($fields, ['capa_fin', 'capacite', 'capacity'])),
            'website' => $this->field($fields, ['lien_form_psup', 'url_formation', 'website']),
            'image_url' => $this->field($fields, ['image_url', 'photo_url', 'photo', 'image']),
            'description' => $this->description($formationName, $university, $specialization),
            'tuition' => null,
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    private function field(array $fields, array $keys): mixed
    {
        foreach ($keys as $key) {
            if (filled($fields[$key] ?? null)) {
                return $fields[$key];
            }
        }

        return null;
    }

    private function coordinates(array $fields): array
    {
        $value = $this->field($fields, ['coordonnees_gps', 'geolocalisation', 'geo_point_2d']);

        if (is_array($value)) {
            return [
                $this->numeric($value['lat'] ?? $value[0] ?? null),
                $this->numeric($value['lon'] ?? $value['lng'] ?? $value[1] ?? null),
            ];
        }

        if (is_string($value) && str_contains($value, ',')) {
            [$lat, $lng] = array_map('trim', explode(',', $value, 2));

            return [$this->numeric($lat), $this->numeric($lng)];
        }

        return [null, null];
    }

    private function numeric(mixed $value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (float) str_replace(',', '.', (string) $value);
    }

    private function inferDuration(?string $formationName, ?string $specialization): ?string
    {
        $text = mb_strtolower((string) $formationName.' '.(string) $specialization);

        return match (true) {
            str_contains($text, 'bts') => '2 ans',
            str_contains($text, 'but') => '3 ans',
            str_contains($text, 'licence') => '3 ans',
            str_contains($text, 'cpge') => '2 ans',
            default => null,
        };
    }

    private function description(?string $formationName, ?string $university, ?string $specialization): string
    {
        return trim(sprintf(
            '%s proposée par %s. Cette fiche Parcoursup aide les étudiants internationaux à comparer les formations, vérifier les statistiques d’accès et préparer leur orientation avec StudyWay.',
            $formationName ?: $specialization ?: 'Formation',
            $university ?: 'un établissement français'
        ));
    }
}
