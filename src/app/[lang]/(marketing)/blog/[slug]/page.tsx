import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getBlogSlug } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { i18n } from "@/lib/i18n";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const MDX = post.body;

  return (
    <article style={{ maxWidth: 720, margin: "0 auto", padding: "96px 24px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>{post.title}</h1>
      {post.description ? (
        <p style={{ marginTop: 16, fontSize: 18, color: "rgb(var(--muted-foreground))" }}>
          {post.description}
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
    blogPosts.map((post) => ({ lang, slug: getBlogSlug(post) })),
  );
}
