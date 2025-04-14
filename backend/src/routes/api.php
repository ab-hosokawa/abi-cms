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

    // STEP2
    Route::prefix('/step2')->group(function() {
        // 1
        // model
        Route::get('/1/model', [Api\Step2_1\ModelController::class, 'index']);
        Route::post('/1/model/store', [Api\Step2_1\ModelController::class, 'store']);
        Route::get('/1/model/{id}', [Api\Step2_1\ModelController::class, 'show']);
        Route::put('/1/model/{id}/update', [Api\Step2_1\ModelController::class, 'update']);
        Route::delete('/1/model/{id}/destroy', [Api\Step2_1\ModelController::class, 'destroy']);
        Route::get('/1/model/{id}/edit', [Api\Step2_1\ModelController::class, 'edit']);
        // field
        Route::get('/1/{model_id}/field', [Api\Step2_1\FieldController::class, 'index']);
        Route::post('/1/{model_id}/field/store', [Api\Step2_1\FieldController::class, 'store']);
        Route::get('/1/{model_id}/field/{id}', [Api\Step2_1\FieldController::class, 'show']);
        Route::put('/1/{model_id}/field/{id}/update', [Api\Step2_1\FieldController::class, 'update']);
        Route::delete('/1/{model_id}/field/{id}/destroy', [Api\Step2_1\FieldController::class, 'destroy']);
        Route::get('/1/{model_id}/field/{id}/edit', [Api\Step2_1\FieldController::class, 'edit']);
        // 2
        // content
        Route::get('/2/content', [Api\Step2_2\ContentController::class, 'index']);
        Route::post('/2/content/store', [Api\Step2_2\ContentController::class, 'store']);
        Route::get('/2/content/{id}show', [Api\Step2_2\ContentController::class, 'show']);
        Route::put('/2/content/{id}/update', [Api\Step2_2\ContentController::class, 'update']);
        Route::delete('/2/content/{id}/destroy', [Api\Step2_2\ContentController::class, 'destroy']);
        Route::get('/2/content/{id}/edit', [Api\Step2_2\ContentController::class, 'edit']);

        // 全件取得
        Route::get('/2/model/posts', [Api\Step2_2\ModelController::class, 'posts']);
        Route::get('/2/field/posts', [Api\Step2_2\FieldController::class, 'posts']);
        Route::get('/2/content/posts', [Api\Step2_2\ContentController::class, 'contentPosts']);
        Route::get('/2/content_field/posts', [Api\Step2_2\ContentController::class, 'contentFieldPosts']);

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
    // STEP2
    Route::prefix('/step2')->group(function() {

        // 全件取得
        Route::get('/2/model/posts', [Api\Step2_2\WebsiteController::class, 'modelPosts']);

        // 2
        Route::get('/2/{alias}', [Api\Step2_2\WebsiteController::class, 'index']);
        Route::get('/2/{alias}/{id}', [Api\Step2_2\WebsiteController::class, 'show']);


    });
});
