<?php

namespace App\Mod\Article\Tests\Feature\Front;

use App\Mod\Article\Domain\Models\Article;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ArticleFrontDetailTest extends AbstractFeatureTest
{
    public function test_detail(): void
    {
        // データ作成
        $post = Article::factory()->create();

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson([
            'contents' => [
                'title' => $post->title
            ]
        ]);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->get($this->getUrl('api.article.front.detail', $params), $headers);
    }
}
