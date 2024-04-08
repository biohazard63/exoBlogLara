<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        $posts = Post::factory(10)->create();

        // Get all category ids
        $categoryIds = Category::all()->pluck('id')->toArray();

        // Assign each post to a random category
        foreach ($posts as $post) {
            $post->categories()->attach($faker->randomElement($categoryIds));
        }
    }
}
