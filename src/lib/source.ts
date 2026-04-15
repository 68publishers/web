import { loader } from "fumadocs-core/source";
import * as content from "../../.source/server";

export const docsSource = loader({
  baseUrl: "/docs",
  source: content.docs.toFumadocsSource(),
});

export type BlogPost = (typeof content.blog)[number];
export type WorkCase = (typeof content.work)[number];

export const blogPosts: BlogPost[] = content.blog;
export const workCases: WorkCase[] = content.work;

function slugFromPath(info: { path: string }): string {
  return info.path.replace(/\.mdx?$/, "");
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => slugFromPath(post.info) === slug);
}

export function getWorkCase(slug: string): WorkCase | undefined {
  return workCases.find((item) => slugFromPath(item.info) === slug);
}

export function getBlogSlug(post: BlogPost): string {
  return slugFromPath(post.info);
}

export function getWorkSlug(item: WorkCase): string {
  return slugFromPath(item.info);
}
