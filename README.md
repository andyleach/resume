# leach-resume-site

Personal site for Andrew Leach at https://leachcreative.com.

Static Next.js 16 (App Router, React 19) + Tailwind 4 + shadcn/ui + Framer Motion + Lenis, exported to `out/` and deployed to GitHub Pages via GitHub Actions.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run ci       # typecheck + lint + format:check + test + build
```

Static output lands in `out/`.

## Owner-supplied assets

The repo ships with a **synthetic placeholder** portrait. Before publishing:

1. Replace `public/images/portrait.jpg` with the real 1600×1600 B&W photo.
2. Drop `public/resume.pdf` (served at `/resume.pdf`).
3. Run `node scripts/optimize-images.mjs` to regenerate `portrait.webp` and `manifest.json`.

The `prebuild` npm script runs the optimization automatically on every build.

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

### First-time setup

1. Create the GitHub repo (public). Push `main` with `git push -u origin main`.
2. In repo **Settings → Pages**, set **Source: GitHub Actions**.
3. Configure DNS at your registrar for `leachcreative.com`:
   - A `@` → `185.199.108.153`
   - A `@` → `185.199.108.154`
   - A `@` → `185.199.108.155`
   - A `@` → `185.199.108.156`
   - CNAME `www` → `<github-username>.github.io`
4. In **Settings → Pages**, set the custom domain to `leachcreative.com` and, once the DNS check passes, enforce HTTPS.

## Docs

- Design spec: [`docs/superpowers/specs/2026-04-16-leach-resume-site-design.md`](docs/superpowers/specs/2026-04-16-leach-resume-site-design.md)
- Implementation plan: [`docs/superpowers/plans/2026-04-16-leach-resume-site.md`](docs/superpowers/plans/2026-04-16-leach-resume-site.md)
