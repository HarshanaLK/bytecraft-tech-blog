import { getAllNews } from "@/lib/news";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
export const dynamic = "force-static";
function esc(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;"); }
export function GET() {
  const articles = getAllPosts().map(post => `<item><title>${esc(post.title)}</title><link>${siteConfig.url}/blog/${post.slug}</link><guid>${siteConfig.url}/blog/${post.slug}</guid><description>${esc(post.description)}</description><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate></item>`).join("");
  const news = getAllNews().map(story => `<item><title>${esc(story.title)}</title><link>${siteConfig.url}/news/${story.slug}</link><guid>${siteConfig.url}/news/${story.slug}</guid><description>${esc(story.description)}</description><pubDate>${new Date(`${story.date}T00:00:00Z`).toUTCString()}</pubDate></item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(siteConfig.name)}</title><link>${siteConfig.url}</link><description>${esc(siteConfig.description)}</description><language>en</language>${news}${articles}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
