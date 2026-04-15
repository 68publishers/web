import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/i18n/config";
import { workCases, getWorkCase, getWorkSlug } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const item = getWorkCase(slug);
  if (!item) notFound();

  const MDX = item.body;

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {item.client} · {item.year}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        {item.title}
      </h1>
      {item.description ? (
        <p className="mt-4 text-lg text-muted-foreground">{item.description}</p>
      ) : null}
      <div className="prose prose-invert mt-10 max-w-none">
        <MDX components={getMDXComponents()} />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    workCases.map((item) => ({ locale, slug: getWorkSlug(item) })),
  );
}
