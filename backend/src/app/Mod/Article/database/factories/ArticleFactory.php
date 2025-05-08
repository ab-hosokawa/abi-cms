<?php
namespace App\Mod\Article\Database\Factories;

use App\Mod\Article\Domain\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word,
            'body' => $this->faker->text
        ];
    }
}
