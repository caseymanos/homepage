# Casey Manos — personal site

A static Astro site for caseymanos.com. Content lives in `src/pages`, shared layouts in `src/layouts`, and public assets in `static`.

## Development

Use Node 22.12+ (or Node 24) and npm:

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The build produces static HTML in `dist`. Vercel uses the Astro configuration in `vercel.json`; no server runtime is required for the content pages. Existing `/h2h` proxy routes and the standalone `/dad/` guide are preserved.

## Content and performance

- Edit the homepage, résumé, projects, and writing index in their `.astro` pages.
- Essays are Markdown in `src/pages/writings`, using `PostLayout.astro`.
- All six content routes render at build time, with no client framework or hydration.
- The original Courier New typography, white background, and blue links are preserved.
- Content pages require no client JavaScript.
- Hashed assets receive immutable caching. HTML stays revalidatable on deployment.
- `next/` is an unrelated local experiment and is excluded from Astro checks.

The standalone `/dad/` application retains its own existing assets and runtime.

## Agent-readable content

The build generates a sitemap and Markdown from the rendered pages. A small Vercel function serves Markdown content negotiation, the public `/api/profile` endpoint, and structured API errors. HTML pages remain static. API documentation is at `/docs/`; the schema is at `/openapi.json`. Run `npm run build` before deploying so generated response data exists.
