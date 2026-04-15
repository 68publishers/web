"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";

interface LocaleSwitcherProps {
  locale: Locale;
}

function stripLocale(pathname: string, locale: Locale): string {
  if (locale === "cs") return pathname;
  const prefix = `/${locale}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const other = locales.find((l) => l !== locale);
  if (!other) return null;

  const clean = stripLocale(pathname, locale);
  const href = other === "cs" ? clean : `/${other}${clean === "/" ? "" : clean}`;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-mono text-xs uppercase"
      onClick={() => router.push(href)}
    >
      {other}
    </Button>
  );
}
