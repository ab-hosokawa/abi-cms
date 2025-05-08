<?php

namespace App\Mod\News\Tests\Feature\Admin;

use App\Mod\News\Domain\Models\News;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class NewsAdminUpdateTest extends AbstractFeatureTest
{

    public function test_update(): void
    {
        // データ作成
        $updateData = News::factory()->create()->toArray();
        $updateData['title'] = $updateData['title'] . ' edit';

        $testResponse = $this->apiExec(['id' => $updateData['id']], $updateData);
        $testResponse->assertStatus(204);

        // 更新確認
        $post = News::find($updateData['id']);
        $this->assertEquals($updateData['title'], $post->title);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->put($this->getUrl('api.news.admin.update', $params), $data, $headers);
    }
}
