<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        $modPath = app_path('Mod');
        foreach (glob("{$modPath}/*", GLOB_ONLYDIR) as $mod) {
            // routes
            $routesPath = $mod . '/routes/api_admin.php';
            if (file_exists($routesPath)) {
                $this->loadRoutesFrom($routesPath);
            }

            $routesPath = $mod . '/routes/api_front.php';
            if (file_exists($routesPath)) {
                $this->loadRoutesFrom($routesPath);
            }

            // config
            $configPath = $mod . '/config';
            if (is_dir($configPath)) {
                foreach (glob("{$configPath}/*.php") as $configFile) {
                    $configName = basename($configFile, '.php');
                    $this->mergeConfigFrom($configFile, $configName);
                }
            }

            // migration
            $migrationPath = $mod . '/database/migrations';
            if (is_dir($migrationPath)) {
                $this->loadMigrationsFrom($migrationPath);
            }

            // dynamic autoload
            // get mod name
            $module = null;
            $pattern = '/\/([^\/]+)$/';
            if (preg_match($pattern, $mod, $matches)) {
                $module = $matches[1];
            }

            if ($module) {
                // app/Mod/*/database/factories
                if (is_dir($mod . '/database/factories')) {
                    $factoryNamespace = "App\\Mod\\{$module}\\Database\\Factories";
                    Factory::guessFactoryNamesUsing(function (string $modelName) use ($module, $factoryNamespace) {
                        return $factoryNamespace . '\\' . class_basename($modelName) . 'Factory';
                    });
                }
            }


        }
    }

}
