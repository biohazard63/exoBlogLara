<?php

namespace App\Http\Controllers;

use App\Models\Post; // Assurez-vous de remplacer ceci par le modèle approprié pour vos articles

class ManagementController extends Controller
{
    public function postManagement() {
        $posts = Post::all(); // Fetch all posts from the database

        return Inertia::render('PostManagement', [
            'posts' => $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                ];
            }),
        ]);
    }
}
