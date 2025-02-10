<?php

namespace app\Http\Controllers\Api\Step1_2;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function index(Request $request)
    {
        $posts = Article::all();

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'contents' => $posts
        ],200);
    }

    public function show(Request $request, $id)
    {
        $post = Article::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
                'sent_at' => now()->timestamp,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'contents' => $post
        ],200);
    }
}
