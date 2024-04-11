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


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Redirect to the same page after storing the category
        return redirect()->back();
    }
public function update(Request $request, $id)
{
    $request->validate([
        'title' => 'required|string|max:255',
    ]);

    $category = Category::find($id);

    if ($category) {
        $category->title = $request->title;
        $category->description = $request->description;
        $category->save();

        return redirect()->back();
    } else {
        return response()->json(['message' => 'Category not found'], 404);
    }
}

public function destroy($id)
{
    $category = Category::find($id);

    if ($category) {
        $category->delete();

        return redirect()->back();
    } else {
        return response()->json(['message' => 'Category not found'], 404);
    }
}

}
