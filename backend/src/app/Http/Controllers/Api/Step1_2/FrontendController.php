<?php

namespace app\Http\Controllers\Api\Step1_2;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function index(Request $request)
    {
        $posts = Article::all();

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'data' => $posts,
            ]
        ],200);
    }

    public function store(Request $request)
    {
        $model = new Article();

        $model->title = $request->title;
        $model->body = $request->body;

        $model->save();

        $result = [
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'id' => $model->id,
                'result' => true,
            ]
        ];

        return response()->json($result,201);
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
            'payload' => [
                'data' => $post,
            ]
        ],200);
    }
}
