# '68 Publishers Website

Positioning website for '68 Publishers — a long-term technology partner for demanding B2B projects.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **fumadocs** for MDX content (`/docs`, `/blog`, `/work`)
- **Tailwind v4** + **shadcn/ui** (Base UI) for styling
- **next-themes** for dark-first theming
- **pino** + **@slack/web-api** for the `/api/inbox` endpoint (ported from the old PHP site)
- **TypeScript**, **pnpm**

## Requirements

- Node.js 20+
- pnpm 9+

## Getting started

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

The site will be available at <http://localhost:3000>. Czech is served from `/`, English from `/en`.

## Scripts

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `pnpm dev`       | Dev server (Turbopack)                 |
| `pnpm build`     | Production build                       |
| `pnpm start`     | Serve the production build             |
| `pnpm lint`      | Lint                                   |
| `pnpm typecheck` | TypeScript type check (`tsc --noEmit`) |

## Routes

- `/` — Czech marketing (hidden locale prefix, internal `/cs/...`)
- `/en/*` — English marketing
- `/docs/*` — Open-source documentation (fumadocs)
- `/api/inbox` — POST endpoint that logs the request and forwards it to Slack

## `/api/inbox`

A port of the original PHP `LoggableApiHandler` + `SlackApiHandler`. Sensitive headers are redacted, the body is chunked to 2900 characters (Slack mrkdwn limit), and file uploads are sent as a separate `files.uploadV2` call. Configure via `SLACK_TOKEN` and `SLACK_CHANNEL`.

Test:

```bash
curl -X POST http://localhost:3000/api/inbox \
  -H "Content-Type: application/json" \
  -d '{"hello": "world"}'
```

Without Slack env vars the endpoint returns `503`.

## Content

MDX content lives under `content/`:

- `content/docs/` — open-source package docs
- `content/blog/` — articles
- `content/work/` — case studies

Run `pnpm exec fumadocs-mdx` after editing schemas in `source.config.ts`.

## Branching

This rewrite lives on the `new` branch. The previous PHP/Nette site is preserved on `origin/main` as a backup and reference (licensing POST logger + Slack integration).
