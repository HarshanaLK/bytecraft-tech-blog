"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { categories } from "@/lib/site";
import type { Post } from "@/lib/posts";

export function BlogExplorer({ posts, readCategoryFromUrl = false }: { posts: Post[]; readCategoryFromUrl?: boolean }) {
  const searchParams = useSearchParams();
  const urlCategory = readCategoryFromUrl ? searchParams.get("category") : null;
  const [category, setCategory] = useState("all");
  useEffect(() => {
    if (readCategoryFromUrl) {
      setCategory(categories.some(c => c.slug === urlCategory) ? (urlCategory || "all") : "all");
    }
  }, [readCategoryFromUrl, urlCategory]);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === "all" || post.category === category;
    const needle = query.trim().toLowerCase();
    const matchesSearch = !needle || [post.title, post.description, ...post.tags].join(" ").toLowerCase().includes(needle);
    return matchesCategory && matchesSearch;
  }), [category, posts, query]);

  return (
    <div className="blog-explorer" id="articles">
      <div className="explorer-controls">
        <div className="filter-head"><SlidersHorizontal size={18}/><span>Explore topics</span></div>
        <label className="search-field"><Search size={18} aria-hidden="true"/><span className="sr-only">Search blog articles</span><input type="search" placeholder="Search articles..." value={query} onChange={event => setQuery(event.target.value)}/>{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16}/></button>}</label>
      </div>
      <div className="filter-chips" role="group" aria-label="Filter articles by category">
        <button type="button" className={`chip ${category === "all" ? "chip-active" : ""}`} onClick={() => setCategory("all")}>All topics <span>{posts.length}</span></button>
        {categories.map((item) => <button key={item.slug} type="button" className={`chip ${category === item.slug ? "chip-active" : ""}`} onClick={() => setCategory(item.slug)}>{item.name}</button>)}
      </div>
      <div className="results-heading"><span><strong>{filtered.length}</strong> {filtered.length === 1 ? "article" : "articles"} found</span><span>Newest first ↓</span></div>
      {filtered.length ? <div className="articles-grid">{filtered.map(post => <ArticleCard key={post.slug} post={post}/>)}</div> : <div className="empty-state"><Search size={28}/><h3>No matching articles</h3><p>Try another search term or choose a different topic.</p><button type="button" className="button button-dark" onClick={() => {setCategory("all");setQuery("");}}>Clear filters</button></div>}
    </div>
  );
}
