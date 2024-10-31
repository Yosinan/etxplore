<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // description for each category
        $categories = [
            'Food',
            'Cloth',
            'Historical',
            'Religious',
            'Festival',
            'Art',
        ];

        foreach ($categories as $category) {
            Category::create([
                'category_name' => $category,
            ]);
        }
    }
}
