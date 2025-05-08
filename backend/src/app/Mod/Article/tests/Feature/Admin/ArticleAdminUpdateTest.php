<?php

namespace App\Mod\Article\Tests\Feature\Admin;

use App\Mod\Article\Domain\Models\Article;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ArticleAdminUpdateTest extends AbstractFeatureTest
{

    public function test_update(): void
    {
        // データ作成
        $updateData = Article::factory()->create()->toArray();
        $updateData['title'] = $updateData['title'] . ' edit';

        $testResponse = $this->apiExec(['id' => $updateData['id']], $updateData);
        $testResponse->assertStatus(204);

        // 更新確認
        $post = Article::find($updateData['id']);
        $this->assertEquals($updateData['title'], $post->title);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->put($this->getUrl('api.article.admin.update', $params), $data, $headers);
    }
}
