<?php

namespace App\Mod\Article\Actions\Admin;

use App\Http\Actions\BaseAction;
use App\Mod\Article\Domain\ArticleService as Domain;
use App\Mod\Article\Responder\Admin\UpdateResponder as Responder;
use Symfony\Component\HttpFoundation\Request;

/**
 * @property Domain $domain
 * @property Responder $responder
 */
class UpdateAction extends BaseAction
{
    public function __construct(Domain $domain, Responder $responder)
    {
        parent::__construct($domain, $responder);
    }

    protected function callback(Request $request): array
    {
        $id = $request->route('id');
        return [
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => [
                'data' => $this->domain->save($request, $id)
            ]
        ];
    }

}
