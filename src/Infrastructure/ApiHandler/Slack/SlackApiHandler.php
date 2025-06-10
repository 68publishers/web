<?php

declare(strict_types=1);

namespace App\Infrastructure\ApiHandler\Slack;

use App\Application\ApiHandler\ApiHandlerInterface;
use App\Infrastructure\ApiHandler\Helpers;
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
use function json_encode;
use function str_split;

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

        $headers = Helpers::getHeaders(
            request: $request,
        );

        try {
            $body = Helpers::getBody(
                request: $request,
                escape: false,
            );
        } catch (Throwable $e) {
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
