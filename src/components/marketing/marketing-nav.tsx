"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { LanguageSelect } from "fumadocs-ui/layouts/shared/slots/language-select";
import { BookOpen } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";

interface MarketingNavProps {
  locale: Locale;
  dict: Dict;
}

export function MarketingNav({ locale, dict }: MarketingNavProps) {
  const pathname = usePathname();
  const base = locale === "cs" ? "" : `/${locale}`;

  const links = [
    { label: dict.nav.work, href: `${base}/work` },
    { label: dict.nav.services, href: `${base}/services` },
    { label: dict.nav.why, href: `${base}/why-68` },
    { label: dict.nav.blog, href: `${base}/blog` },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 60,
        background: "rgb(var(--background) / 0.65)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        boxShadow: "var(--shadow-nav)",
        borderBottom: "1px solid rgba(var(--border), 0.6)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          height: "100%",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Link
          href={base || "/"}
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "rgb(var(--foreground))",
            marginRight: 16,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          {"'68 Publishers"}
        </Link>

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-label={link.label}
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "rgb(var(--foreground))" : "rgb(var(--muted-foreground))",
                  padding: "6px 12px",
                  borderRadius: 6,
                  textDecoration: "none",
                  transition: "color 150ms, background-color 150ms",
                  backgroundColor: isActive ? "rgba(var(--accent), 0.8)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <LanguageSelect />
          <Link
            href={`${base}/docs`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 8,
              color: "rgb(var(--primary-foreground))",
              background: "rgb(var(--primary))",
              textDecoration: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <BookOpen size={14} />
            {dict.nav.docs}
          </Link>
          <ThemeSwitch className="p-0" />
        </div>
      </div>
    </header>
  );
}
