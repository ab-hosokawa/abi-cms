<?php

namespace Tests\Feature;

use Illuminate\Testing\TestResponse;
use Tests\TestCase;

abstract class AbstractFeatureTest extends TestCase
{
    /**
     * API実行抽象メソッド
     * @param array $params
     * @param array $data
     * @param array $headers
     * @return TestResponse
     */
    abstract protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse;

    /**
     * URL取得
     * @param string $routeName
     * @param array $params
     * @return string
     */
    protected function getUrl(string $routeName, array $params = []): string
    {
        return route($routeName, $params);
    }
}
