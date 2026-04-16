import Link from "next/link";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDict(locale);
  const base = locale === "cs" ? "" : `/${locale}`;

  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 24px 80px" }}>
      <span
        style={{
          display: "inline-block",
          marginBottom: 24,
          padding: "4px 12px",
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          border: "1px solid rgba(var(--border), 0.6)",
          borderRadius: 6,
          color: "rgb(var(--muted-foreground))",
        }}
      >
        {dict.hero.eyebrow}
      </span>
      <h1
        style={{
          maxWidth: 900,
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          textWrap: "balance",
        }}
      >
        {dict.hero.headline}
      </h1>
      <p
        style={{
          marginTop: 24,
          maxWidth: 600,
          fontSize: 18,
          lineHeight: 1.65,
          color: "rgb(var(--muted-foreground))",
        }}
      >
        {dict.hero.claim}
      </p>
      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          href={`${base}/contact`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 8,
            color: "rgb(var(--primary-foreground))",
            background: "rgb(var(--primary))",
            textDecoration: "none",
            boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)",
          }}
        >
          {dict.nav.cta}
        </Link>
        <Link
          href={`${base}/work`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 8,
            color: "rgb(var(--muted-foreground))",
            textDecoration: "none",
          }}
        >
          {dict.nav.work} →
        </Link>
      </div>
    </section>
  );
}
