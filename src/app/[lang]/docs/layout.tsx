import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docsSource } from "@/lib/source";
import { TopNav } from "@/components/marketing/top-nav";
import type { Locale } from "@/lib/i18n";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <>
      <TopNav locale={locale} />
      <DocsLayout
        tree={docsSource.getPageTree(lang)}
        tabs={false}
        nav={{ enabled: false }}
        sidebar={{ collapsible: true, defaultOpenLevel: 1 }}
        themeSwitch={{ enabled: false }}
        searchToggle={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
