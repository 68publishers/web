# '68 Publishers Website

Positioning website for '68 Publishers — a long-term technology partner for demanding B2B projects.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **fumadocs** (UI, core, MDX) for docs + MDX content layer
- **Tailwind v4** with fumadocs design system (shadcn + preset CSS)
- **next-themes** for dark-first theming via fumadocs RootProvider
- **pino** + **@slack/web-api** for `/api/inbox`
- **TypeScript**, **pnpm**

## Getting started

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Site at <http://localhost:3000>. Czech at `/`, English at `/en`.

## Route architecture

```
[lang]/(marketing)/         Marketing layout (MarketingNav + footer)
  page.tsx                  Homepage
  work/, blog/, services/   Content pages
  about/, contact/, why-68/ Static pages

[lang]/docs/                Docs layout (TopNav + DocsLayout sidebar)
  [[...slug]]/page.tsx      fumadocs pages

api/inbox/                  POST endpoint (Slack + logging)
```

`(marketing)` is a route group — no URL segment. `[lang]` is hidden for default locale (cs) via fumadocs i18n middleware (`hideLocale: 'default-locale'`).

## Content

- `content/docs/` — open-source package docs (fumadocs)
- `content/blog/` — articles (MDX collection)
- `content/work/` — case studies (MDX collection)
