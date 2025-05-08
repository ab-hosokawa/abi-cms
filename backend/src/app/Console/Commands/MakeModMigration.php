<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeModMigration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:mod-migration {name : The name of the migration}
        {--create= : The table to be created}
        {--table= : The table to migrate}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new migration file in a specific module';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // モジュールリストを取得
        $modulePath = app_path('Mod');
        $modules = collect(File::directories($modulePath))
            ->map(fn($dir) => basename($dir))
            ->values();

        if ($modules->isEmpty()) {
            $this->error('No modules found in the Modules directory.');
            return Command::FAILURE;
        }

        // モジュールを選択
        $selectedModule = $this->choice('Select the Mod', $modules->toArray());

        // ファイルパスを決定
        $migrationDir = $modulePath . "/$selectedModule/database/migrations";
        if (!File::isDirectory($migrationDir)) {
            File::makeDirectory($migrationDir, 0755, true);
        }
        $migrationPath = "app/Mod/{$selectedModule}/database/migrations";

        // マイグレーション名からファイル名を生成
        $migrationName = $this->argument('name');
        $table = $this->input->getOption('table');
        $create = $this->input->getOption('create') ?: false;

        // マイグレーションコマンドを実行
        Artisan::call('make:migration', [
            'name' => $migrationName,
            '--table' => $table,
            '--create' => $create,
            '--path' => $migrationPath
        ], $this->getOutput());
        $result = Artisan::output();
        $this->info($result);
    }
}
