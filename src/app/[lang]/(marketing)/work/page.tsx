import Link from "next/link";
import { workCases, getWorkSlug } from "@/lib/source";

export default async function WorkListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = lang === "cs" ? "" : `/${lang}`;

  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 24px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>Our Work</h1>
      <ul style={{ marginTop: 48, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {workCases.map((item) => (
          <li key={item.info.path}>
            <Link
              href={`${base}/work/${getWorkSlug(item)}`}
              style={{
                display: "block",
                padding: 24,
                borderRadius: 12,
                border: "1px solid rgba(var(--border), 0.6)",
                textDecoration: "none",
                color: "inherit",
                boxShadow: "var(--shadow-card)",
                transition: "box-shadow 200ms, border-color 200ms",
              }}
            >
              <p style={{ fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgb(var(--muted-foreground))" }}>
                {item.client} · {item.year}
              </p>
              <h2 style={{ marginTop: 12, fontSize: 20, fontWeight: 500 }}>{item.title}</h2>
              {item.summary ? (
                <p style={{ marginTop: 8, fontSize: 14, color: "rgb(var(--muted-foreground))" }}>
                  {item.summary}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
