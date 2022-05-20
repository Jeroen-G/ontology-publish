<?php

declare(strict_types=1);

namespace JeroenG\OntologyPublish;

final class NextPathSource
{
    public static function getPath(): string
    {
        return __DIR__.'/../nextjs';
    }
}
