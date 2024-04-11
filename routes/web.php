<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageControleur;
use App\Http\Controllers\PostControleur;
use App\Http\Controllers\ManagementController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategoryControler;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageControleur::class, 'home'])->name('home');
Route::get('/articles/{id}', [PageControleur::class, 'show'])->name('articles.show');

Route::get('/abouts', [PageControleur::class, 'abouts'])->name('abouts');
Route::get('/legals', [PageControleur::class, 'legals'])->name('legals');

Route::get('/articles', [PostControleur::class, 'index'])->name('articles');
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
Route::get('/add-article', [PostControleur::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('add-article');
Route::post('/add-article', [PostControleur::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('post.store');
Route::get('/edit-article/{id}', [PostControleur::class, 'edit'])
    ->middleware(['auth', 'verified'])
    ->name('post.edit');
Route::put('/edit-article/{id}', [PostControleur::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('post.update');
Route::delete('/delete-article/{id}', [PostControleur::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('post.destroy');


Route::get('/role-management', function () {
    $user = auth()->user();
    if ($user && $user->role_id === 1) { // Replace '1' with the id of the 'admin' role in your `roles` table
        return App::make(App\Http\Controllers\RoleController::class)->index();
    }

    return redirect('/');
})->name('role-management');

Route::put('/roles/{id}', [RoleController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('roles.update');


Route::get('/category-management', function () {
    $user = auth()->user();
    if ($user && $user->role_id === 1 ) {
        return App::make(App\Http\Controllers\CategoryControler::class)->index();
    }

    return redirect('/');
})->name('category-management');

Route::post('/category-management', [CategoryControler::class, 'store'])->name('categories.store');
Route::put('/category-management/{id}', [CategoryControler::class, 'update'])->name('categories.update');
Route::delete('/category-management/{id}', [CategoryControler::class, 'destroy'])->name('categories.destroy');


Route::get('/user-posts', function () {
    $user = auth()->user();
    if ($user && ($user->role_id === 1 || $user->role_id === 2)) {
        return App::make(App\Http\Controllers\PostControleur::class)->userPosts();
    }
    return redirect('/');
})->name('user-posts');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
