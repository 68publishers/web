import Link from "next/link";
import { blogPosts, getBlogSlug } from "@/lib/source";
import type { Locale } from "@/lib/i18n";

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = lang === "cs" ? "" : `/${lang}`;

  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "96px 24px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>Blog</h1>
      <ul style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 0 }}>
        {blogPosts.map((post) => (
          <li key={post.info.path} style={{ padding: "24px 0", borderBottom: "1px solid rgba(var(--border), 0.6)" }}>
            <Link href={`${base}/blog/${getBlogSlug(post)}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h2 style={{ fontSize: 20, fontWeight: 500 }}>{post.title}</h2>
              {post.description ? (
                <p style={{ marginTop: 4, fontSize: 14, color: "rgb(var(--muted-foreground))" }}>
                  {post.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
