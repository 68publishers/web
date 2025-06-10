<?php

declare(strict_types=1);

namespace App\Infrastructure\ApiHandler\Loggable;

use App\Application\ApiHandler\ApiHandlerInterface;
use App\Infrastructure\ApiHandler\Helpers;
use Nette\Application\Response;
use Nette\Http\IRequest;
use Nette\Http\IResponse;
use Throwable;
use Tracy\Debugger;

final class LoggableApiHandler implements ApiHandlerInterface
{
    public function __construct(
        private readonly ApiHandlerInterface $inner,
    ) {}

    public function handle(IRequest $request, IResponse $response): Response
    {
        try {
            $headers = Helpers::getHeaders(
                request: $request,
            );
            $body = Helpers::getBody(
                request: $request,
                escape: true,
            );

            Debugger::log(@json_encode($headers) ?: '[]', 'api_handler');
            Debugger::log($body, 'api_handler');
        } catch (Throwable $e) {
            Debugger::log($e, Debugger::ERROR);
        }

        return $this->inner->handle(
            request: $request,
            response: $response,
        );
    }
}
