<?php

declare(strict_types=1);

use App\Bootstrap;
use Nette\Application\Application as WebApplication;

require __DIR__ . '/../vendor/autoload.php';

Bootstrap::boot()
    ->createContainer()
    ->getByType(WebApplication::class)
    ->run();
