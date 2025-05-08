<?php

namespace App\Mod\News\Tests\Feature\Admin;

use App\Mod\News\Domain\Models\News;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class NewsAdminDetailTest extends AbstractFeatureTest
{
    public function test_detail(): void
    {
        // データ作成
        $post = News::factory()->create();

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson([
            'payload' => [
                'data' => [
                    'title' => $post->title
                ]
            ]
        ]);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->get($this->getUrl('api.news.admin.detail', $params), $headers);
    }
}
