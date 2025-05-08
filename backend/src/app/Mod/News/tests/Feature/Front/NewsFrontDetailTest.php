<?php

namespace App\Mod\News\Tests\Feature\Front;

use App\Mod\News\Domain\Models\News;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class NewsFrontDetailTest extends AbstractFeatureTest
{
    public function test_detail(): void
    {
        // データ作成
        $post = News::factory()->create();

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
        return $this->get($this->getUrl('api.news.front.detail', $params), $headers);
    }
}
