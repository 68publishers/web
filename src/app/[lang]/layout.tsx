import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Provider } from "@/components/provider";
import { i18n, i18nUI } from "@/lib/i18n";

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!i18n.languages.includes(lang as "cs" | "en")) notFound();

  return <Provider i18n={i18nUI.provider(lang)}>{children}</Provider>;
}
