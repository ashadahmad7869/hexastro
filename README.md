# HexAstro

Astrophysics fundamentals, each paired with a fresh arXiv paper. Live at https://hexastro.vercel.app

## Develop

```bash
npm install
npm run dev      # http://127.0.0.1:3000 (only reachable from this machine)
npm run build    # production build; drafts are hidden
```

## Content

- Articles live in `content/articles/*.mdx` (frontmatter: `title`, `date`, `excerpt`, `tags`, `contentType`: `guide` | `debrief` | `exploration`).
- `draft: true` hides an article (and `src/config/news.ts` items) in production; drafts still show in `npm run dev`.
- Pushing to `main` deploys automatically via Vercel.

## Security

Security headers (CSP, HSTS, frame-ancestors, etc.) are set in `next.config.ts`. MDX content cannot run JavaScript (`blockJS`).
