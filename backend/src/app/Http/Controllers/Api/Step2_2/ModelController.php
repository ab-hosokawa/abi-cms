<?php

namespace App\Http\Controllers\Api\Step2_2;

use App\Http\Controllers\Controller;
use App\Models\Step2_1\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ModelController extends Controller
{
    /** 一覧
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $current = $request->input('current', 1);

        $posts = Model::paginate($limit, ['*'], 'page', $current);

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

    public function create(Request $request)
    {

    }

    /** 登録
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'alias' => 'required|string',
        ]);

        try {

            $model = new Model();

            $model->title = $validatedData['title'];
            $model->alias = $validatedData['alias'];

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

        } catch(ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        } catch(\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],500);
        }
    }

    /** 編集
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        try {
            $post = Model::findOrFail($id);

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'data' => $post,
                ]
            ],200);

        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],404);

        } catch(\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],500);

        }
    }

    /** 更新
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'alias' => 'required|string',
        ]);

        try {

            $post = Model::findOrFail($id);

            $post->update($validatedData);

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'data' => $post,
                ]
            ], 204);

        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],404);

        } catch(\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],500);

        }
    }

    /** 削除
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        try {
            $post = Model::findOrFail($id);

            $post->delete();

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'id' => $post->id,
                    'result' => true,
                ]
            ], 204);
        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],404);

        } catch(\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],500);

        }
    }

}
