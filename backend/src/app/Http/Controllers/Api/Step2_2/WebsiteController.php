<?php

namespace App\Http\Controllers\Api\Step2_2;

use App\Http\Controllers\Controller;
use App\Models\Step2_1\Content;
use App\Models\Step2_1\ContentField;
use App\Models\Step2_1\Field;
use App\Models\Step2_1\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function index(Request $request, $alias)
    {
        $limit = $request->input('limit', 10);
        $current = $request->input('current', 1);

        $contents = [];
        try {
            $model = Model::where('alias', $alias)->first();
            if (!$model) {
                throw new ModelNotFoundException('Not Found');
            }
            $posts = Content::where('model_id', $model->id)->paginate($limit, ['*'], 'page', $current);

            foreach ($posts as $post) {
                $fields = [];
                $contentFields = ContentField::where('content_id', $post->id)->get();
                $fields['id'] = $post->id;
                foreach ($contentFields as $contentField) {
                    $field = Field::where('id', $contentField->field_id)->first();
                    $fields['field.' . $field->title] = $contentField->value;
                }
                $fields['created_at'] = $post->created_at;
                $fields['updated_at'] = $post->created_at;

                $contents[] = $fields;
            }

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'total' => $posts->total(),         // 全件数
                'current' => $posts->currentPage(), // 表示ページ番号
                'pages' => $posts->lastPage(),   // 総ページ数
                'limit' => $posts->perPage(),     // 1ページの表示件数
                'contents' => $contents
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());

        }
    }

    public function show(Request $request, $alias, $id)
    {
        $contents = [];
        try {
            // モデル 取得
            $model = Model::where('alias', $alias)->first();
            if (!$model) {
                throw new ModelNotFoundException('Not Found');
            }

            // 記事データ 取得
            $post = Content::where('model_id', $model->id)->where('id', $id)->first();

            if (!$post) {
                throw new ModelNotFoundException('Post Not Found');
            }

            // 記事データ 整形
            $contentFields = ContentField::where('content_id', $post->id)->get();
            $contents['id'] = $post->id;
            foreach ($contentFields as $contentField) {
                $field = Field::where('id', $contentField->field_id)->first();
                $contents['field.' . $field->title] = $contentField->value;
            }
            $contents['created_at'] = $post->created_at;
            $contents['updated_at'] = $post->created_at;

            return response()->json([
                'success' => true,
                'timestamp' => now()->timestamp,
                'contents' => $contents
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'sent_at' => now()->timestamp,
            ], $e->getCode());

        }
    }
}
