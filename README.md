# portfolio-website

Source for [aidenlumley.dev](https://aidenlumley.dev), my personal site: work experience, education
and projects in software development and data, plus my hobbies.

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

## Deployment

The site deploys to Cloudflare Workers as static assets (configured in `wrangler.jsonc`) and is
served at <https://aidenlumley.dev>. Merging to `main` deploys to production. Every other branch
gets a preview at `https://<branch>-portfolio-website.<subdomain>.workers.dev`, and Cloudflare
comments the URL on the branch's pull request.

Top-level settings in `wrangler.jsonc` apply only to production. Previews use the `previews` block.
