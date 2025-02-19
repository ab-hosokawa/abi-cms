<?php

use App\Http\Controllers\Api;
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

/*************************************/
/********** 課題のルーティング **********/
/*************************************/
/** Frontend **/
Route::prefix('/fe')->group(function() {
    // STEP1
    Route::prefix('/step1')->group(function() {
        // 1
        Route::get('/1', [Api\Step1_1\FrontendController::class, 'index']);
        // 2
        Route::get('/2', [Api\Step1_2\FrontendController::class, 'index']);
        Route::post('/2/store', [Api\Step1_2\FrontendController::class, 'store']);
        Route::get('/2/{id}', [Api\Step1_2\FrontendController::class, 'show']);
        // 3
        Route::get('/3', [Api\Step1_3\FrontendController::class, 'index']);
        Route::put('/3/{id}', [Api\Step1_3\FrontendController::class, 'update']);
        Route::delete('/3/{id}', [Api\Step1_3\FrontendController::class, 'destroy']);
        Route::get('/3/{id}/edit', [Api\Step1_3\FrontendController::class, 'edit']);
    });
});

/** Website **/
Route::prefix('/web')->group(function() {
    // STEP1
    Route::prefix('/step1')->group(function() {
        // 1
        Route::get('/1', [Api\Step1_1\WebsiteController::class, 'index']);
        // 2
        Route::get('/2', [Api\Step1_2\WebsiteController::class, 'index']);
        Route::get('/2/{id}', [Api\Step1_2\WebsiteController::class, 'show']);
        // 3
        Route::get('/3', [Api\Step1_3\WebsiteController::class, 'index']);
    });
});
