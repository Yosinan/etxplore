<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Event;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // create events
        // Event::factory(10)->create();

        // $this->call(UserContributionsTableSeeder::class);
        $this->call(EventSeeder::class);
        // $this->call(RegionSeeder::class);
        // $this->call(CategorySeeder::class);
        // $this->call(ArticleSeeder::class);
        // $this->call(UserRolePermissionSeeder::class);

    }
}
