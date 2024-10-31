<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            ['region_name' => 'Northern', 'description' => 'A region in northern Ethiopia.'],
            ['region_name' => 'Southern', 'description' => 'A region in southern Ethiopia.'],
            ['region_name' => 'Eastern', 'description' => 'A region in eastern Ethiopia.'],
            ['region_name' => 'Western', 'description' => 'A region in western Ethiopia.'],
            ['region_name' => 'Central', 'description' => 'A region in central Ethiopia.'],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}
