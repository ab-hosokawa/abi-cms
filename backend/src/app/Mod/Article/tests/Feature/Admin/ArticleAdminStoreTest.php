<?php

namespace App\Mod\Article\Tests\Feature\Admin;

use App\Mod\Article\Domain\Models\Article;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ArticleAdminStoreTest extends AbstractFeatureTest
{

    public function test_store(): void
    {
        // 登録データ
        $inputData = Article::factory()->make()->toArray();

        $testResponse = $this->apiExec([], $inputData);
        $testResponse->assertStatus(201);
        $testResponse->assertJson([
            'payload' => [
                'data' => [
                    'title' => $inputData['title']
                ]
            ]
        ]);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->post($this->getUrl('api.article.admin.store'), $data, $headers);
    }
}
