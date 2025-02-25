<?php

namespace app\Http\Controllers\Api\Step1_3;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $current = $request->input('current', 1);
    
        $posts = Article::paginate($limit, ['*'], 'page', $current);
    
        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'total' => $posts->total(),         // 全件数
            'current' => $posts->currentPage(), // 表示ページ番号
            'pages' => $posts->lastPage(),   // 総ページ数
            'limit' => $posts->perPage(),     // 1ページの表示件数
            'contents' => $posts->items(),
        ]);
    }
}
