---
title: "Your first GitHub Actions workflow for a web project"
description: "Set up an automated install, typecheck, and build when someone opens a pull request."
category: devops-cloud
date: '2026-10-30'
author: Bytecraft Editorial
featured: false
tags: [GitHub Actions, CI, DevOps, GitHub, Automation]
---

Code that works on one laptop can still fail when a teammate opens the project. Continuous integration (CI) gives every change a repeatable check before it is merged. GitHub Actions can run these checks whenever someone pushes code or opens a pull request.

## What a workflow actually does

A workflow is a YAML file stored in `.github/workflows/`. It declares events that start a job, which machine the job runs on, and which steps to execute. For a typical Node.js project, a first workflow should install dependencies and verify that the application builds.

## Create a basic workflow

Add `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
```

This assumes your project has a committed `package-lock.json` and the two npm scripts. If a project has tests, add `npm test` as an additional step.

For production repositories, pin third-party actions to reviewed full commit SHAs and follow your organization's security policies. The version tags above are readable starter examples, not immutable references.

## Why `npm ci` matters

`npm ci` installs dependencies from the lockfile and fails if it disagrees with `package.json`. This makes automation more predictable than a dependency resolution that can change from one run to another. Generate the lockfile with `npm install` and commit it to Git.

## Protect secrets and permissions

Do not print credentials in logs or put tokens directly in YAML. Use the repository's protected secrets and appropriate environment restrictions when credentials are required. Most build-only jobs do not need broad write permissions, so the example explicitly requests only repository read access.

Be particularly cautious with workflows triggered from untrusted pull requests. They should not receive privileged secrets simply because they need to compile code.

## Turn results into a team habit

After the workflow runs successfully, configure branch protection so required checks pass before a pull request can merge. Keep the workflow small at first; then add linting, unit tests, and security checks that offer measurable value.

CI doesn't replace a code review, but it removes repetitive checks and helps teammates focus on design and correctness instead of avoidable build failures.
