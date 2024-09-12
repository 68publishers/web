<?php

declare(strict_types=1);

namespace App;

use Nette\Bootstrap\Configurator;
use SixtyEightPublishers\Environment\Bootstrap\EnvBootstrap;
use SixtyEightPublishers\Environment\Debug\DebugModeDetectorInterface;
use SixtyEightPublishers\Environment\Debug\EnvDetector;
use SixtyEightPublishers\Environment\Debug\SimpleCookieDetector;

final class Bootstrap
{
    public static function boot(): Configurator
    {
        $configurator = new Configurator();

        EnvBootstrap::bootNetteConfigurator($configurator, self::createDetectorsIterator());

        $configurator->enableTracy(__DIR__ . '/../var/log');
        $configurator->setTempDirectory(__DIR__ . '/../var');
        $configurator->addConfig(__DIR__ . '/../config/config.neon');

        return $configurator;
    }

    /**
     * @return iterable<DebugModeDetectorInterface>
     */
    private static function createDetectorsIterator(): iterable
    {
        if (isset($_ENV['APP_DEBUG_COOKIE_SECRET'])) {
            yield new SimpleCookieDetector($_ENV['APP_DEBUG_COOKIE_SECRET'], 'debug_please');
        }

        yield new EnvDetector();
    }
}
