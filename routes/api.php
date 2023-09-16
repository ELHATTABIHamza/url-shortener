<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UrlShortenerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/urls', [UrlShortenerController::class, 'index']);

Route::post('/shorten', [UrlShortenerController::class, 'create']);

Route::get('/{short_url}', [UrlShortenerController::class, 'redirect']);

Route::get('/urls/{id}', [UrlShortenerController::class, 'show']);