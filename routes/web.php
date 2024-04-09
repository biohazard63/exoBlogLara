<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageControleur;
use App\Http\Controllers\PostControleur;
use App\Http\Controllers\ManagementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageControleur::class, 'home'])->name('home');
Route::get('/articles/{id}', [PageControleur::class, 'show'])->name('articles.show');

Route::get('/abouts', [PageControleur::class, 'abouts'])->name('abouts');
Route::get('/legals', [PageControleur::class, 'legals'])->name('legals');

Route::get('/articles', [PostControleur::class, 'index']);
Route::get('/articles/category/{categoryId}', [PostControleur::class, 'getPostsByCategory'])->name('articles.category');
Route::get('/articles/{id}', [PostControleur::class, 'show'])->name('articles.show');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/postmanagement', [PostControleur::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('postmanagement');
Route::get('/postmanagement', [PageControleur::class, 'postManagement'])
    ->middleware(['auth', 'verified'])
    ->name('postmanagement');
Route::middleware('auth:sanctum')->get('/posts', [ManagementController::class, 'postManagement']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
