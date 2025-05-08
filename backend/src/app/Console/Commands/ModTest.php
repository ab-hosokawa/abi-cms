<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;

class ModTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mod-test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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

        // testコマンド実行
        $testPath = "app/Mod/{$selectedModule}";
        $process = new Process(['php', 'artisan', 'test', $testPath, '--ansi']);
        $process->setTty(true); // カラー出力を有効にする

        $process->run(function ($type, $buffer) {
            echo $buffer;
        });
    }
}
