<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Step1_2Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_count = Article::count();
        $add = $data_count + 1;

        Article::create([
            'title' => 'abi-cms ' . $add,
            'body' => 'abi-cmsのSTEP1-2_' . $add,
        ]);
    }
}
