<?php

declare(strict_types=1);

namespace App;

use Nette\Application\Routers\RouteList;

final class RouterFactory
{
    public function create(): RouteList
    {
        $router = new RouteList();

        $router->withModule('Api')
            ->addRoute('/api/<presenter>', [
                'action' => 'default',
            ]);

        $router->addRoute('<presenter>[/<slug>]', [
            'presenter' => 'Homepage',
            'action' => 'default',
        ]);

        return $router;
    }
}
