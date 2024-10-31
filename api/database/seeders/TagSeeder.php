<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'Traditional',
            'Cultural',
            'Historical',
            'Religious',
            'Festival',
            'Ceremony',
            'Custom',
            'Ritual',
            'Art',
            'Craft',
            'Music',
            'Dance',
            'Theatre',
            'Literature',
            'Cuisine',
            'Fashion',
            'Architecture',
            'Language',
            'Folklore',
            'Mythology',
            'Legend',
            'Folk',
            'Tribal',
            'Indigenous',
        ];

        foreach ($tags as $tag) {
            Tag::create([
                'tag_name' => $tag,
            ]);
        }
    }
}
