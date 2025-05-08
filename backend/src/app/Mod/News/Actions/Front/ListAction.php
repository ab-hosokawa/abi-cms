<?php
namespace App\Mod\News\Actions\Front;

use App\Http\Actions\BaseAction;
use App\Mod\News\Domain\NewsService as Domain;
use App\Mod\News\Responder\Front\ListResponder as Responder;
use Symfony\Component\HttpFoundation\Request;

/**
 * @property Domain $domain
 * @property Responder $responder
 */
class ListAction extends BaseAction
{
    public function __construct(Domain $domain, Responder $responder)
    {
        parent::__construct($domain, $responder);
    }

    protected function callback(Request $request): array
    {
        $list = $this->domain->findList($request);
        return [
            'success' => true,
            'timestamp' => now()->timestamp,
            'all' => $list['total'],
            'current' => $list['current'],
            'limit' => $list['limit'],
            'pages' => $list['pages'],
            'contents' => $list['data']
        ];
    }
}
