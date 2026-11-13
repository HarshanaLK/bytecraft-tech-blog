---
title: "Docker basics: ship the same environment everywhere"
description: "A practical introduction to images, containers, Dockerfiles, and running a small application without mystery."
category: devops-cloud
date: '2026-11-06'
author: Bytecraft Editorial
featured: false
tags: [Docker, Containers, DevOps, Deployment]
---

The phrase “it works on my machine” often describes an environment mismatch: one laptop has a different runtime, dependency version, or operating-system package. Docker helps teams package an application and its runtime environment into a consistent image.

## Image versus container

An **image** is a versioned blueprint that includes files and instructions needed to run software. A **container** is a running (or stopped) instance of an image. You can create multiple containers from the same image.

A Dockerfile describes how to build the image. A registry stores images so other machines can fetch them.

## Your first Dockerfile

Assume a small Node.js application starts with `npm start` and listens on port 3000. A simplified Dockerfile looks like this:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

This assumes a committed `package-lock.json`, a suitable `start` script, and an application that doesn't require build-time development dependencies. Production frameworks often need a **multi-stage build** instead.

Add a `.dockerignore` file so local dependencies and secrets aren't copied into the build context:

```text
node_modules
.next
.git
.env
.env.local
```

Never bake credentials directly into images.

## Build and run locally

```bash
docker build -t demo-app .
docker run --rm -p 3000:3000 demo-app
```

The `-p` flag maps a host port to a port in the container. If the app listens only on `127.0.0.1` inside the container, outside requests may fail; configure it to bind to `0.0.0.0` when appropriate.

## What Docker does not solve

Containers aren't magic virtual machines. They share a host kernel, require resource limits, and still need proper security settings, patching, and monitoring. Persistent application data should live in volumes or managed data services rather than in the writable layer of a disposable container.

Docker also doesn't guarantee identical behavior across different CPU architectures or external service configurations. Build your images deliberately and test in an environment close to production.

## When to use it

Docker is especially valuable when teammates need the same dependencies, automated tests must run consistently in CI, or a project has several services with different runtimes. For a tiny static site, it may be more complexity than you need. Choose it for a real deployment or collaboration benefit, not just because it is popular.
