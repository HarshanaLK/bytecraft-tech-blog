---
title: "React Server and Client Components explained with examples"
description: "Learn what belongs on the server, what needs the browser, and how to avoid shipping unnecessary JavaScript."
category: web-development
date: '2026-10-28'
author: Bytecraft Editorial
featured: false
tags: [React, Next.js, Server Components, Architecture]
---

In the Next.js App Router, components can run in different environments. This is useful for performance, but confusing when you first encounter a hook error or a component that cannot access a database. The solution is to be deliberate about which parts of your interface require browser interaction.

## Start with a Server Component

Server Components are the default in the App Router. They can load data on the server and produce UI without sending all of their code to the browser.

```tsx
// app/articles/page.tsx
export default async function ArticlesPage() {
  const articles = await getArticles();
  return <ul>{articles.map(article => (
    <li key={article.id}>{article.title}</li>
  ))}</ul>;
}
```

This is an illustrative example; `getArticles` must be implemented in your project. Server-side code is a good place for database queries, file reads, and calls that require private credentials. Always apply authorization rules to sensitive data, even when the code runs on the server.

## Add a Client Component only where needed

Features that use state, browser APIs, or click handlers need a Client Component. Put `"use client"` at the top of that module:

```tsx
"use client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>
    Clicked {count} times
  </button>;
}
```

The directive establishes a boundary: code imported by this Client Component must be compatible with the client bundle. Do not import server-only utilities or secrets into that module.

## Compose the two approaches

A Server Component can render a Client Component and pass it serializable props. For example, the server can retrieve a list of articles and pass safe metadata to an interactive search box. The browser then filters the data without needing another request for each keystroke.

For a large dataset, the tradeoff changes. Server-side filtering, pagination, and caching may be more efficient than serializing thousands of records to the client.

## Avoid common mistakes

**Using state in a Server Component:** move only the interactive portion into a small Client Component instead of marking the whole page as client-side.

**Fetching private data on the client:** access protected credentials on the server and return only the fields the viewer is authorized to see.

**Passing functions across boundaries:** props passed from server to client must be serializable, apart from supported framework mechanisms such as Server Actions. Ordinary callbacks created in a Server Component cannot simply be passed to a Client Component.

## Choose boundaries based on behavior

An article body can remain a Server Component. A search input, share button, or reading-progress indicator should be a Client Component. This separation keeps the initial page fast while preserving the interactive features readers expect.

The goal is not to avoid Client Components completely. It is to use them where they improve the experience and keep everything else as simple as possible.
