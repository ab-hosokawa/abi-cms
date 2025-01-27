<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'id' => 1,
            'title' => 'abi-cms',
            'body' => 'abi-cmsのSTEP1-1'
        ];

        return response()->json($data);
    }
}
