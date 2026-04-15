import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const base = locale === "cs" ? "" : `/${locale}`;
  const nav = [
    { href: `${base}/work`, label: dict.nav.work },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/why-68`, label: dict.nav.why },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: "/docs", label: dict.nav.docs },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={base || "/"} className="font-mono text-sm tracking-tight">
          {"'68 Publishers"}
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
          <Link
            href={`${base}/contact`}
            className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
          >
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
