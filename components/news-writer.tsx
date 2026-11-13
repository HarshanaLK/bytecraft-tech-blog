"use client";

import { useEffect, useState } from "react";
import { Download, FileText, Info, ShieldCheck } from "lucide-react";
import { newsCategories, type NewsCategory } from "@/lib/news-types";

type Draft = {
  title: string;
  description: string;
  author: string;
  category: NewsCategory;
  date: string;
  tags: string;
  body: string;
};

const storageKey = "bytecraft-news-writer-v1";
const emptyDraft: Draft = { title: "", description: "", author: "", category: "Technology", date: "", tags: "", body: "" };

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 75) || "untitled-tech-story";
}

// YAML quoted scalars: JSON strings are accepted YAML double-quoted strings.
function yamlString(value: string) { return JSON.stringify(value); }

function createMarkdown(draft: Draft, status: "draft" | "published") {
  const tags = draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  return `---\ntitle: ${yamlString(draft.title.trim())}\ndescription: ${yamlString(draft.description.trim())}\nauthor: ${yamlString(draft.author.trim())}\ncategory: ${yamlString(draft.category)}\ndate: ${yamlString(draft.date)}\nstatus: ${status}\nfeatured: false\ntags: ${JSON.stringify(tags)}\n---\n\n${draft.body.trim()}\n`;
}

export function NewsWriter() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loaded, setLoaded] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Draft>;
        if (parsed && typeof parsed === "object") {
          setDraft((before) => ({ ...before, ...Object.fromEntries(Object.entries(parsed).filter(([, value]) => typeof value === "string")) }));
        }
      }
    } catch { /* Browser storage may be blocked; manual download still works. */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(draft)); }
    catch { /* Private browsing may block storage. */ }
  }, [draft, loaded]);

  function setField<K extends keyof Draft>(field: K, value: Draft[K]) {
    setDraft((before) => ({ ...before, [field]: value }));
    setReviewed(false);
    setMessage("");
  }

  function download() {
    if (!draft.title.trim() || !draft.description.trim() || !draft.author.trim() || !draft.date || draft.body.trim().length < 80) {
      setMessage("Fill in the title, summary, author and date, and write at least 80 characters of article content.");
      return;
    }
    const markdown = createMarkdown(draft, reviewed ? "published" : "draft");
    const file = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slugify(draft.title)}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(`File saved as ${slugify(draft.title)}.md. Copy it into content/news/ and rebuild your site to publish.`);
  }

  const wordCount = draft.body.trim() ? draft.body.trim().split(/\s+/).length : 0;
  return <div className="container studio-layout">
    <section className="studio-editor" aria-label="News article editor">
      <div className="studio-editor-top"><div><span className="section-kicker">STORY EDITOR</span><h2>Write a new article</h2></div><span className="studio-autosave"><FileText size={16}/> Saved locally in this browser</span></div>
      <div className="studio-fields">
        <label>Headline <input value={draft.title} maxLength={130} placeholder="A clear, factual headline" onChange={(e) => setField("title", e.target.value)} /></label>
        <label>Summary <textarea value={draft.description} rows={3} maxLength={350} placeholder="What happened and why should readers care?" onChange={(e) => setField("description", e.target.value)} /></label>
        <div className="studio-field-grid">
          <label>Author <input value={draft.author} placeholder="Your real name or byline" onChange={(e) => setField("author", e.target.value)} /></label>
          <label>Publication date <input type="date" value={draft.date} onChange={(e) => setField("date", e.target.value)} /></label>
          <label>Category <select value={draft.category} onChange={(e) => setField("category", e.target.value as NewsCategory)}>{newsCategories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}</select></label>
          <label>Tags <input value={draft.tags} placeholder="AI, Open Source, Tools" onChange={(e) => setField("tags", e.target.value)} /></label>
        </div>
        <label>Article (Markdown) <textarea className="studio-body" value={draft.body} rows={15} placeholder={"Write your own researched story...\n\n## What happened\nExplain the announcement in your words.\n\n## Why it matters\nAdd analysis and context.\n\n## Sources\n- [Official announcement](https://example.com/)"} onChange={(e) => setField("body", e.target.value)} /></label>
      </div>
      <div className="studio-stats"><span>{wordCount} words</span><span>URL: /news/{slugify(draft.title)}/</span></div>
      <label className="studio-review"><input type="checkbox" checked={reviewed} onChange={(e) => { setReviewed(e.target.checked); setMessage(""); }}/><span>I wrote this article, checked facts and dates, and included appropriate source links. Export it with <strong>published</strong> status.</span></label>
      <button type="button" onClick={download} className="button button-dark studio-download"><Download size={18}/> Download {reviewed ? "published article" : "draft Markdown"}</button>
      {message && <p className="studio-feedback" role="status">{message}</p>}
    </section>
    <aside className="studio-sidebar">
      <div className="studio-tip"><Info size={22}/><h3>How publishing works</h3><p>This composer works entirely in your browser. It cannot secretly change your live website and is <strong>not</strong> a protected admin panel.</p><ol><li>Write your news and add source links.</li><li>Download the Markdown file.</li><li>Place it inside <code>content/news/</code>.</li><li>Set <code>status: published</code> after review.</li><li>Commit and deploy your updated website.</li></ol></div>
      <div className="studio-tip studio-tip-green"><ShieldCheck size={22}/><h3>Only your stories go live</h3><p>No auto-generated news, copied reporting, RSS imports or external content publishing are enabled.</p><p>Drafts are excluded from public pages, search metadata, sitemap and RSS.</p></div>
    </aside>
  </div>;
}
