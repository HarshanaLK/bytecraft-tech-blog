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
import { newsCategories, type NewsCategory, type NewsItem } from "@/lib/news-types";

const newsDir = path.join(process.cwd(), "content", "news");
const categorySet: readonly string[] = newsCategories;

export type FullNewsItem = NewsItem & {
  html: string;
  headings: { id: string; text: string }[];
};

function readFile(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filename = path.join(newsDir, `${slug}.md`);
  if (!fs.existsSync(filename)) return null;
  return matter(fs.readFileSync(filename, "utf8"));
}

function parseStory(slug: string): { item: NewsItem; status: string; body: string } | null {
  const parsed = readFile(slug);
  if (!parsed) return null;
  const data = parsed.data as Record<string, unknown>;
  const required = ["title", "description", "author", "date", "category"] as const;
  if (required.some((field) => typeof data[field] !== "string" || !(data[field] as string).trim()) ||
      typeof data.category !== "string" || !categorySet.includes(data.category) || data.category === "All" ||
      typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      Number.isNaN(Date.parse(`${data.date}T00:00:00Z`))) {
    throw new Error(`Invalid original news metadata in content/news/${slug}.md. Check the README template.`);
  }
  const status = data.status;
  if (status !== "draft" && status !== "published") {
    throw new Error(`content/news/${slug}.md: status must be draft or published`);
  }
  return {
    status,
    body: parsed.content,
    item: {
      slug,
      title: data.title as string,
      description: data.description as string,
      author: data.author as string,
      category: data.category as NewsCategory,
      date: data.date as string,
      tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
      featured: data.featured === true,
      readingMinutes: Math.max(1, Math.ceil(parsed.content.trim().split(/\s+/).length / 210)),
    },
  };
}

function isPublic(story: NonNullable<ReturnType<typeof parseStory>>) {
  // Drafts and future-dated stories never appear in the static public site.
  return story.status === "published" && story.item.date <= new Date().toISOString().slice(0, 10);
}

export function getAllNews(): NewsItem[] {
  if (!fs.existsSync(newsDir)) return [];
  return fs.readdirSync(newsDir)
    .filter((file) => /^[a-z0-9-]+\.md$/.test(file))
    .map((file) => parseStory(file.slice(0, -3)))
    .filter((story): story is NonNullable<typeof story> => Boolean(story) && isPublic(story!))
    .map((story) => story.item)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getNewsBySlug(slug: string): Promise<FullNewsItem | null> {
  const story = parseStory(slug);
  if (!story || !isPublic(story)) return null;
  const html = String(await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(story.body));
  const headings = [...story.body.matchAll(/^## (.+)$/gm)].map((match) => {
    const text = match[1].replace(/[`*_~]/g, "").trim();
    return { text, id: text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") };
  });
  return { ...story.item, html, headings };
}
