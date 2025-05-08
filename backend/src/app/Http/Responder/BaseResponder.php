<?php
namespace App\Http\Responder;

use Symfony\Component\HttpFoundation\Response;

class BaseResponder
{
    protected $statusCode = 200;

    public function response(array $data = []):Response
    {
        return \response()->json($data, $this->statusCode);
    }
}
