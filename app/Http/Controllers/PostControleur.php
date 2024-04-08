<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostControleur extends Controller
{
    public function index()
    {
        $posts = Post::with('author')->get(); // Récupère tous les posts avec leurs auteurs

        return Inertia::render('Article', ['articles' => $posts]); // Passe les posts à la vue
    }
}
