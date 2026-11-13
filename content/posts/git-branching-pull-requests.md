---
title: "Git branches and pull requests without the confusion"
description: "Learn a simple team workflow for branches, commits, reviews, and merging changes safely."
category: programming
date: '2026-10-19'
author: Bytecraft Editorial
featured: false
tags: [Git, GitHub, Version Control, Collaboration]
---

Git is easiest to understand when you see it as a way to record changes and coordinate work. A commit captures a project state. A branch gives you a named line of work. A pull request gives teammates a chance to review the change before it enters the shared main branch.

## Start from an up-to-date main branch

For a repository you already cloned, run:

```bash
git switch main
git pull --ff-only origin main
```

The `--ff-only` option avoids creating an unexpected merge commit if the histories diverge. If it fails, investigate local changes before trying something else.

Create a branch for one focused task:

```bash
git switch -c feature/article-search
```

Clear branch names help reviewers understand what a change is about, even before opening the pull request.

## Make meaningful commits

As you work, inspect changed files:

```bash
git status
git diff
```

Stage only the files that belong to the change:

```bash
git add components/blog-search.tsx
git commit -m "Add article search input"
```

If the file is not in your project yet, use the correct path. Commit messages should describe what changed rather than saying “fix stuff” or “update.”

## Push and open a pull request

```bash
git push -u origin feature/article-search
```

Open the repository on GitHub and create a pull request into `main`. A useful description covers the problem, the solution, how it was tested, and any limitations. Add screenshots when interface changes are hard to understand from code alone.

Reviewers can comment on specific lines, request changes, and confirm that automated checks pass.

## Handle changes from other people

While your pull request is open, `main` may move forward. Your repository's team rules may prefer merging the updated main branch into your feature branch or rebasing your branch. Both approaches have tradeoffs. Avoid rewriting shared commit history casually, especially when others are working from the same branch.

Resolve merge conflicts by understanding **both** changes, not by automatically selecting one side.

## Keep pull requests small

A 100-line change is often easier to review than one that mixes an API redesign, UI restyling, and dependency upgrade. Small pull requests allow faster feedback and make bugs easier to isolate.

Git commands are just the mechanics. The real skill is making changes easy for other developers to understand, test, and trust.
