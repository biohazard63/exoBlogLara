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
    $posts = Post::with('author')->latest()->take(3)->get(); // Récupère les 3 derniers posts avec leurs auteurs

    return Inertia::render('Welcome', ['articles' => $posts]); // Passe les posts à la vue
}

}
