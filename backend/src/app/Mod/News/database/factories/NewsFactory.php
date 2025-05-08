<?php
namespace App\Mod\News\Database\Factories;

use App\Mod\News\Domain\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    protected $model = News::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word
        ];
    }
}
