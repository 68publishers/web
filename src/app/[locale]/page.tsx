import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const base = locale === "cs" ? "" : `/${locale}`;

  return (
    <section className="mx-auto flex max-w-6xl flex-col justify-center px-6 pt-24 pb-20 md:pt-32">
      <Badge
        variant="outline"
        className="mb-6 w-fit font-mono text-xs uppercase tracking-wider"
      >
        {dict.home.hero.eyebrow}
      </Badge>
      <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
        {dict.home.hero.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {dict.home.hero.claim}
      </p>
      <div className="mt-10 flex items-center gap-3">
        <Link href={`${base}/contact`} className={cn(buttonVariants({ size: "lg" }))}>
          {dict.home.hero.cta}
        </Link>
        <Link
          href={`${base}/work`}
          className={cn(buttonVariants({ size: "lg", variant: "ghost" }))}
        >
          {dict.nav.work} →
        </Link>
      </div>
    </section>
  );
}
