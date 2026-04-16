import { loader } from "fumadocs-core/source";
import { i18n } from "./i18n";
import { docs, blog, work } from "../../.source/server";

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  i18n,
});

export type BlogPost = (typeof blog)[number];
export type WorkCase = (typeof work)[number];

export const blogPosts: BlogPost[] = blog;
export const workCases: WorkCase[] = work;

function slugFromPath(info: { path: string }): string {
  return info.path.replace(/\.mdx?$/, "");
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => slugFromPath(p.info) === slug);
}

export function getWorkCase(slug: string): WorkCase | undefined {
  return workCases.find((p) => slugFromPath(p.info) === slug);
}

export function getBlogSlug(post: BlogPost): string {
  return slugFromPath(post.info);
}

export function getWorkSlug(item: WorkCase): string {
  return slugFromPath(item.info);
}
