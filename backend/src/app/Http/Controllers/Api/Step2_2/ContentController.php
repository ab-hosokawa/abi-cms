<?php

namespace app\Http\Controllers\Api\Step2_2;

use App\Http\Controllers\Controller;
use App\Models\Step2_1\Content;
use App\Models\Step2_1\ContentField;
use App\Models\Step2_1\Field;
use App\Models\Step2_1\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ContentController extends Controller
{
    /** 一覧
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $current = $request->input('current', 1);

        $posts = Content::paginate($limit, ['*'], 'page', $current);

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
        // モデルのID
        $model_id = $request->input('model_id');
        // フィールド
        $request_fields = $request->input('fields');

        $data = [];

        try {
            DB::beginTransaction();

            $contentModel = new Content();
            $contentModel->model_id = $model_id;
            $contentModel->save();

            foreach($request_fields as $key => $value) {
                $data[] = [
                    'field_id' => $value['id'],
                    'content_id' => $contentModel->id,
                    'value' => $value['value']
            ];
        }

            $contentFieldModel = new ContentField();
            $tableName = $contentFieldModel->getTable();

            DB::table($tableName)->insert($data);

            $result = [
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'id' => $contentModel->id,
                    'result' => true,
                ]
            ];

            DB::commit();

            return response()->json($result,201);

        } catch(\Exception $e) {
            DB::rollBack();

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

    public function contentFieldPosts()
    {
        return ContentField::all();
    }
}
