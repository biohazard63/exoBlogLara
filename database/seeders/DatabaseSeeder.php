<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test' . $i . '@example.com',
                'password' => bcrypt('04051995'),
                'role_id' => 1,
            ]);
        }
    }
}
