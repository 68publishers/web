import { WebClient, type KnownBlock } from "@slack/web-api";
import type { InboxRequest } from "./inbox";
import { logger } from "./logger";

const BODY_CHUNK_SIZE = 2900;

function chunk(value: string, size: number): string[] {
  if (value.length <= size) return [value];
  const result: string[] = [];
  for (let i = 0; i < value.length; i += size) {
    result.push(value.slice(i, i + size));
  }
  return result;
}

function buildBlocks(inbox: InboxRequest): KnownBlock[] {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  const blocks: KnownBlock[] = [
    { type: "section", text: { type: "mrkdwn", text: `New message received (${now})` } },
    { type: "section", text: { type: "mrkdwn", text: "*Headers*" } },
    { type: "section", text: { type: "mrkdwn", text: "```" + inbox.headers.join("\n") + "```" } },
    { type: "section", text: { type: "mrkdwn", text: "*Body*" } },
  ];

  for (const piece of chunk(inbox.body, BODY_CHUNK_SIZE)) {
    blocks.push({ type: "section", text: { type: "mrkdwn", text: "```" + piece + "```" } });
  }

  return blocks;
}

export async function postInboxToSlack(inbox: InboxRequest): Promise<void> {
  const token = process.env.SLACK_TOKEN;
  const channel = process.env.SLACK_CHANNEL;

  if (!token || !channel) {
    throw new SlackUnavailableError("SLACK_TOKEN or SLACK_CHANNEL is not configured");
  }

  const client = new WebClient(token);

  await client.chat.postMessage({
    channel,
    blocks: buildBlocks(inbox),
    text: "New message received",
    icon_emoji: ":envelope_with_arrow:",
  });

  if (inbox.files.length > 0) {
    try {
      await client.files.uploadV2({
        channel_id: channel,
        file_uploads: inbox.files.map((f) => ({ filename: f.name, file: f.buffer })),
      });
    } catch (err) {
      logger.error({ err }, "slack file upload failed");
    }
  }
}

export class SlackUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SlackUnavailableError";
  }
}
