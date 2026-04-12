

# Fix SPA Routing for External Hosting (GitHub Deploy)

## Problem
When deploying to external hosting (Netlify, Vercel, Cloudflare Pages, etc.) via GitHub, navigating directly to `/admin`, `/dashboard`, `/login`, or `/signup` returns a 404. This is because static hosting doesn't know to serve `index.html` for client-side routes — it looks for an actual `/admin/index.html` file that doesn't exist.

Lovable's built-in hosting handles this automatically, but external hosts need explicit configuration.

## Solution
Add redirect/rewrite config files for the most common hosting providers so all routes serve `index.html` and let React Router handle them.

### Files to create

1. **`public/_redirects`** — for Netlify
   ```
   /*    /index.html   200
   ```

2. **`public/vercel.json`** — for Vercel (also copy to project root)
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

3. **`public/404.html`** — for GitHub Pages: a small HTML file that redirects to `index.html` with the path preserved via query string (standard GitHub Pages SPA trick).

This covers Netlify, Vercel, and GitHub Pages — the three most common free hosting targets. The admin page, dashboard, and all other routes will work with direct navigation and page refresh.

### Files changed
| File | Purpose |
|---|---|
| `public/_redirects` | Netlify SPA fallback |
| `vercel.json` (project root) | Vercel SPA rewrite |
| `public/404.html` | GitHub Pages SPA fallback |

