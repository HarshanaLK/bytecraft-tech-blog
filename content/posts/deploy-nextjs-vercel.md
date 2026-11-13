---
title: "Deploy a Next.js website to Vercel step by step"
description: "From a local Git repository to a public HTTPS website, with environment variables, domain setup, and launch checks."
category: devops-cloud
date: '2026-10-25'
author: Bytecraft Editorial
featured: false
tags: [Next.js, Vercel, Deployment, Hosting, Git]
---

Deploying a Next.js application is more than pressing a button. A good launch checks whether production builds succeed, environment variables point to the right services, and search engines receive the correct canonical URLs.

## Prepare your application locally

Before hosting anything, run a clean production build:

```bash
npm install
npm run build
```

Fix build errors rather than relying on the development server, which may behave differently. Check that your project has a working `start` script and that sensitive values live in environment variables rather than source files.

## Push to a Git provider

Initialize a Git repository if necessary and commit your source code. Make sure `.gitignore` excludes `.env` files containing secrets, `node_modules`, and build output. Push the repository to GitHub or another supported Git provider.

Do not upload a production database dump or authentication tokens as part of your first commit.

## Import the repository in Vercel

Sign in to Vercel, create a new project, and import your repository. For a conventional Next.js application, the platform can usually detect the framework and set reasonable defaults. Review the build command, root directory, and environment configuration before starting the deployment.

A personal or hobby tier may be suitable for experimentation, but **check current plan limits and commercial-use rules** before using it for an ad-supported business website. Free hosting is not always unrestricted commercial hosting.

## Configure environment variables

If your application reads an API base URL or public website URL, add the corresponding environment variables to the deployment settings. Only variables with `NEXT_PUBLIC_` should be intended for use in browser code; never use that prefix for secrets.

For this Bytecraft starter, set:

```ini
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

If you add a variable after deployment, trigger a new deployment so build-time values are updated.

## Connect a custom domain

Register your preferred domain through a registrar and add it to your Vercel project. Follow the displayed DNS instructions exactly. Domain changes can take time to propagate. After setup, confirm HTTPS works and that your preferred hostname redirects consistently.

Use the same canonical domain in metadata, sitemap URLs, and Search Console.

## Launch with a checklist

1. Visit the homepage and several article URLs in an incognito window.
2. Check the mobile layout and navigation.
3. Confirm `https://your-domain.com/sitemap.xml` works.
4. Verify the contact address and policy pages contain your real information.
5. Test any API-dependent features using production settings.
6. Add the property to Google Search Console and monitor indexing errors.

Deploying is the start of maintenance, not the end. Keep dependencies updated and test important pages after changes.
