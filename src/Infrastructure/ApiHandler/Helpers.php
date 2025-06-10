<?php

declare(strict_types=1);

namespace App\Infrastructure\ApiHandler;

use JsonException;
use Nette\Http\IRequest;
use function in_array;
use function strtolower;

final class Helpers
{
    private function __construct() {}

    /**
     * @return list<string>
     */
    public static function getHeaders(IRequest $request): array
    {
        $headers = [];
        $sensitiveHeaders = ['authorization', 'cookie'];

        foreach ($request->getHeaders() as $name => $value) {
            if (in_array(strtolower($name), $sensitiveHeaders, true)) {
                $value = '*****';
            }

            $headers[] = "$name: $value";
        }

        return $headers;
    }

    /**
     * @throws JsonException
     */
    public static function getBody(IRequest $request, bool $escape): string
    {
        $jsonFlags = $escape
            ? JSON_THROW_ON_ERROR
            : JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_LINE_TERMINATORS;

        if (str_contains($request->getHeader('Content-Type') ?? '', 'multipart/form-data') || str_contains($request->getHeader('Content-Type') ?? '', 'application/x-www-form-urlencoded')) {
            $body = json_encode(
                value: $request->getPost(),
                flags: $jsonFlags,
            );

            if (!$escape) {
                $body = str_replace('\\"', '"', $body);
            }

            return $body;
        }

        $body = (string) $request->getRawBody();

        try {
            $body = json_encode(
                value: json_decode(
                    json: $body,
                    associative: false,
                    flags: JSON_THROW_ON_ERROR,
                ),
                flags: $jsonFlags,
            );

            if (!$escape) {
                $body = str_replace('\\"', '"', $body);
            }
        } catch (JsonException $e) {
            # data may not be a json...
        }

        return $body;
    }
}
