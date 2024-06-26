<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;

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
            'body' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validez que l'image est un fichier image
            'category_ids' => 'required|array',
        ]);

        $post = new Post;
        $post->title = $request->title;
        $post->body = $request->body;
        $post->description = $request->description;

        $imageName = time() . '.' . $request->image->extension(); // Créez un nom unique pour l'image
        $request->image->move(public_path('img'), $imageName); // Déplacez l'image dans le dossier public/img
        $post->image = '/img/' . $imageName; // Enregistrez le chemin de l'image dans la base de données

        $post->author_id = Auth::id();
        $post->save();

        $categoryIds = $request->category_ids;
        $post->categories()->attach($categoryIds);

        return response()->json(['message' => 'Article successfully created', 'post' => $post], 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);


        if ($post) {
            $post->title = $request->input('title');
            $post->description = $request->input('description');
            $post->body = $request->input('body');
            $post->image = $request->input('image');
            $post->save();

            $categoryIds = $request->category_ids; // les IDs des catégories à associer au post
            $post->categories()->attach($categoryIds);

            return redirect()->route('user-posts');
        } else {
            return response()->json(['message' => 'Article not found'], 404);
        }
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
    $post = Post::with('categories')->find($id);

    if ($post) {
        return Inertia::render('EditArticle', ['post' => $post]);
    } else {
        return response()->json(['message' => 'Article not found'], 404);
    }
}


    public function userPosts()
    {
        $userId = auth()->id();
        $posts = Post::with('user')->where('author_id', $userId)->get();
        error_log(print_r($posts, true));

        return Inertia::render('UserPosts', ['posts' => $posts]);
    }

    public function getCategory()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

}
