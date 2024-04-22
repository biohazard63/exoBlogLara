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
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            PostsTableSeeder::class,
        ]);


            User::factory()->create([
                'name' => 'Admin',
                'email' => 'test@example.com',
                'password' => bcrypt('test'),
                'role_id' => 1,
            ]);
            User::factory()->create([
                'name' => 'subscriber',
                'email' => 'user@example.com',
                'password' => bcrypt('test'),
                'role_id' => 3,
                ]);
        }

}
