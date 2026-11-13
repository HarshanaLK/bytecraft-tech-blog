import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { categories, type CategorySlug } from "@/lib/site";

const postsDir = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  date: string;
  author: string;
  featured: boolean;
  tags: string[];
  readingMinutes: number;
};

export type FullPost = Post & {
  html: string;
  headings: { id: string; text: string }[];
};

function validateMeta(slug: string, data: Record<string, unknown>, body: string): Post {
  const title = data.title;
  const description = data.description;
  const category = data.category;
  const date = data.date;
  const author = data.author;
  if (typeof title !== "string" || typeof description !== "string" ||
      typeof category !== "string" || typeof date !== "string" ||
      typeof author !== "string" ||
      !categories.some((item) => item.slug === category)) {
    throw new Error(`Invalid front matter in ${slug}.md`);
  }
  return {
    slug,
    title,
    description,
    category: category as CategorySlug,
    date,
    author,
    featured: data.featured === true,
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
    readingMinutes: Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 210)),
  };
}

function readMarkdown(slug: string) {
  // Never use an untrusted slug to build a path.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return matter(fs.readFileSync(fullPath, "utf8"));
}

export function getAllPosts(): Post[] {
  return fs.readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const data = readMarkdown(slug);
      if (!data) throw new Error(`Cannot read ${file}`);
      return validateMeta(slug, data.data, data.content);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<FullPost | null> {
  const data = readMarkdown(slug);
  if (!data) return null;
  const metadata = validateMeta(slug, data.data, data.content);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(data.content);
  const headings = [...data.content.matchAll(/^## (.+)$/gm)].map((match) => {
    const text = match[1].replace(/[`*_~]/g, "").trim();
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    return { id, text };
  });
  return { ...metadata, html: String(processed), headings };
}

