<?php

use app\Http\Controllers\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('/fe/step1/1', [Api\Step1_1\FrontendController::class, 'index']);

// Website
Route::get('/web/step1/1', [Api\Step1_1\WebsiteController::class, 'index']);

// Frontend
Route::get('/fe/step1/2', [Api\Step1_2\FrontendController::class, 'index']);

// Website
Route::get('/web/step1/2', [Api\Step1_2\WebsiteController::class, 'index']);
