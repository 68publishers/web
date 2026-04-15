import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { blogPosts, getBlogSlug } from "@/lib/source";

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const base = locale === "cs" ? "" : `/${locale}`;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
      <ul className="mt-12 divide-y divide-border/60">
        {blogPosts.map((post) => (
          <li key={post.info.path} className="py-6">
            <Link
              href={`${base}/blog/${getBlogSlug(post)}`}
              className="group block"
            >
              <h2 className="text-xl font-medium transition-colors group-hover:text-foreground">
                {post.title}
              </h2>
              {post.description ? (
                <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
