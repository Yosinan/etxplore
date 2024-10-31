<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'media' => $this->faker->imageUrl(),
            // make the date a current date and future date
            'date' => $this->faker->dateTimeBetween('now', '+1 months'),
            'location' => $this->faker->address(),
        ];
    }
}
