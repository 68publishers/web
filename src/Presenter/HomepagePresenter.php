<?php

declare(strict_types=1);

namespace App\Presenter;

use Nette\Application\UI\Presenter as NettePresenter;

class HomepagePresenter extends NettePresenter
{
    protected function beforeRender(): void
    {
        parent::beforeRender();

        $this->getTemplate()->hoj = 'vole';
    }
}
