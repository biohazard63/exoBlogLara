<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageControleur;
use App\Http\Controllers\PostControleur;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageControleur::class, 'home']);

Route::get('/abouts', [PageControleur::class, 'abouts'])->name('abouts');

Route::get('/legals', [PageControleur::class, 'legals'])->name('legals');

Route::get('/articles', [PostControleur::class, 'index']);
Route::get('/articles/category/{categoryId}', [PostControleur::class, 'getPostsByCategory'])->name('articles.category');
Route::get('/articles/{id}', [PostControleur::class, 'show'])->name('articles.show');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
