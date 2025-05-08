<?php
namespace App\Mod\News\Actions\Admin;

use App\Http\Actions\BaseAction;
use App\Mod\News\Domain\NewsService as Domain;
use App\Mod\News\Responder\Admin\ListResponder as Responder;
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
        return [
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => $this->domain->findList($request)
        ];
    }
}
