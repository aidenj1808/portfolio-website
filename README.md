# portfolio-website

My personal portfolio of software development and data science projects.

Built with [Astro](https://astro.build), TypeScript, Tailwind CSS, MDX, and Vue (for interactive
islands). Hosted on Cloudflare.

## Setup

Requires Node.js 22.19 or newer (CI and Cloudflare use the version in `.node-version`).

```sh
npm install
npm run dev
```

The dev server runs at <http://localhost:4321>.

## Scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the local dev server                    |
| `npm run build`        | Build the static site to `dist/`              |
| `npm run preview`      | Serve the built site locally                  |
| `npm run check`        | Type-check `.astro` and TypeScript files      |
| `npm run lint`         | Lint with ESLint                              |
| `npm run format`       | Format all files with Prettier                |
| `npm run format:check` | Check formatting without writing (used in CI) |

CI runs lint, format check, type-check, and build on every pull request.

## Adding a project

Create an `.mdx` (or `.md`) file in `src/content/projects/`. The file name becomes the URL:
`my-project.mdx` → `/projects/my-project/`.

```mdx
---
title: My Project
summary: One sentence shown on the project card.
category: data-science # or: software
tech: [Python, pandas, Streamlit]
startDate: 2025-01-10
endDate: 2025-04-20 # omit if ongoing
repo: https://github.com/aidenj1808/my-project # optional
demoUrl: https://example.com # optional
demoType: embed # optional: embed | link | video
cover: ../../assets/projects/my-project.png
coverAlt: Screenshot of the dashboard
draft: false # true hides it from the site
---

Write-up goes here. MDX lets you import and use components inline.
```

Put cover images in `src/assets/projects/`. Astro optimizes them at build time. The schema lives in
`src/content.config.ts`, and the build fails if a project's frontmatter doesn't match it.

## Deployment

The site deploys to Cloudflare Workers as static assets (configured in `wrangler.jsonc`) and is
served at <https://aidenlumley.dev>. Merging to `main` deploys to production. Every other branch
gets a preview at `https://<branch>-portfolio-website.<subdomain>.workers.dev`, and Cloudflare
comments the URL on the branch's pull request.

Top-level settings in `wrangler.jsonc` apply only to production. Previews use the `previews` block.
