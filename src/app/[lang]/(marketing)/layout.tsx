import type { ReactNode } from "react";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { SiteFooter } from "@/components/marketing/site-footer";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDict(locale);

  return (
    <>
      <MarketingNav locale={locale} dict={dict} />
      <main style={{ display: "flex", flexDirection: "column", paddingTop: 60, color: "rgb(var(--foreground))" }}>
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
