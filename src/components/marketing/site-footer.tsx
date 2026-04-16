import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";

interface SiteFooterProps {
  locale: Locale;
  dict: Dict;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const base = locale === "cs" ? "" : `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer style={{ marginTop: 96, borderTop: "1px solid rgba(var(--border), 0.6)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em" }}>
              {"'68 Publishers"}
            </p>
            <p style={{ marginTop: 8, maxWidth: 420, fontSize: 14, color: "rgb(var(--muted-foreground))" }}>
              {dict.footer.tagline}
            </p>
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px", fontSize: 14, color: "rgb(var(--muted-foreground))" }}>
            <Link href={`${base}/work`} style={{ textDecoration: "none", color: "inherit" }}>{dict.nav.work}</Link>
            <Link href={`${base}/services`} style={{ textDecoration: "none", color: "inherit" }}>{dict.nav.services}</Link>
            <Link href={`${base}/blog`} style={{ textDecoration: "none", color: "inherit" }}>{dict.nav.blog}</Link>
            <Link href={`${base}/docs`} style={{ textDecoration: "none", color: "inherit" }}>{dict.nav.docs}</Link>
          </nav>
        </div>
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(var(--border), 0.6)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgb(var(--muted-foreground))" }}>
          <span>© {year} '68 Publishers s.r.o. — {dict.footer.rights}</span>
          <span style={{ fontFamily: "monospace" }}>CZ08418667</span>
        </div>
      </div>
    </footer>
  );
}
