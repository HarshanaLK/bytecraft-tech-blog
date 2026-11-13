import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { CoverArt } from "@/components/cover-art";
import { ReadingProgress, ShareActions } from "@/components/reading-tools";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { prettyDate } from "@/lib/format";
import { categoryBySlug, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const url = `/blog/${post.slug}`;
  return { title: post.title, description: post.description, alternates: { canonical: url }, openGraph: { type: "article", title: post.title, description: post.description, url, publishedTime: `${post.date}T00:00:00Z`, authors: [post.author], images: ["/og-image.png"] }, twitter: { card: "summary_large_image", title: post.title, description: post.description } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = getAllPosts().filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title,
    description: post.description, datePublished: post.date, dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: postUrl,
    image: `${siteConfig.url}/og-image.png`
  };
  return <>
    <ReadingProgress/>
    <div className="article-outer">
      <div className="container article-back"><Link href="/blog"><ArrowLeft size={16}/> Back to all articles</Link></div>
      <header className="container article-header"><div className="article-meta-top"><span className="category-pill">{categoryBySlug(post.category)?.name}</span><span>{prettyDate(post.date)}</span><span className="meta-dot">•</span><span><Clock3 size={15}/> {post.readingMinutes} min read</span></div><h1>{post.title}</h1><p className="article-description">{post.description}</p><div className="author-row"><span className="author-avatar">b.</span><div><strong>{post.author}</strong><span>Guides for curious builders</span></div></div></header>
      <div className="container article-cover"><CoverArt slug={post.slug} category={post.category}/></div>
      <div className="container article-content-layout"><aside className="article-toc"><div className="toc-sticky"><p>ON THIS PAGE</p><nav aria-label="Table of contents">{post.headings.map(h => <a key={h.id} href={`#${h.id}`}>{h.text}</a>)}</nav><div className="toc-decoration">✳</div></div></aside><div className="article-main"><div className="article-prose" dangerouslySetInnerHTML={{ __html: post.html }}/><ShareActions title={post.title}/><div className="post-endnote"><span className="endnote-icon">✳</span><div><strong>Thanks for reading.</strong><p>Technology moves fast. Take what you learned, try it yourself, and keep building.</p></div></div></div></div>
      {related.length ? <section className="container related-section"><div className="section-topline"><span className="section-kicker"><span className="small-symbol">✳</span> KEEP EXPLORING</span><Link href="/blog" className="inline-link">All articles <ArrowUpRight size={16}/></Link></div><div className="section-heading-row"><h2>You might <em>also like.</em></h2></div><div className="articles-grid">{related.map(p => <ArticleCard key={p.slug} post={p}/>)}</div></section> : null}
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}/>
  </>;
}
