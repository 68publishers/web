import { notFound } from "next/navigation";
import { workCases, getWorkCase, getWorkSlug } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { i18n } from "@/lib/i18n";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkCase(slug);
  if (!item) notFound();

  const MDX = item.body;

  return (
    <article style={{ maxWidth: 720, margin: "0 auto", padding: "96px 24px" }}>
      <p style={{ fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgb(var(--muted-foreground))" }}>
        {item.client} · {item.year}
      </p>
      <h1 style={{ marginTop: 16, fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>{item.title}</h1>
      {item.description ? (
        <p style={{ marginTop: 16, fontSize: 18, color: "rgb(var(--muted-foreground))" }}>
          {item.description}
        </p>
      ) : null}
      <div className="prose" style={{ marginTop: 40 }}>
        <MDX components={getMDXComponents()} />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return i18n.languages.flatMap((lang) =>
    workCases.map((item) => ({ lang, slug: getWorkSlug(item) })),
  );
}
