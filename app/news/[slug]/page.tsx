import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock3, Newspaper } from "lucide-react";
import { NewsExplorer } from "@/components/news-explorer";
import { ReadingProgress, ShareActions } from "@/components/reading-tools";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import { prettyDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNews().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getNewsBySlug(slug);
  if (!story) return { title: "Story not found" };
  const pathname = `/news/${story.slug}`;
  return {
    title: story.title,
    description: story.description,
    alternates: { canonical: pathname },
    openGraph: { type: "article", title: story.title, description: story.description, url: pathname, publishedTime: `${story.date}T00:00:00Z`, authors: [story.author], images: ["/og-image.png"] },
    twitter: { card: "summary_large_image", title: story.title, description: story.description },
  };
}

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getNewsBySlug(slug);
  if (!story) notFound();
  const related = getAllNews().filter((item) => item.slug !== story.slug && item.category === story.category).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.description,
    datePublished: `${story.date}T00:00:00Z`,
    dateModified: `${story.date}T00:00:00Z`,
    author: { "@type": "Person", name: story.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/news/${story.slug}`,
    image: `${siteConfig.url}/og-image.png`,
  };
  return <>
    <ReadingProgress/>
    <div className="article-outer">
      <div className="container article-back"><Link href="/news"><ArrowLeft size={16}/> Back to tech news</Link></div>
      <header className="container article-header">
        <div className="article-meta-top"><span className="category-pill">{story.category}</span><span>{prettyDate(story.date)}</span><span className="meta-dot">•</span><span><Clock3 size={15}/> {story.readingMinutes} min read</span></div>
        <h1>{story.title}</h1><p className="article-description">{story.description}</p>
        <div className="author-row"><span className="author-avatar">b.</span><div><strong>{story.author}</strong><span>Original technology coverage</span></div></div>
      </header>
      <div className="container"><div className="news-story-illustration"><Newspaper size={65} strokeWidth={1.25}/><span>BYTECRAFT / ORIGINAL REPORTING</span></div></div>
      <div className="container article-content-layout"><aside className="article-toc"><div className="toc-sticky"><p>IN THIS STORY</p><nav aria-label="Story sections">{story.headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}</nav></div></aside><div className="article-main"><div className="article-prose" dangerouslySetInnerHTML={{ __html: story.html }}/><ShareActions title={story.title}/><div className="post-endnote"><span className="endnote-icon">✳</span><div><strong>Thanks for reading.</strong><p>For more verified context, look for links to the original sources in the article.</p></div></div></div></div>
      {related.length > 0 && <section className="container related-section"><div className="section-topline"><span className="section-kicker">MORE NEWS</span><Link href="/news" className="inline-link">See all stories <ArrowUpRight size={16}/></Link></div><div className="section-heading-row"><h2>Keep <em>reading.</em></h2></div><NewsExplorer items={related} preview/></section>}
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}/>
  </>;
}
