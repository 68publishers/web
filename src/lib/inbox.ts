const SENSITIVE_HEADERS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "proxy-authorization",
]);

const REDACTED = "*****";

export interface InboxRequest {
  headers: string[];
  body: string;
  files: InboxFile[];
}

export interface InboxFile {
  name: string;
  buffer: Buffer;
  mimeType: string;
}

export function sanitizeHeaders(headers: Headers): string[] {
  const result: string[] = [];
  headers.forEach((value, name) => {
    const safe = SENSITIVE_HEADERS.has(name.toLowerCase()) ? REDACTED : value;
    result.push(`${name}: ${safe}`);
  });
  return result;
}

export async function parseInbox(request: Request): Promise<InboxRequest> {
  const headers = sanitizeHeaders(request.headers);
  const contentType = request.headers.get("content-type") ?? "";
  const files: InboxFile[] = [];
  let body = "";

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const form = await request.formData();
    const fields: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      if (value instanceof File) {
        files.push({
          name: value.name,
          buffer: Buffer.from(await value.arrayBuffer()),
          mimeType: value.type || "application/octet-stream",
        });
      } else {
        fields[key] = value;
      }
    }
    body = JSON.stringify(fields);
  } else {
    const raw = await request.text();
    try {
      body = JSON.stringify(JSON.parse(raw));
    } catch {
      body = raw;
    }
  }

  return { headers, body, files };
}
