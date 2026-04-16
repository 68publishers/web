"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { FullSearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { LanguageSelect } from "fumadocs-ui/layouts/shared/slots/language-select";
import type { Locale } from "@/lib/i18n";

interface TopNavProps {
  locale: Locale;
}

export function TopNav({ locale }: TopNavProps) {
  const pathname = usePathname();
  const base = locale === "cs" ? "" : `/${locale}`;

  const links = [
    { label: "Docs", href: `${base}/docs` },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        height: 60,
        padding: "0 20px",
        gap: 4,
        background: "rgb(var(--background) / 0.65)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        boxShadow: "var(--shadow-nav)",
        borderBottom: "1px solid rgba(var(--border), 0.6)",
      }}
    >
      <Link
        href={base || "/"}
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "rgb(var(--foreground))",
          marginRight: 12,
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
                padding: "6px 10px",
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

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <LanguageSelect />
        <FullSearchTrigger className="w-48 rounded-lg text-[13px]" />
        <ThemeSwitch className="p-0" />
      </div>
    </header>
  );
}
