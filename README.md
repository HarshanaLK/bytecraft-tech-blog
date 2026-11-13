# Bytecraft — Original Tech Blog & News

A responsive **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** website for your own programming tutorials **and original technology news**.

**Only you publish news.** This project does not scrape news, auto-fetch external RSS feeds, copy journalists' articles, or use AI to auto-write posts. The **News Writer** at `/studio/` lets you compose and download your own Markdown files. You decide what is published after you review the story.

## Features

- Responsive homepage featuring tech tutorials and a dedicated original news section
- 12 starter tutorials in `/blog/` (review and personalize them before launching)
- `/news/` listing with search and AI, Development, Security, Cloud and Technology category filters
- SEO-friendly `/news/<slug>/` story pages with author, date, category, share controls and sanitized Markdown
- `/studio/` browser-based original news composer with locally saved drafts, Markdown export and review checkbox
- Draft/future-dated news excluded from public routes, RSS and sitemap
- Blog post and news story metadata; canonical URLs, Open Graph, NewsArticle JSON-LD, sitemap.xml, RSS
- AdSense script disabled by default; ads.txt generated only after you add your own publisher ID
- Static export via `npm run build`, deployable to a compatible static host (e.g. Netlify)
- **No CMS, user login or database:** content is version-controlled and intentionally published by you

## 1. Run locally

**Requirements:** Node.js 20.9+ (Node 22 recommended), npm, and VS Code.

1. Extract the ZIP and open `bytecraft-tech-blog/` in VS Code.
2. Run `npm install` in a terminal.
3. Copy the environment template:
   - Windows PowerShell: `Copy-Item .env.example .env.local`
   - macOS/Linux: `cp .env.example .env.local`
4. Run `npm run dev` and visit **http://localhost:3000**.
5. Your original tech news page is **http://localhost:3000/news/**.
6. Your local writer is **http://localhost:3000/studio/**.

## 2. Write and publish YOUR original tech news

### Option A — News Writer (form in browser)

1. Open **/studio/** in your browser.
2. Write the headline, summary, byline, category, publication date, tags, and Markdown article body.
3. Use sections like `## What happened`, `## Why it matters`, and `## Sources`. Link to real primary sources and give your own analysis.
4. Your draft is saved **only in that browser's local storage**. Browser clearing or switching devices can lose it; **download files regularly**.
5. Click **Download draft Markdown**. The file has `status: draft` and will not be public.
6. After fact-checking, tick the review checkbox and download a file with `status: published` instead.
7. Move the file into **`content/news/`** (for example, `content/news/my-new-story.md`). Make sure its filename is unique, all lowercase, and uses hyphens.
8. Run `npm run dev` locally, or `npm run build` and deploy. **Static sites only update when rebuilt and redeployed**. When Git-connected to Netlify, a commit can trigger that rebuild.

**Important:** `/studio/` is **not an authenticated web admin panel** and cannot upload or publish content directly. It is a client-only Markdown composer; even if someone else opens the page, they cannot alter the hosted website through it. When you want secure logins and one-click publishing, you will need a CMS, authenticated API and writable backend/storage.

### Option B — Write a Markdown file directly in VS Code

Create `content/news/my-tech-story.md`:

```markdown
---
title: "My original tech news headline"
description: "A clear summary, written in my own words."
author: "Your real name"
category: "Development"
date: "2026-11-13"
status: draft
featured: false
tags: [JavaScript, Developer tools]
---

Write your own original reporting and technical context here.

## What happened

Summarize what has been verified; include dates, product names, and sources.

## Why it matters

Explain the impact to developers in your own words.

## Sources

- [Official source](https://example.com/)
```

The only allowed `category` values are **AI**, **Development**, **Security**, **Cloud**, and **Technology**. The filename becomes the story URL: `content/news/my-tech-story.md` → `/news/my-tech-story/`.

Set `status: published` only once the article is correct and ready to go live. With `status: draft`, the article **does not appear** on the public site, even if the file is in `content/news/`. Articles dated in the future are also hidden until your next build on or after their date.

`content/news/example-draft.md` is an **unpublished template**, not a real news report. Replace it with your own content before marking it published. The initial public News page contains no made-up current headlines.

### Editing or deleting a news post

Open its `.md` file in `content/news/` and edit the text. Rebuild/redeploy to apply the change. Set `status: draft` to unpublish, or delete the file to remove the story on the next deployment. Changing its **filename changes its URL**.

## 3. Add regular tutorials

Articles are in `content/posts/*.md`. Duplicate an existing example, change the front matter and Markdown body, and rebuild. These are separate from original tech news.

Available categories: `web-development`, `programming`, `devops-cloud`, `ai-tools`.

The included sample tutorials are examples only. Review, test, and improve them with original explanations, tested code, and personal experience before asking AdSense to review your site.

## 4. Project structure

```text
bytecraft-tech-blog/
├── app/
│   ├── page.tsx                 Homepage
│   ├── blog/                    Tutorials listing and detail pages
│   ├── news/
│   │   ├── page.tsx             Original news listing
│   │   └── [slug]/page.tsx      Full original news story
│   ├── studio/page.tsx          Browser composer — no server publishing
│   ├── sitemap.ts               Includes published news
│   └── rss.xml/route.ts         Includes published news and blog posts
├── components/
│   ├── news-explorer.tsx        Search, category filters, news cards
│   └── news-writer.tsx          Compose and download Markdown
├── content/
│   ├── posts/                   Original tutorials
│   └── news/                    Your original news files
├── lib/
│   ├── posts.ts                 Blog article loader
│   ├── news.ts                  Published-news loader and sanitizer
│   └── site.ts                  Brand details and domain
├── .env.example
├── netlify.toml
└── next.config.ts              Static export
```

## 5. SEO, identity and Google AdSense

Before deploying, update the `lib/site.ts` brand details: `name`, `tagline`, `contactEmail`, `authorName`, `xUrl`, and especially the real production URL via `NEXT_PUBLIC_SITE_URL` in `.env.local` and your hosting environment. The default `https://example.com` is a placeholder.

Customize `/about`, `/contact`, `/privacy`, `/terms`, and `/disclaimer` for your own business and privacy practices. Add real sources, real bylines, and meaningful original content. **Approval by Google AdSense is not guaranteed.** Never copy entire third-party news articles or publish unverified rumors as facts.

Only after Google instructs you to connect your site, set:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890123456
NEXT_PUBLIC_ENABLE_ADSENSE=true
```

Google may also require a privacy and consent solution depending on visitors' locations. Follow AdSense's setup and policy requirements before serving ads.

## 6. Build and deploy

Run these checks:

```bash
npm run typecheck
npm run lint
npm run build
```

A successful static build creates the `out/` directory. The included `netlify.toml` uses `npm run build` and publishes `out/`. Push to GitHub and connect the repository to a Netlify site to rebuild on commits. If you publish a new `.md` story but do not redeploy, visitors will continue to see the old version.

**Note on hosting:** Hosting products' commercial-use terms and quotas can change; verify the plan you choose is suitable for an AdSense-monetized website.

---

This starter deliberately has no fake live news items. All news is controlled and written by the website owner.
