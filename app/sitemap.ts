import type { MetadataRoute } from "next";
import { getAllNews } from "@/lib/news";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const standard = ["", "/blog", "/news", "/about", "/contact", "/privacy", "/terms", "/disclaimer"].map(path => ({ url: `${siteConfig.url}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.3 }));
  const posts = getAllPosts().map(post => ({ url: `${siteConfig.url}/blog/${post.slug}`, lastModified: new Date(`${post.date}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.7 }));
  const news = getAllNews().map(story => ({ url: `${siteConfig.url}/news/${story.slug}`, lastModified: new Date(`${story.date}T00:00:00Z`), changeFrequency: "weekly" as const, priority: 0.8 }));
  return [...standard, ...posts, ...news];
}
