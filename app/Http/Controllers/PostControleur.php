<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

    public function show($id)
    {
        $post = Post::with('user')->find($id);

        return Inertia::render('SingleArticle', ['article' => $post]);
    }

    public function create()
    {
        return Inertia::render('AddArticle');

    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'description' => 'required',
            'image' => 'nullable|url',
        ]);

        $post = new Post;
        $post->title = $request->title;
        $post->content = $request->content;
        $post->description = $request->description;
        $post->image = $request->image;
        $post->author_id = Auth::id(); // Assurez-vous que l'utilisateur est connecté
        $post->save();

        return response()->json(['message' => 'Article successfully created', 'post' => $post], 201);
    }

    public function destroy($id)
{
    $post = Post::find($id);

    if ($post) {
        // Dissociez d'abord les catégories associées
        $post->categories()->detach();

        // Puis supprimez le post
        $post->delete();

        return response()->json(['message' => 'Article supprimé avec succès'], 200);
    } else {
        return response()->json(['message' => 'Article non trouvé'], 404);
    }
}
    public function edit($id)
    {
        $post = Post::find($id);

        if ($post) {
            return Inertia::render('EditArticle', ['post' => $post]);
        } else {
            return response()->json(['message' => 'Article not found'], 404);
        }
    }
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if ($post) {
            $post->title = $request->input('title');
            $post->description = $request->input('description');
            $post->content = $request->input('content');
            $post->image = $request->input('image');
            $post->save();

            return redirect()->route('postmanagement');
        } else {
            return response()->json(['message' => 'Article not found'], 404);
        }
    }

}