<?php

namespace app\Http\Controllers\Api\Step1_3;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
                'total' => $posts->total(),
                'current' => $posts->currentPage(),
                'pages' => $posts->lastPage(),
                'data' => $posts->items(),
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

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'body' => 'required|string',
            ]);

            $post = Article::findOrFail($id);

            $post->update($validatedData);

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'data' => $post,
                ]
            ],200);

        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Model not found'
            ],404);

        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'e' => $e->getMessage()
            ],500);

        }
    }

    public function destroy(Request $request, $id)
    {
        $post = Article::findOrFail($id);

        $post->delete();

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'id' => $post->id,
                'result' => true,
            ]
        ],200);
    }

}
