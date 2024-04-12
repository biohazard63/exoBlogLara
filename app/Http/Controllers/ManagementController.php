<?php

namespace App\Http\Controllers;

use App\Models\Post; // Add this line
use Illuminate\Http\Request;
use Inertia\Inertia;

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
