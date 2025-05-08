<?php
namespace App\Mod\News\Tests\Feature\Admin;

use App\Mod\News\Domain\Models\News;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class NewsAdminListTest extends AbstractFeatureTest
{

    public function test_list(): void
    {
        // データ7件作成
        News::factory(7)->create();

        // 1ページ目テスト
        $testResponse = $this->apiExec(['current' => 1, 'limit' => 5]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson(['payload' => ['total' => 7]]);
        $testResponse->assertJsonCount(5, 'payload.data');

        // 2ページ目テスト
        $testResponse = $this->apiExec(['current' => 2, 'limit' => 5]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson(['payload' => ['total' => 7]]);
        $testResponse->assertJsonCount(2, 'payload.data');
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        return $this->get($this->getUrl('api.news.admin.list', $params), $headers);
    }

}
