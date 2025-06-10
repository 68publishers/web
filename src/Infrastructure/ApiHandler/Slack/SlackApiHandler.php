<?php

declare(strict_types=1);

namespace App\Infrastructure\ApiHandler\Slack;

use App\Application\ApiHandler\ApiHandlerInterface;
use DateTimeImmutable;
use JoliCode\Slack\Client;
use JoliCode\Slack\ClientFactory;
use JoliCode\Slack\Exception\SlackErrorResponse;
use JsonException;
use Nette\Application\Response;
use Nette\Application\Responses\JsonResponse;
use Nette\Http\FileUpload;
use Nette\Http\IRequest;
use Nette\Http\IResponse;
use Throwable;
use Tracy\Debugger;
use function array_map;
use function array_values;
use function implode;
use function in_array;
use function json_decode;
use function json_encode;
use function str_contains;
use function str_split;
use function strtolower;

final class SlackApiHandler implements ApiHandlerInterface
{
    private ?Client $client = null;

    public function __construct(
        private readonly string $token,
        private readonly string $channel,
    ) {}

    public function handle(IRequest $request, IResponse $response): Response
    {
        if ('' === $this->token || '' === $this->channel) {
            $response->setCode($response::S503_ServiceUnavailable);

            return new JsonResponse(
                payload: [
                    'status' => 'error',
                    'data' => [
                        'code' => $response::S503_ServiceUnavailable,
                        'error' => 'Service is not available.',
                    ],
                ],
            );
        }

        $headers = [];
        $sensitiveHeaders = ['authorization', 'cookie'];

        foreach ($request->getHeaders() as $name => $value) {
            if (in_array(strtolower($name), $sensitiveHeaders, true)) {
                $value = '*****';
            }

            $headers[] = "$name: $value";
        }

        if (str_contains($request->getHeader('Content-Type') ?? '', 'multipart/form-data') || str_contains($request->getHeader('Content-Type') ?? '', 'application/x-www-form-urlencoded')) {
            try {
                $body = json_encode(
                    value: $request->getPost(),
                    flags: JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_LINE_TERMINATORS,
                );
                $body = str_replace('\\"', '"', $body);
            } catch (JsonException $e) {
                Debugger::log($e, Debugger::ERROR);
                $response->setCode($response::S400_BadRequest);

                return new JsonResponse(
                    payload: [
                        'status' => 'error',
                        'data' => [
                            'code' => $response::S400_BadRequest,
                            'error' => 'Invalid POST data.',
                        ],
                    ],
                );
            }
        } else {
            $body = (string) $request->getRawBody();

            try {
                $body = json_encode(
                    value: json_decode(
                        json: $body,
                        associative: false,
                        flags: JSON_THROW_ON_ERROR,
                    ),
                    flags: JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_LINE_TERMINATORS,
                );
                $body = str_replace('\\"', '"', $body);
            } catch (JsonException $e) {
                # data may not be a json...
            }
        }

        $client = $this->getClient();

        try {
            $blocks = [
                (object) [
                    'type' => 'section',
                    'text' => [
                        'type' => 'mrkdwn',
                        'text' => 'New message received (' . (new DateTimeImmutable('now'))->format('Y-m-d H:i:s') . ')',
                    ],
                ],
                (object) [
                    'type' => 'section',
                    'text' => [
                        'type' => 'mrkdwn',
                        'text' => '*Headers*',
                    ],
                ],
                (object) [
                    'type' => 'section',
                    'text' => [
                        'type' => 'mrkdwn',
                        'text' => '```' . implode("\n", $headers) . '```',
                    ],
                ],
                (object) [
                    'type' => 'section',
                    'text' => [
                        'type' => 'mrkdwn',
                        'text' => '*Body*',
                    ],
                ],
            ];

            foreach (str_split($body, 2900) as $chunk) {
                $blocks[] = [
                    'type' => 'section',
                    'text' => [
                        'type' => 'mrkdwn',
                        'text' => '```' . $chunk . '```',
                    ],
                ];
            }

            $client->chatPostMessage([
                'channel' => $this->channel,
                'blocks' => json_encode(value: $blocks, flags: JSON_THROW_ON_ERROR),
                'icon_emoji' => ':envelope_with_arrow:',
            ]);
        } catch (SlackErrorResponse|JsonException $e) {
            Debugger::log($e, Debugger::ERROR);
            $response->setCode($response::S500_InternalServerError);

            return new JsonResponse(
                payload: [
                    'status' => 'error',
                    'data' => [
                        'code' => $response::S500_InternalServerError,
                        'error' => 'Unable to process the message.',
                    ],
                ],
            );
        }

        if ([] !== ($files = $request->getFiles())) {
            $files = array_values(array_map(
                callback: static fn (FileUpload $file) => [
                    'path' => $file->getTemporaryFile(),
                    'title' => $file->getUntrustedName(),
                ],
                array: $files,
            ));

            try {
                $client->filesUploadV2(
                    files: $files,
                    channelId: $this->channel,
                );
            } catch (Throwable $e) {
                Debugger::log($e, Debugger::ERROR);
            }
        }

        $response->setCode($response::S200_OK);

        return new JsonResponse(
            payload: [
                'status' => 'success',
                'data' => (object) [],
            ],
        );
    }

    private function getClient(): Client
    {
        return $this->client ?? $this->client = ClientFactory::create(
            token: $this->token,
        );
    }
}
