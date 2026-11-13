import type { Metadata } from "next";
import { NewsWriter } from "@/components/news-writer";

export const metadata: Metadata = {
  title: "Local News Draft Composer",
  description: "Compose and export original Bytecraft news stories as Markdown drafts.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <>
    <section className="page-hero simple-page-hero"><div className="container">
      <p className="section-kicker">WRITING WORKSPACE</p>
      <h1>Your news. <em>Your voice.</em></h1>
      <p>Draft an original tech story, save a Markdown file, then add it to your site for publication.</p>
      <div className="page-hero-rule"/>
    </div></section>
    <NewsWriter/>
  </>;
}
