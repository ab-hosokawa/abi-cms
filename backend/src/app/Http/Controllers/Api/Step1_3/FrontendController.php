<?php

namespace app\Http\Controllers\Api\Step1_3;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $current = $request->input('current', 1);

        $posts = Article::paginate($limit, ['*'], 'page', $current);

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'current' => $posts->currentPage(),
                'pages' => $posts->lastPage(),
                'data' => $posts,
            ]
        ],200);
    }

    public function update(Request $request, $id)
    {
        $post = Article::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
                'sent_at' => now()->timestamp,
            ], 404);
        }

        $post->title = $request->title;
        $post->body = $request->body;

        $post->save();

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'data' => $post,
            ]
        ],200);
    }

    public function destroy(Request $request, $id)
    {
        $post = Article::find($id);

        $post->delete();

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'data' => $post,
            ]
        ],200);
    }

    public function edit(Request $request, $id)
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
            'payload' => [
                'data' => $post,
            ]
        ],200);
    }
}
