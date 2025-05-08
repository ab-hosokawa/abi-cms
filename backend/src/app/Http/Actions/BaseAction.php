<?php
namespace App\Http\Actions;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class BaseAction
{
    protected $domain;
    protected $responder;

    public function __construct(mixed $domain, mixed $responder)
    {
        $this->domain = $domain;
        $this->responder = $responder;
    }

    public function __invoke(Request $request): Response
    {
        return $this->responder->response($this->callback($request));
    }

    protected function callback(Request $request): array
    {
        return [];
    }
}
