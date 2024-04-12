<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $latestPosts = Post::latest()->take(3)->get();
        $latestUsers = User::latest()->take(3)->get();
        $latestCategories = Category::latest()->take(3)->get();

        return Inertia::render('Dashboard', [
            'latestPosts' => $latestPosts,
            'latestUsers' => $latestUsers,
            'latestCategories' => $latestCategories,
        ]);
    }
}
