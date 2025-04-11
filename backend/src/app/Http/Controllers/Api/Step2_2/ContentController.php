<?php

namespace app\Http\Controllers\Api\Step2_2;

use App\Http\Controllers\Controller;
use App\Models\Step2_1\Content;
use App\Models\Step2_1\ContentField;
use App\Models\Step2_1\Field;
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

        $data = [];
        $posts = Content::paginate($limit, ['*'], 'page', $current);

        foreach($posts as $post) {
            $contentFields = ContentField::where('content_id', $post->id)->get();

            foreach($contentFields as $contentField) {
                $field = FIeld::findOrFail($contentField->field_id);
                $fields[] = [
                    'id' => $field->id,
                    'value' => $contentField->value
                ];
            }

            $data = [
                'id' => $post->id,
                'model_id' => $post->model_id,
                'fields' => $fields,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];

        }

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'total' => $posts->total(),
                'current' => $posts->currentPage(),
                'pages' => $posts->lastPage(),
                'data' => $data,
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

            //// Contentの保存
            $contentModel = new Content();
            $contentModel->model_id = $model_id;
            $contentModel->save();
            //// ここまで

            //// ContentFieldの保存
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
            //// ここまで

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
        $fields = [];
        try {
            $post = Content::findOrFail($id);

            $contentFields = ContentField::where('content_id', $post->id)->get();

            foreach($contentFields as $contentField) {
                $field = FIeld::findOrFail($contentField->field_id);
                $fields[$field->title] = [
                    'id' => $field->id,
                    'value' => $contentField->value
                ];
            }

            $data = [
                'id' => $post->id,
                'model_id' => $post->model_id,
                'fields' => $fields,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'data' => $data,
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
        // モデルのID
        $model_id = $request->input('model_id');
        // フィールド
        $request_fields = $request->input('fields');

        $fields = [];

        try {

            $post = Content::findOrFail($id);

            DB::beginTransaction();

            //// Contentの保存
            $post->model_id = $model_id;
            $post->update(['model_id' => $model_id]);
            //// ここまで

            //// ContentFieldの保存
            foreach($request_fields as $key => $value) {
                $contentField = ContentField::where('content_id', $id)
                    ->where('field_id', $value['id'])->first();

                $contentField->update(['value' => $value['value']]);

                $fields[$key] = [
                    'id' => $value['id'],
                    'value' => $value['value'],
                ];
            }

            //// ここまで

            $data = [
                'model_id' => $model_id,
                'fields' => $fields,
            ];

            DB::commit();

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'payload' => [
                    'data' => $data,
                    'result' => true,
                ]
            ],204);

        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ],404);

        } catch(\Exception $e) {
            DB::rollBack();

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
            $post = Content::findOrFail($id);

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

    public function contentPosts()
    {
        return Content::all();
    }

    public function contentFieldPosts()
    {
        return ContentField::all();
    }
}
