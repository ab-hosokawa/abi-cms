<?php
namespace App\Domain;

use Symfony\Component\HttpFoundation\Request;

class BaseService
{
    protected $model = null;

    public function __construct(mixed $model)
    {
        $this->model = $model;
    }

    public function findList(Request $request, ?int $limit = 10): array
    {
        $current = (int)$request->query->get('current', 1);
        $limit = (int)$request->query->get('limit', $limit);
        $posts = $this->model::paginate($limit, ['*'], 'page', $current);

        return [
            'total' => $posts->total(),
            'current' => $posts->currentPage(),
            'pages' => $posts->lastPage(),
            'limit' => $posts->perPage(),
            'data' => $posts->items(),
        ];
    }

    public function findDetail(?int $id): mixed
    {
        $post = $this->model::findOrFail($id);
        return $post;
    }

    public function save(Request $request, ?int $id = null): mixed
    {
        $modelName = $this->model;
        $post = $id ? $this->findDetail($id) : new $modelName();
        $inputs = $request->request->all();
        foreach ($inputs as $key => $val) {
            $post->{$key} = $val;
        }
        $post->save();

        return $post;
    }

    public function delete(int $id = null): array
    {
        $model = $this->findDetail($id);
        $model->delete();

        return [
            'id' => $model->id,
            'result' => true
        ];
    }
}
