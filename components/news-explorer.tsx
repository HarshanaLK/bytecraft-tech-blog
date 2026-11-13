"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper, Search, X } from "lucide-react";
import { newsCategories, type NewsItem } from "@/lib/news-types";

type Props = { items: NewsItem[]; preview?: boolean };

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`));
}

export function NewsExplorer({ items, preview = false }: Props) {
  const [category, setCategory] = useState<(typeof newsCategories)[number]>("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(9);
  const filtered = useMemo(() => items.filter((item) => {
    const text = `${item.title} ${item.description} ${item.author} ${item.tags.join(" ")}`.toLowerCase();
    return (category === "All" || item.category === category) && text.includes(search.trim().toLowerCase());
  }), [items, category, search]);
  const shown = preview ? items.slice(0, 3) : filtered.slice(0, visible);

  return <div className="news-explorer">
    {!preview && <>
      <div className="news-toolbar">
        <div className="news-filter-tabs" role="group" aria-label="Filter technology news">
          {newsCategories.map((item) => <button type="button" key={item}
            className={`news-filter-chip ${category === item ? "news-filter-chip-active" : ""}`}
            onClick={() => { setCategory(item); setVisible(9); }} aria-pressed={category === item}>{item}</button>)}
        </div>
        <label className="news-search"><Search size={17}/><span className="sr-only">Search original news stories</span>
          <input value={search} onChange={(event) => { setSearch(event.target.value); setVisible(9); }} placeholder="Search stories, topics or authors" />
          {search && <button type="button" aria-label="Clear news search" onClick={() => setSearch("")}><X size={16}/></button>}
        </label>
      </div>
      <div className="news-meta-line"><span>{filtered.length} published stor{filtered.length === 1 ? "y" : "ies"}</span><span>Original writing</span></div>
    </>}
    {shown.length ? <div className={`news-grid ${preview ? "news-grid-preview" : ""}`}>
      {shown.map((item) => <article className="news-tile" key={item.slug}>
        <div className="news-tile-top"><span className="news-tile-category">{item.category}</span><time dateTime={item.date}>{displayDate(item.date)}</time></div>
        <h3><Link href={`/news/${item.slug}`}>{item.title}</Link></h3>
        <p className="news-tile-summary">{item.description}</p>
        <div className="news-tile-bottom"><span>By {item.author} · {item.readingMinutes} min</span><Link href={`/news/${item.slug}`} aria-label={`Read ${item.title}`}><ArrowUpRight size={19}/></Link></div>
      </article>)}
    </div> : <div className="news-empty">
      <Newspaper size={31}/>
      <h3>{items.length ? "No matching stories" : "Original tech news, coming soon"}</h3>
      <p>{items.length ? "Try another category or a different search." : "This section is reserved for articles written and published by the site owner. No third-party feeds or automatic articles are added."}</p>
    </div>}
    {!preview && filtered.length > visible && <div className="news-more"><button type="button" className="button button-dark" onClick={() => setVisible((count) => count + 9)}>View more stories <ArrowUpRight size={17}/></button></div>}
  </div>;
}
