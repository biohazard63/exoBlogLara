<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;


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

    public function upload(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $logoName = 'logo.png';
        $request->logo->move(public_path('img'), $logoName);

        // Mettez à jour votre variable d'environnement ou votre entrée de base de données ici
        // ...

        return response()->json(['success'=>'Logo Uploaded Successfully']);
    }
}
