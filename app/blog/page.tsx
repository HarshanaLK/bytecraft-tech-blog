import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogExplorer } from "@/components/blog-explorer";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "All articles", description: "Explore practical tutorials on web development, programming, DevOps, cloud, and AI tools.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  const posts = getAllPosts();
  return <>
    <section className="page-hero"><div className="container"><p className="section-kicker"><span className="small-symbol">✳</span> THE BYTECRAFT LIBRARY</p><h1>A little more <em>knowledge.</em><br/>A lot more possible.</h1><p>Browse field-tested developer guides, beginner-friendly explainers, and tools worth knowing.</p><div className="page-hero-rule"/></div></section>
    <section className="container listing-section"><Suspense fallback={<p>Loading articles...</p>}><BlogExplorer posts={posts} readCategoryFromUrl /></Suspense></section>
  </>;
}
