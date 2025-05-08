<?php

namespace App\Mod\Article\Tests\Feature\Admin;

use App\Mod\Article\Domain\Models\Article;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ArticleAdminDeleteTest extends AbstractFeatureTest
{
    public function test_delete(): void
    {
        $post = Article::factory()->create();
        $this->assertEquals(1, Article::count());

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(204);

        $this->assertEquals(0, Article::count());
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->delete($this->getUrl('api.article.admin.delete', $params), $data, $headers);
    }
}
