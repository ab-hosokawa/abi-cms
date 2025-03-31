<?php

namespace App\Http\Controllers\Api\Step2_1;

use App\Http\Controllers\Controller;
use App\Models\Step2_1\Field;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FieldController extends Controller
{
    /** 一覧
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $current = $request->input('current', 1);

        $posts = Field::paginate($limit, ['*'], 'page', $current);

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
            'display_name' => 'required|string',
            'type' => 'required|string',
            'model_id' => 'required|exists:models,id',
        ]);

        try {

            $model = new Field();

            $model->title = $validatedData['title'];
            $model->display_name = $validatedData['display_name'];
            $model->type = $validatedData['type'];
            $model->model_id = $validatedData['model_id'];

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
            $post = Field::findOrFail($id);

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
            'display_name' => 'required|string',
            'type' => 'required|string',
            'model_id' => 'required|exists:models,id',
        ]);

        try {

            $post = Field::findOrFail($id);

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
            $post = Field::findOrFail($id);

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
