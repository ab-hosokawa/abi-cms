<?php

namespace Database\Seeders;

use App\Models\Step2_1\Model;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Step2_1Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_count = Model::count();
        $add = $data_count + 1;

        Model::create([
            'title' => 'test' . $add,
            'alias' => 'テスト' . $add,
        ]);
    }
}
