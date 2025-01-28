<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FrontendController;
use App\Http\Controllers\Api\WebsiteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return 'データベース接続成功';
    } catch (\Exception $e) {
        return 'データベース接続失敗: ' . $e->getMessage();
    }
});

// Frontend
Route::get('/fe/step1/1', [FrontendController::class, 'index']);

// Website
Route::get('/web/step1/1', [WebsiteController::class, 'index']);
