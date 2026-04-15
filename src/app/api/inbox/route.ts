import { logger } from "@/lib/logger";
import { parseInbox } from "@/lib/inbox";
import { postInboxToSlack, SlackUnavailableError } from "@/lib/slack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(status: "success" | "error", data: unknown, code: number) {
  return Response.json({ status, data }, { status: code });
}

export async function POST(request: Request) {
  let inbox;
  try {
    inbox = await parseInbox(request);
  } catch (err) {
    logger.error({ err }, "inbox parse failed");
    return json("error", { code: 400, error: "Invalid POST data." }, 400);
  }

  logger.info({ headers: inbox.headers, body: inbox.body }, "inbox request");

  try {
    await postInboxToSlack(inbox);
  } catch (err) {
    if (err instanceof SlackUnavailableError) {
      logger.warn({ err: err.message }, "slack unavailable");
      return json("error", { code: 503, error: "Service is not available." }, 503);
    }
    logger.error({ err }, "slack post failed");
    return json("error", { code: 500, error: "Unable to process the message." }, 500);
  }

  return json("success", {}, 200);
}
