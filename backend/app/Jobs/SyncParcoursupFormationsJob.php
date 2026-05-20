<?php

namespace App\Jobs;

use App\Services\ParcoursupOpenDataService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Throwable;

class SyncParcoursupFormationsJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public array $backoff = [60, 300, 900];

    public function __construct(
        private readonly int $limit = 100,
        private readonly int $maxPages = 0,
    ) {
    }

    public function handle(ParcoursupOpenDataService $service): void
    {
        $synced = $service->sync($this->limit, $this->maxPages);

        Log::info('Parcoursup formations synced', ['count' => $synced]);
    }

    public function failed(Throwable $exception): void
    {
        Log::error('Parcoursup sync job failed', [
            'message' => $exception->getMessage(),
        ]);
    }
}
