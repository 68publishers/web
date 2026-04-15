import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/i18n/config";
import { blogPosts, getBlogPost, getBlogSlug } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = getBlogPost(slug);
  if (!post) notFound();

  const MDX = post.body;

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
      {post.description ? (
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
      ) : null}
      <div className="prose prose-invert mt-10 max-w-none">
        <MDX components={getMDXComponents()} />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: getBlogSlug(post) })),
  );
}
