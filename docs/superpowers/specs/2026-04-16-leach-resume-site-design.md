# Leach Resume Site — Design

**Date:** 2026-04-16
**Owner:** Andrew Leach (andrew@leachcreative.com)
**Project root:** `/Users/aleach/PhpStormProjects/leach-resume-site`
**Production URL:** `https://leachcreative.com`

## Purpose

A static personal site that serves three audiences with one page: recruiters/hiring managers, prospective consulting clients, and peers/OSS community. The site presents Andrew's recent application-development work at Wastequip and Better Car People alongside his open-source packages from [trysettleup.com](https://trysettleup.com) (Visualizations, Workflowable).

## Goals

- Cinematic, editorial first impression that reflects the B&W beach portrait
- Credible, scannable experience timeline for fast recruiter reads
- Deep-dive case study pages for the two OSS packages
- Fast loads, great Lighthouse scores, strong SEO metadata
- Zero-cost hosting, repeatable one-command deploys, custom apex domain

## Non-goals (v1)

- CMS — all content lives in TS modules and MDX files
- Blog / writing section (future; routes reserved but not built)
- i18n, auth, or any server-side runtime
- Analytics vendor (easy to add later)
- End-to-end tests (Playwright) — scope doesn't warrant it yet

## Tech Stack

- **Next.js 15** (App Router, React 19) with `output: 'export'` — fully static HTML/CSS/JS
- **TypeScript**, strict mode
- **Tailwind CSS 4** + **shadcn/ui** primitives
- **Framer Motion** (`motion`) — scroll-driven reveals, parallax, transitions
- **Lenis** — smooth scroll
- **MDX** via `@next/mdx` — project case studies authored as prose
- **next/font** — Fraunces (serif display) + Inter (sans) + JetBrains Mono (code)
- **shiki** (via `rehype-pretty-code`) — code syntax highlighting at build time
- **sharp** — image optimization build script (replaces `next/image` loader)
- **next-sitemap** — sitemap.xml + robots.txt at postbuild
- **Vitest + React Testing Library** — unit tests for motion primitives and nav logic

## Hosting & Deployment

- **GitHub Pages** with apex custom domain `leachcreative.com`
- **GitHub Actions** workflow: on push to `main` → build → upload Pages artifact → deploy
- `public/CNAME` contains `leachcreative.com`; `public/.nojekyll` disables Jekyll
- `basePath: ''` because site serves at the apex (not under a repo subpath)
- DNS (manual, one-time): A records for apex to GitHub IPs (`185.199.108.153–156`), CNAME `www → <username>.github.io`
- HTTPS enforced via repo Settings → Pages after first deploy

### Static-export consequences

- `next/image` runs with `unoptimized: true`; pre-compression handled by the sharp script
- No API routes, no server actions — contact is `mailto:` + copy-to-clipboard
- All dynamic routes pre-rendered at build time (`generateStaticParams`)

## Visual Direction — Editorial Cinematic

Inspired by the B&W beach portrait: dark ground, thin serif display, film-grain texture, large negative space, scroll-driven motion. Contrast with settleup's light/minimal reference — same typographic restraint, darker ground.

- **Palette:** `#0a0a0a` background, `#f5f5f0` primary text, `#888`/`#bbb` secondary, `#333`/`#1a1a1a` borders
- **Type:** Fraunces (display headings), Inter (body & UI), JetBrains Mono (labels, code)
- **Texture:** subtle film-grain overlay on hero + project hero sections
- **Motion budget:** smooth scroll globally; scroll-reveals fire once on first entry; parallax reserved for the hero portrait only; letter-by-letter reveal reserved for hero + section labels; all motion respects `prefers-reduced-motion` (opacity-only fallback)

## Site Structure

**Hybrid architecture:** homepage is a single cinematic scroll narrative; case studies live on their own routes.

- `/` — scroll narrative (Hero → About → Experience → Open Source → Contact)
- `/projects/visualizations` — case study
- `/projects/workflowable` — case study

## Homepage Sections

### 01 — Hero (100vh)
Full-bleed B&W portrait on the right half, headline stack on the left (stacked on mobile). Parallax: portrait translates ~15% slower than scroll. Fraunces headline "Andrew Leach." with letter-by-letter reveal. Subhead "Lead Software Engineer · Charlotte, NC". Positioning line: *"I build inventory, workflow, and contact-center systems with React, Laravel, and AWS."* Scroll cue at bottom.

