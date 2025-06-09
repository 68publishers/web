<?php

declare(strict_types=1);

namespace App\Application\ApiHandler;

use Nette\Application\Response;
use Nette\Http\IRequest;
use Nette\Http\IResponse;

interface ApiHandlerInterface
{
    public function handle(IRequest $request, IResponse $response): Response;
}
