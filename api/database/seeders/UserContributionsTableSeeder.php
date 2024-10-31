<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserContribution;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserContributionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure the table is empty before seeding
        // DB::table('user_contributions')->truncate();

        // Define user data
        $users = [
            [
                'id' => 1,
                'username' => 'User One',
                'email' => 'user1@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 2,
                'username' => 'User Two',
                'email' => 'user2@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 3,
                'username' => 'User Three',
                'email' => 'user3@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 4,
                'username' => 'User Four',
                'email' => 'user4@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 5,
                'username' => 'User Five',
                'email' => 'user5@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 6,
                'username' => 'User Six',
                'email' => 'user6@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 7,
                'username' => 'User Seven',
                'email' => 'user7@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 8,
                'username' => 'User Eight',
                'email' => 'user8@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 9,
                'username' => 'User Nine',
                'email' => 'user9@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 10,
                'username' => 'User Ten',
                'email' => 'user10@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'id' => 1,
                'username' => 'User One',
                'email' => 'user1@example.com',
                'password' => bcrypt('password'),
            ],
        ];

        // Create users if they do not exist
        foreach ($users as $userData) {
            $user = User::firstOrCreate(['id' => $userData['id']], $userData);

            // Define user contribution data
            $contributions[] = [
                'user_id' => $user->id,
                'title' => 'Sample Contribution ' . $user->id,
                'description' => 'This is a sample contribution description for ' . $user->username . '.',
                'media' => 'sample' . $user->id . '.jpg',
                // Randomly assign a status to the contribution more than 50% of the time it will be approved
                'status' => rand(0, 100) > 50 ? 'approved' : 'pending',
                // Randomly assign a date to the contribution
                'created_at' => now()->subDays(rand(1, 30)),
            ];
        }

        // Seed the table with contribution data
        UserContribution::insert($contributions);
    }
}
