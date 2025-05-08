<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('article')->name('article.')->group(function () {
        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('/list', [App\Mod\Article\Actions\Admin\ListAction::class, '__invoke'])->name('list');
            Route::get('/detail/{id}', [App\Mod\Article\Actions\Admin\DetailAction::class, '__invoke'])->name('detail');
            Route::post('/store', [App\Mod\Article\Actions\Admin\StoreAction::class, '__invoke'])->name('store');
            Route::put('/update/{id}', [App\Mod\Article\Actions\Admin\UpdateAction::class, '__invoke'])->name('update');
            Route::delete('/delete/{id}', [App\Mod\Article\Actions\Admin\DeleteAction::class, '__invoke'])->name('delete');
        });
    });
});
