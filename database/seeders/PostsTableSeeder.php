<?php

namespace Database\Seeders;

use App\Models\Post; // Add this line
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Post::factory(10)->create();
    }
}
