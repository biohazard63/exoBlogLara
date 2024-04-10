<?php

namespace App\Http\Controllers;
use App\Models\Category; // Add this line

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryControler extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('CategoryManagement', [
            'categories' => $categories
        ]);
    }

    // In CategoryController.php
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json($category, 201);
    }

    public function getCategories() {
        $categories = Category::all();
        return response()->json($categories);
    }
}
