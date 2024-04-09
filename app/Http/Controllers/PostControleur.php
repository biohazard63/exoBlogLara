<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostControleur extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->get(); // Récupère tous les posts avec leurs auteurs

        return Inertia::render('Article', ['articles' => $posts]); // Passe les posts à la vue
    }

public function getPostsByCategory($categoryId)
{
    $posts = Post::whereHas('categories', function ($query) use ($categoryId) {
        $query->where('category_id', $categoryId);
    })->with('user')->get();

    return response()->json(['posts' => $posts]);
}
}
