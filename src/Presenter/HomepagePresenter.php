<?php

declare(strict_types=1);

namespace App\Presenter;

use App\Application\ApiHandler\ApiHandlerInterface;
use Nette\Application\Responses\JsonResponse;
use Nette\Application\UI\Presenter as NettePresenter;
use Nette\Http\IRequest;
use Throwable;
use Tracy\Debugger;

final class HomepagePresenter extends NettePresenter
{
    public function __construct(
        private readonly ApiHandlerInterface $apiHandler,
    ) {
        parent::__construct();
    }

    public function actionDefault(): void
    {
        $httpRequest = $this->getHttpRequest();

        if ($httpRequest->isMethod(IRequest::Post)) {
            $httpResponse = $this->getHttpResponse();

            try {
                $response = $this->apiHandler->handle(
                    request: $httpRequest,
                    response: $httpResponse,
                );
            } catch (Throwable $e) {
                Debugger::log($e, Debugger::ERROR);
                $httpResponse->setCode($httpResponse::S500_InternalServerError);

                $response = new JsonResponse([
                    'accepted' => false,
                    'error' => 'Internal server error.',
                ]);
            }

            $this->sendResponse($response);
        }
    }
}
