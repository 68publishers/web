import { defineDocs, defineCollections, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
});

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const work = defineCollections({
  type: "doc",
  dir: "content/work",
  schema: frontmatterSchema.extend({
    client: z.string(),
    year: z.number(),
    industry: z.string().optional(),
    services: z.array(z.string()).optional(),
    summary: z.string().optional(),
  }),
});

export default defineConfig();