### 02 — About (~80vh)
Single column, ~650px max-width, serif body ~18px for editorial feel. Fade-up per paragraph on enter. 2–3 paragraphs covering: who you are, focus on application development and scalable systems, team leadership, and Top Skills (workflow, OIDC, AI).

### 03 — Experience (timeline)
Left-aligned vertical rule; cards on the right. Stagger fade + slide on entry. Entries (filtered to recent application-development roles per owner's preference):

1. **Wastequip** — Lead Software Engineer · Apr 2022–Present · React, PHP, Laravel, Inertia, AWS, Terraform, ECS · *Leading the Wasteware inventory platform and all AWS infrastructure; codified infra in Terraform, built the deployment pipeline.*
2. **Better Car People** — Senior Software Developer · Nov 2019–Jun 2022 · PHP, Laravel, TypeScript, Vue, Angular, Twilio · *Architected the contact-center suite powering hundreds of dealerships.*
3. **Better Car People** — Web Developer · Feb 2017–Nov 2019 *(collapsed; "Show earlier roles" reveals Big Ring 2014–2017)*

Education block at the bottom: UNC Charlotte, B.S. Computer Science, Software and Info Systems, 2009–2015.

### 04 — Open Source (trysettleup.com)
Section label reads "Open Source · trysettleup.com". Two large cards (stack on mobile) linking to `/projects/visualizations` and `/projects/workflowable`. Each card: mark, name, one-line description, stack chips, "Read case study →". Hover: lift + chip intensify.

### 05 — Contact (100vh)
Centered Fraunces line "Let's talk." Email `andrew@leachcreative.com` with click-to-copy (toast confirms) and `mailto:` button. Footer row: GitHub, LinkedIn, resume.pdf download. Small copyright line.

## Project Case Study Template (`/projects/[slug]`)

Shared layout; content swapped via MDX.

1. **Back link** — "← All projects" (anchors to `/#open-source`)
2. **Hero** — project name (Fraunces display), tagline, meta row (type, year, license, GitHub/Packagist/docs links)
3. **Overview** — 2–3 MDX paragraphs: problem and audience
4. **Stack & principles** — chip row + 2-sentence principles block
5. **Key capabilities** — 3–4 titled blocks, MDX prose
6. **Code sample** — one representative snippet, syntax highlighted via shiki, captioned
7. **Architecture** — inline SVG diagram + explanatory prose
8. **Links out** — GitHub, Packagist, docs, related posts
9. **Pagination** — Previous / Next project at the bottom

**Transitions:** entering route fades up + hero name letter-reveals, subsequent sections stagger-fade on scroll. Leaving (back nav) uses Framer Motion `AnimatePresence` soft fade + slide.

### Starter content outlines

**`/projects/visualizations/content.mdx`**
- Tagline: "A Laravel package for building data visualizations."
- Overview: problem — every Laravel app rebuilds tables/charts from scratch; solution — DataGrids + Charts as PHP classes with auto filtering, sorting, pagination
- Capabilities: Declarative DataGrids · Chart classes · Auto filter/sort/paginate · Inertia & Blade rendering · Zero vendor lock-in
- Code sample: a DataGrid subclass defining columns, filters, and query (marked `TODO: paste real sample`)
- Architecture: `DataGrid` → `QueryBuilder` → `Paginator` → `Renderer` (Blade/Inertia)
- Links: GitHub repo, Packagist, docs on trysettleup.com

**`/projects/workflowable/content.mdx`**
- Tagline: "A flexible, event-driven workflow engine for Laravel."
- Overview: problem — business processes sprawl across jobs/listeners/state flags; solution — JSON-defined workflows + event-sourced history
- Capabilities: JSON-defined workflows · Event-sourced audit trail · Conditional transitions · Replayable state · MIT licensed
- Code sample: a JSON workflow definition + a controller dispatching a transition (marked `TODO`)
- Architecture: `Workflow` → `State` → `Transition` → `Event Store` with event-sourcing arrows
- Links: GitHub repo, Packagist, docs on trysettleup.com

Every MDX file includes `TODO:` markers where real code samples, benchmarks, or screenshots belong so the owner can paste them in without touching component code.

## File Structure

```
leach-resume-site/
├── .github/workflows/deploy.yml
├── public/
│   ├── CNAME                         # "leachcreative.com"
│   ├── .nojekyll
│   ├── images/portrait.jpg
│   ├── images/portrait.webp          # generated by scripts/optimize-images.mjs
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx                # fonts, Lenis provider, theme, JSON-LD
│   │   ├── page.tsx                  # homepage scroll composition
│   │   ├── not-found.tsx
│   │   └── projects/
│   │       ├── layout.tsx
│   │       ├── visualizations/
│   │       │   ├── page.tsx
│   │       │   └── content.mdx
│   │       └── workflowable/
│   │           ├── page.tsx
│   │           └── content.mdx
│   ├── components/
│   │   ├── ui/                       # shadcn primitives
│   │   ├── layout/
│   │   │   ├── SmoothScroll.tsx      # Lenis provider
│   │   │   ├── Nav.tsx               # sticky nav + scroll-progress bar
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── OpenSource.tsx
│   │   │   └── Contact.tsx
│   │   ├── motion/
│   │   │   ├── FadeUp.tsx
│   │   │   ├── SplitText.tsx
│   │   │   └── Parallax.tsx
│   │   └── project/
│   │       ├── ProjectHero.tsx
│   │       └── CodeBlock.tsx
│   ├── content/
│   │   ├── experience.ts             # typed resume data
│   │   └── projects.ts               # project metadata
│   ├── lib/
│   │   ├── fonts.ts
│   │   └── utils.ts
│   └── mdx-components.tsx
├── scripts/
│   └── optimize-images.mjs
├── src/app/globals.css           # Tailwind 4 @theme tokens, base styles
├── next.config.ts
├── postcss.config.mjs            # @tailwindcss/postcss plugin
├── tsconfig.json
└── package.json
```

## Build & Deploy

### `next.config.ts`

```ts
import createMDX from '@next/mdx';
const withMDX = createMDX({
  options: { remarkPlugins: [], rehypePlugins: [/* rehype-pretty-code */] },
});
export default withMDX({
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
});
```

### GitHub Actions — `.github/workflows/deploy.yml`

- Triggers: `push` to `main`, `workflow_dispatch`
- Permissions: `contents: read`, `pages: write`, `id-token: write`
- Concurrency group `pages` (cancel superseded)
- `build` job: checkout → `actions/setup-node@v4` (Node 20, npm cache) → `npm ci` → `npm run build` → `actions/upload-pages-artifact@v3` with `path: ./out`
- `deploy` job (needs build): `actions/deploy-pages@v4`
- No third-party actions; no secrets required

### Image pipeline

`scripts/optimize-images.mjs` reads `public/images/*.{jpg,png}`, writes `.webp` variants (quality 85), and generates `public/images/manifest.json` with dimensions. Wired as `"prebuild"`. A `<Picture>` wrapper component reads the manifest for intrinsic `width`/`height` to prevent CLS.

### Quality gates

- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — Next ESLint
- `npm run format:check` — Prettier
- `npm run test` — Vitest (motion primitives, nav scroll-progress)
- `npm run ci` — chains typecheck → lint → format:check → test → build

## Accessibility & Performance

- All motion primitives honor `prefers-reduced-motion` (opacity-only fallback, no transforms)
- Semantic HTML: `<main>`, `<nav>`, `<section aria-labelledby>`, correct heading hierarchy
- Portrait served as `<picture>` with WebP + JPG fallback, lazy-loaded below the fold
- Fonts preloaded via `next/font` with `display: swap`
- Lighthouse targets: Performance ≥95, Accessibility 100, Best Practices 100, SEO 100

## SEO

- Per-page metadata (title, description, canonical)
- `sitemap.xml` + `robots.txt` via `next-sitemap` at postbuild
- Open Graph image auto-generated from portrait + name
- Twitter card metadata
- JSON-LD `Person` schema in root layout with `sameAs` (LinkedIn, GitHub)

## Testing Strategy

- **Unit (Vitest + RTL):** motion primitives (`FadeUp`, `SplitText`, `Parallax`), `Nav` scroll-progress logic, `copy-to-clipboard` utility
- **Manual visual check:** `npm run dev` locally plus `npm run build && npx serve out` before push
- **No e2e tests in v1** — revisit if site grows

## Open questions / owner to-dos

- Provide final B&W portrait file (drop at `public/images/portrait.jpg`)
- Provide `public/resume.pdf` (the one shared during brainstorming is fine)
- Confirm GitHub repo name (default: `leach-resume-site`) and username for `<user>.github.io` CNAME fallback
- Review starter MDX content and replace `TODO:` markers with real code samples / architecture details
- Review timeline copy — especially the Wastequip impact line — to avoid proprietary detail leakage
- Decide whether to add Vercel Analytics / Plausible (can ship without)
