<?php

namespace app\Http\Controllers\Api\Step1_3;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function index(Request $request)
    {
        $posts = Article::all();

        return response()->json([
            'success' => true,
            'timestamp' => now()->timestamp,
            'contents' => $posts
        ],200);
    }
}
