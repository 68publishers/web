<?php

declare(strict_types=1);

namespace App\Presenter;

use App\Application\ApiHandler\ApiHandlerInterface;
use Nette\Application\UI\Presenter as NettePresenter;
use Nette\Http\IRequest;

final class HomepagePresenter extends NettePresenter
{
    public function __construct(
        private readonly ApiHandlerInterface $apiHandler,
    ) {
        parent::__construct();
    }

    public function actionDefault(): void
    {
        if ($this->getHttpRequest()->isMethod(IRequest::Post)) {
            $response = $this->apiHandler->handle(
                request: $this->getHttpRequest(),
                response: $this->getHttpResponse(),
            );

            $this->sendResponse($response);
        }
    }
}
