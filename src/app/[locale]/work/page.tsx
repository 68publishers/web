import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { workCases, getWorkSlug } from "@/lib/source";

export default async function WorkListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const base = locale === "cs" ? "" : `/${locale}`;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Our Work</h1>
      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {workCases.map((item) => (
          <li key={item.info.path}>
            <Link
              href={`${base}/work/${getWorkSlug(item)}`}
              className="group block rounded-lg border border-border/60 p-6 transition-colors hover:border-border"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.client} · {item.year}
              </p>
              <h2 className="mt-3 text-xl font-medium">{item.title}</h2>
              {item.summary ? (
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
