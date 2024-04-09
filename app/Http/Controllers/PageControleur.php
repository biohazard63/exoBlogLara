<?php

namespace App\Http\Controllers;

use App\Models\Post; // Add this line
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageControleur extends Controller
{
    public function abouts()
    {
        return Inertia::render('Abouts');
    }
   public function legals()
   {
       return Inertia::render('Legals');
   }
public function home()
{
    $posts = Post::with('user')->latest()->take(3)->get();
    return Inertia::render('Welcome', ['articles' => $posts]); // Passe les posts à la vue
}
    public function show($id)
    {
        $post = Post::with('user')->find($id);

        return Inertia::render('SingleArticle', ['article' => $post]);
    }



    public function postManagement() {
        $posts = Post::with('user')->latest()->get();
        return Inertia::render('PostManagement', ['posts' => $posts]);
    }

}
