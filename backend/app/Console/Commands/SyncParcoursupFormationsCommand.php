<?php

namespace App\Console\Commands;

use App\Jobs\SyncParcoursupFormationsJob;
use Illuminate\Console\Command;

class SyncParcoursupFormationsCommand extends Command
{
    protected $signature = 'parcoursup:sync {--sync : Run immediately instead of dispatching a queued job} {--limit=100} {--max-pages=0}';

    protected $description = 'Synchronise les formations Parcoursup depuis l’API officielle Open Data.';

    public function handle(): int
    {
        $limit = max(1, min(100, (int) $this->option('limit')));
        $maxPages = max(0, (int) $this->option('max-pages'));
        $job = new SyncParcoursupFormationsJob($limit, $maxPages);

        if ($this->option('sync')) {
            dispatch_sync($job);
            $this->info('Synchronisation Parcoursup exécutée immédiatement.');

            return self::SUCCESS;
        }

        dispatch($job);
        $this->info('Synchronisation Parcoursup ajoutée à la queue.');

        return self::SUCCESS;
    }
}
