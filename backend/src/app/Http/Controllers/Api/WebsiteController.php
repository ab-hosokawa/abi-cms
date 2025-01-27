<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'status_code' => 200,
            'contents' => [
                'id' => 1,
                'title' => 'abi-cms',
                'body' => 'abi-cmsのSTEP1-1'
            ]
        ];

        return response()->json($data);
    }
}
