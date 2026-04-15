import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const base = locale === "cs" ? "" : `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-sm tracking-tight">{"'68 Publishers"}</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link href={`${base}/work`} className="hover:text-foreground">
              {dict.nav.work}
            </Link>
            <Link href={`${base}/services`} className="hover:text-foreground">
              {dict.nav.services}
            </Link>
            <Link href={`${base}/blog`} className="hover:text-foreground">
              {dict.nav.blog}
            </Link>
            <Link href="/docs" className="hover:text-foreground">
              {dict.nav.docs}
            </Link>
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>
            © {year} ’68 Publishers s.r.o. — {dict.footer.rights}
          </span>
          <span className="font-mono">CZ08418667</span>
        </div>
      </div>
    </footer>
  );
}
