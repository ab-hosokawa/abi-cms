<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeMod extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:mod';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    protected $modName;
    protected $modNameLower;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // mod name
        $modName = $this->ask('input mod name.');
        $this->modName = ucfirst(Str::camel($modName));
        $this->modNameLower = lcfirst(Str::snake($modName));

        // exists mod
        $modulePath = app_path('Mod');
        $modules = collect(File::directories($modulePath))
            ->map(fn($dir) => basename($dir))
            ->values()->toArray();

        // file creating
        $this->info('creating files ...');
        $this->createFiles();

        $this->info("{$modName} is created.");
    }

    protected function createFiles(string $path = DIRECTORY_SEPARATOR): void
    {
        $dirPath = resource_path("stubs/mod{$path}");
        if (File::isDirectory($dirPath)) {
            // ファイル一覧
            foreach (File::files($dirPath) as $file) {
                $this->createFromTemplate($path, $file->getFilenameWithoutExtension());
            }

            // ディレクトリ一覧
            foreach (File::directories($dirPath) as $directory) {
                $directory = str_replace(resource_path("stubs/mod{$path}"), "", $directory);
                $this->createFiles($path . $directory . DIRECTORY_SEPARATOR);
            }
        }
    }


    protected function createFromTemplate(string $path, string $fileName): void
    {
        // load stub file
        $template = file_get_contents(resource_path("stubs/mod{$path}{$fileName}.stub"));

        // replace
        $template = $this->replace($template);
        $fileName = $this->replace($fileName) . '.php';

        // put file
        $direPath = app_path("Mod/{$this->modName}{$path}");

        if (!File::isDirectory($direPath)) {
            File::makeDirectory($direPath, 0755, true);
        }

        $fileFullPath = $direPath . $fileName;
        if (!File::isFile($fileFullPath)) {
            File::put($direPath . $fileName, $template);
            $this->info('file ' . $direPath . $fileName . ' created');
        }
    }

    protected function replace(string $str): string
    {
        $str = str_replace('{{name}}', $this->modName, $str);
        $str = str_replace('{{name_lower}}', $this->modNameLower, $str);
        $str = str_replace('{{datetime}}', (new \DateTime())->format('Y_m_d_His'), $str);

        return $str;
    }
}
