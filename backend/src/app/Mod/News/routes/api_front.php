<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('news')->name('news.')->group(function () {
        Route::prefix('front')->name('front.')->group(function () {
            Route::get('/list', [App\Mod\News\Actions\Front\ListAction::class, '__invoke'])->name('list');
            Route::get('/detail/{id}', [App\Mod\News\Actions\Front\DetailAction::class, '__invoke'])->name('detail');
        });
    });
});
