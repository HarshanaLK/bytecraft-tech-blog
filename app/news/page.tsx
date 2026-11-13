import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Newspaper, ShieldCheck } from "lucide-react";
import { NewsExplorer } from "@/components/news-explorer";
import { getAllNews } from "@/lib/news";

export function generateMetadata(): Metadata {
  const published = getAllNews().length > 0;
  return {
    title: "Original Tech News",
    description: "Independent technology stories, explained and written by the Bytecraft editor. AI, software, security, cloud and more.",
    alternates: { canonical: "/news" },
    // Empty placeholder pages should not compete with meaningful original articles in search results.
    robots: published ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function NewsPage() {
  const news = getAllNews();
  return <>
    <section className="page-hero news-page-hero"><div className="container">
      <p className="section-kicker"><span className="small-symbol">✳</span> THE BYTECRAFT NEWSROOM</p>
      <h1>Tech news, <em>in your own words.</em></h1>
      <p>Explore our original updates and thoughtful explainers on AI, software, cybersecurity, cloud and the wider tech industry.</p>
      <div className="news-hero-pills"><span><Newspaper size={16}/> Original stories</span><span><BookOpenText size={16}/> Clear context</span><span><ShieldCheck size={16}/> No auto-generated feeds</span></div>
      <div className="page-hero-rule"/>
    </div></section>
    <section className="container news-listing-section">
      <div className="section-topline"><span className="section-kicker">LATEST STORIES</span><Link href="/blog" className="inline-link">Explore tutorials <ArrowUpRight size={16}/></Link></div>
      <div className="section-heading-row"><h2>What&apos;s <em>happening.</em></h2><p>Only the articles we choose to research, write and publish.</p></div>
      <NewsExplorer items={news}/>
    </section>
    <section className="container news-standards-section">
      <div className="news-standards-panel"><div><p className="section-kicker">OUR EDITORIAL APPROACH</p><h2>Context before <em>clicks.</em></h2></div><p>We aim to explain what happened, why it matters and where to learn more. Stories are written locally and reviewed before publication. When we report on others&apos; announcements or research, we link to the original sources instead of copying their articles.</p></div>
    </section>
  </>;
}
