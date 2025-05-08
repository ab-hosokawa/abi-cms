<?php

namespace App\Mod\News\Tests\Feature\Admin;

use App\Mod\News\Domain\Models\News;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class NewsAdminDeleteTest extends AbstractFeatureTest
{
    public function test_delete(): void
    {
        $post = News::factory()->create();
        $this->assertEquals(1, News::count());

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(204);

        $this->assertEquals(0, News::count());
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->delete($this->getUrl('api.news.admin.delete', $params), $data, $headers);
    }
}
