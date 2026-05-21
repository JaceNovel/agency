<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'parcoursup' => [
        'records_url' => env('PARCOURSUP_RECORDS_URL', 'https://data.education.gouv.fr/api/v2/catalog/datasets/fr-esr-parcoursup/records'),
        'exports_json_url' => env('PARCOURSUP_EXPORTS_JSON_URL', 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/exports/json'),
    ],

    'duffel' => [
        'access_token' => env('DUFFEL_ACCESS_TOKEN'),
        'version' => env('DUFFEL_VERSION', 'v2'),
        'base_url' => env('DUFFEL_BASE_URL', 'https://api.duffel.com'),
    ],

    'moneroo' => [
        'secret_key' => env('MONEROO_SECRET_KEY'),
        'base_url' => env('MONEROO_BASE_URL', 'https://api.moneroo.io'),
        'return_url' => env('MONEROO_RETURN_URL', env('APP_URL').'/payments/moneroo/return'),
        'webhook_secret' => env('MONEROO_WEBHOOK_SECRET'),
    ],

];
