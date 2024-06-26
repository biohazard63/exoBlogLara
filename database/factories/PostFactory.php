<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'body' => $this->faker->paragraph,
            'description' => $this->faker->sentence,
            'image' => $this->faker->imageUrl(),
            'author_id' => \App\Models\User::factory(),
        ];
    }
}
