# Leach Resume Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static, editorial-cinematic personal site at `leachcreative.com` on GitHub Pages with a scroll-narrative homepage and case-study pages for the two trysettleup.com OSS packages.

**Architecture:** Next.js 15 App Router with `output: 'export'` for static HTML, Tailwind CSS 4 + shadcn/ui for primitives, Framer Motion + Lenis for scroll-driven motion, MDX for case-study content, sharp for build-time image optimization, GitHub Actions → GitHub Pages for deployment.

**Tech Stack:** Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui · Framer Motion · Lenis · MDX (`@next/mdx`) · rehype-pretty-code + shiki · sharp · next-sitemap · Vitest + React Testing Library

**Reference spec:** [2026-04-16-leach-resume-site-design.md](../specs/2026-04-16-leach-resume-site-design.md)

---

## File Structure (created over this plan)

```
leach-resume-site/
├── .github/workflows/deploy.yml
├── public/
│   ├── CNAME
│   ├── .nojekyll
│   ├── images/portrait.jpg              (owner-supplied)
│   ├── images/manifest.json             (generated)
│   ├── images/portrait.webp             (generated)
│   └── resume.pdf                       (owner-supplied)
├── scripts/
│   └── optimize-images.mjs
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   └── projects/
│   │       ├── layout.tsx
│   │       ├── visualizations/page.tsx
│   │       ├── visualizations/content.mdx
│   │       ├── workflowable/page.tsx
│   │       └── workflowable/content.mdx
│   ├── components/
│   │   ├── ui/                          (shadcn — generated)
│   │   ├── Picture.tsx
│   │   ├── layout/
│   │   │   ├── SmoothScroll.tsx
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   ├── motion/
│   │   │   ├── FadeUp.tsx
│   │   │   ├── SplitText.tsx
│   │   │   └── Parallax.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── OpenSource.tsx
│   │   │   └── Contact.tsx
│   │   └── project/
│   │       ├── ProjectHero.tsx
│   │       └── CodeBlock.tsx
│   ├── content/
│   │   ├── experience.ts
│   │   └── projects.ts
│   ├── lib/
│   │   ├── fonts.ts
│   │   ├── utils.ts
│   │   └── copy.ts
│   ├── test/
│   │   └── setup.ts
│   └── mdx-components.tsx
├── next.config.ts
├── next-sitemap.config.mjs
├── postcss.config.mjs
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## Phase 1 — Scaffolding

### Task 1: Scaffold the Next.js app in place

**Files:**
- Create: everything `create-next-app` generates
- Preserves: existing `docs/`, `.git/`

- [ ] **Step 1: From the project root, scaffold Next.js**

Run (answer prompts by accepting defaults for TypeScript, ESLint, Tailwind, `src/`, App Router, import alias `@/*`, no Turbopack):
```bash
cd /Users/aleach/PhpStormProjects/leach-resume-site
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --yes
```
Expected: Next.js 15 project installs; `package.json`, `src/app/`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, etc. appear. The pre-existing `docs/` folder remains untouched.

- [ ] **Step 2: Verify dev server boots**

```bash
npm run dev
```
Expected: `Ready in` message, visit `http://localhost:3000`, default Next.js landing page renders. Stop server with `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app"
```

---

### Task 2: Install runtime and dev dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install motion lenis @next/mdx @mdx-js/loader @mdx-js/react @types/mdx rehype-pretty-code shiki next-sitemap clsx tailwind-merge
```

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D sharp vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom prettier prettier-plugin-tailwindcss
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install runtime and dev dependencies"
```

---

### Task 3: Configure static export + MDX in `next.config.ts`

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace `next.config.ts` contents**

```ts
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: 'github-dark-dimmed', light: 'github-light' },
          keepBackground: false,
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default withMDX(nextConfig);
```

- [ ] **Step 2: Verify build produces `out/`**

```bash
npm run build
```
Expected: build succeeds, `out/` directory created at project root with `index.html`.

- [ ] **Step 3: Add `out/` to `.gitignore`**

Append to `.gitignore`:
```
# static export
out/

# superpowers brainstorm cache
.superpowers/
```

- [ ] **Step 4: Commit**

```bash
git add next.config.ts .gitignore
git commit -m "feat: enable static export with MDX + shiki"
```

---

### Task 4: Configure TypeScript strict mode

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Ensure `strict: true` and add stricter flags**

In `tsconfig.json`, under `compilerOptions`, ensure these flags are present (add any missing):
```json
"strict": true,
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true,
"noFallthroughCasesInSwitch": true
```

- [ ] **Step 2: Verify typecheck passes**

```bash
npx tsc --noEmit
```
Expected: exits 0 with no output.

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json
git commit -m "chore: tighten TypeScript strictness"
```

---

### Task 5: Set up Prettier + add `npm run` scripts

**Files:**
- Create: `.prettierrc.json`, `.prettierignore`
- Modify: `package.json`

- [ ] **Step 1: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Create `.prettierignore`**

```
out
.next
node_modules
*.md
```

- [ ] **Step 3: Add scripts to `package.json`** (merge into existing `"scripts"` block)

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run",
  "test:watch": "vitest",
  "prebuild": "node scripts/optimize-images.mjs",
  "postbuild": "next-sitemap --config next-sitemap.config.mjs",
  "ci": "npm run typecheck && npm run lint && npm run format:check && npm run test && npm run build"
}
```

- [ ] **Step 4: Format the codebase**

```bash
npm run format
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add prettier config and npm scripts"
```

---

### Task 6: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `src/test/setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

- [ ] **Step 2: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Add Vitest type reference to `tsconfig.json`**

In `tsconfig.json` `compilerOptions.types` add `"vitest/globals"` (create the array if absent):
```json
"types": ["vitest/globals"]
```

- [ ] **Step 4: Verify Vitest boots**

```bash
npm run test
```
Expected: `No test files found` — exits 0.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: configure vitest + testing-library"
```

---

### Task 7: Set up fonts

**Files:**
- Create: `src/lib/fonts.ts`

- [ ] **Step 1: Create `src/lib/fonts.ts`**

```ts
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const fontClassNames = `${fraunces.variable} ${inter.variable} ${mono.variable}`;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/fonts.ts
git commit -m "feat: configure next/font for Fraunces, Inter, JetBrains Mono"
```

---

### Task 8: Define Tailwind 4 theme tokens in `globals.css`

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `src/app/globals.css` contents**

```css
@import 'tailwindcss';

@theme {
  --color-ink: #0a0a0a;
  --color-paper: #f5f5f0;
  --color-mute: #8a8a88;
  --color-rule: #1a1a1a;
  --color-accent: #e8e3d8;

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;

  --text-display-2xl: 5.5rem;
  --text-display-xl: 4rem;
  --text-display-lg: 3rem;

  --tracking-tightest: -0.03em;
  --tracking-tighter: -0.02em;
  --tracking-wide-label: 0.2em;
}

@layer base {
  html,
  body {
    background: var(--color-ink);
    color: var(--color-paper);
    font-family: var(--font-sans);
  }

  ::selection {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  body {
    font-feature-settings: 'ss01', 'ss02';
  }
}

@layer utilities {
  .font-display { font-family: var(--font-display); }
  .font-sans    { font-family: var(--font-sans); }
  .font-mono    { font-family: var(--font-mono); }

  .label-mono {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: var(--tracking-wide-label);
    text-transform: uppercase;
    color: var(--color-mute);
  }

  .grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.05;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>");
    mix-blend-mode: overlay;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: define Tailwind 4 theme tokens and base styles"
```

---

### Task 9: Install shadcn/ui

**Files:**
- Create: `components.json`, `src/components/ui/button.tsx` (and similar)
- Modify: `src/lib/utils.ts`

- [ ] **Step 1: Init shadcn**

```bash
npx shadcn@latest init -d -y
```
When prompted for base color, accept the default. Expected: `components.json` created, `src/lib/utils.ts` generated with `cn()` helper.

- [ ] **Step 2: Add initial components**

```bash
npx shadcn@latest add button separator
```
Expected: `src/components/ui/button.tsx` and `src/components/ui/separator.tsx` created.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: install shadcn/ui with button and separator"
```

---

## Phase 2 — GitHub Pages pipeline (ship hello-world deploy early)

### Task 10: Create `public/CNAME` and `public/.nojekyll`

**Files:**
- Create: `public/CNAME`, `public/.nojekyll`

- [ ] **Step 1: Create `public/CNAME`** (no trailing newline issues — single line)

Contents: `leachcreative.com`

- [ ] **Step 2: Create `public/.nojekyll`** (empty file)

```bash
touch public/.nojekyll
```

- [ ] **Step 3: Commit**

```bash
git add public/CNAME public/.nojekyll
git commit -m "feat: add CNAME and .nojekyll for GitHub Pages"
```

---

### Task 11: Write the image-optimization script

**Files:**
- Create: `scripts/optimize-images.mjs`

- [ ] **Step 1: Create `scripts/optimize-images.mjs`**

```js
#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('public/images');
const MANIFEST = path.join(SRC_DIR, 'manifest.json');
const EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function main() {
  if (!existsSync(SRC_DIR)) {
    await mkdir(SRC_DIR, { recursive: true });
  }
  const entries = await readdir(SRC_DIR);
  const sources = entries.filter((n) => EXTS.has(path.extname(n).toLowerCase()));

  const manifest = {};
  for (const name of sources) {
    const src = path.join(SRC_DIR, name);
    const base = path.basename(name, path.extname(name));
    const webp = path.join(SRC_DIR, `${base}.webp`);

    const img = sharp(src);
    const meta = await img.metadata();
    await img.webp({ quality: 85 }).toFile(webp);

    manifest[base] = {
      src: `/images/${name}`,
      webp: `/images/${base}.webp`,
      width: meta.width ?? null,
      height: meta.height ?? null,
    };
    console.log(`optimized ${name} → ${base}.webp`);
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`wrote ${MANIFEST} (${Object.keys(manifest).length} entries)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Verify it runs (no-op if no images yet)**

```bash
node scripts/optimize-images.mjs
```
Expected: creates `public/images/` if missing, writes empty `manifest.json`, exits 0.

- [ ] **Step 3: Commit**

```bash
git add scripts/optimize-images.mjs public/images/manifest.json
git commit -m "feat: add sharp-based image optimization script"
```

---

### Task 12: Create the `<Picture>` component

**Files:**
- Create: `src/components/Picture.tsx`

- [ ] **Step 1: Create `src/components/Picture.tsx`**

```tsx
import manifest from '../../public/images/manifest.json';

type ManifestEntry = {
  src: string;
  webp: string;
  width: number | null;
  height: number | null;
};

type Props = {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function Picture({ name, alt, className, priority, sizes }: Props) {
  const entry = (manifest as Record<string, ManifestEntry>)[name];
  if (!entry) {
    throw new Error(`Picture: no manifest entry for "${name}". Add public/images/${name}.jpg and rerun prebuild.`);
  }
  return (
    <picture>
      <source srcSet={entry.webp} type="image/webp" sizes={sizes} />
      <img
        src={entry.src}
        alt={alt}
        width={entry.width ?? undefined}
        height={entry.height ?? undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
```

- [ ] **Step 2: Allow JSON imports in `tsconfig.json`**

Add to `compilerOptions`:
```json
"resolveJsonModule": true
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Picture.tsx tsconfig.json
git commit -m "feat: add Picture component backed by manifest.json"
```

---

### Task 13: Write the GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run ci
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for Pages deploy"
```

---

## Phase 3 — Root layout + motion primitives

### Task 14: Create the root layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx` (temp placeholder)

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { fontClassNames } from '@/lib/fonts';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const SITE_URL = 'https://leachcreative.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Andrew Leach — Lead Software Engineer',
    template: '%s · Andrew Leach',
  },
  description:
    'Andrew Leach builds inventory, workflow, and contact-center systems with React, Laravel, and AWS. Based in Charlotte, NC.',
  openGraph: {
    title: 'Andrew Leach — Lead Software Engineer',
    description:
      'Inventory, workflow, and contact-center systems with React, Laravel, and AWS.',
    url: SITE_URL,
    siteName: 'Andrew Leach',
    type: 'profile',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: SITE_URL },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Andrew Leach',
  jobTitle: 'Lead Software Engineer',
  email: 'mailto:andrew@leachcreative.com',
  url: SITE_URL,
  sameAs: [
    'https://www.linkedin.com/in/andrew-b-leach/',
    'https://github.com/',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassNames}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Replace `src/app/page.tsx` with a temporary placeholder**

```tsx
export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-5xl">Andrew Leach.</h1>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: root layout with metadata, JSON-LD, font classes"
```

---

### Task 15: Create the SmoothScroll (Lenis) provider

**Files:**
- Create: `src/components/layout/SmoothScroll.tsx`

- [ ] **Step 1: Create `src/components/layout/SmoothScroll.tsx`**

```tsx
'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" tells Framer Motion to disable transforms when the
  // OS requests reduced motion, while still allowing opacity animations.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/SmoothScroll.tsx
git commit -m "feat: Lenis smooth scroll provider with reduced-motion respect"
```

---

### Task 16: FadeUp motion primitive — test first

**Files:**
- Create: `src/components/motion/FadeUp.test.tsx`, `src/components/motion/FadeUp.tsx`

- [ ] **Step 1: Write failing test `src/components/motion/FadeUp.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FadeUp } from './FadeUp';

describe('FadeUp', () => {
  it('renders its children', () => {
    render(<FadeUp>hello</FadeUp>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('applies a given className to the wrapper', () => {
    render(<FadeUp className="custom-cls">x</FadeUp>);
    expect(screen.getByText('x').parentElement).toHaveClass('custom-cls');
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npm run test -- FadeUp
```
Expected: FAIL — `Cannot find module './FadeUp'`.

- [ ] **Step 3: Create `src/components/motion/FadeUp.tsx`**

```tsx
'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';

type Props = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeUp({ children, delay = 0, className, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm run test -- FadeUp
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/FadeUp.tsx src/components/motion/FadeUp.test.tsx
git commit -m "feat: FadeUp scroll-reveal primitive"
```

---

### Task 17: SplitText motion primitive — test first

**Files:**
- Create: `src/components/motion/SplitText.test.tsx`, `src/components/motion/SplitText.tsx`

- [ ] **Step 1: Write failing test `src/components/motion/SplitText.test.tsx`**

```tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SplitText } from './SplitText';

describe('SplitText', () => {
  it('renders one span per character, preserving spaces with non-breaking spans', () => {
    const { container } = render(<SplitText>hi!</SplitText>);
    const spans = container.querySelectorAll('[data-char]');
    expect(spans).toHaveLength(3);
    expect(spans[0]?.textContent).toBe('h');
    expect(spans[1]?.textContent).toBe('i');
    expect(spans[2]?.textContent).toBe('!');
  });

  it('uses a non-breaking space for whitespace characters', () => {
    const { container } = render(<SplitText>a b</SplitText>);
    const spans = container.querySelectorAll('[data-char]');
    expect(spans).toHaveLength(3);
    expect(spans[1]?.textContent).toBe('\u00A0');
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npm run test -- SplitText
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/components/motion/SplitText.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';

type Props = { children: string; className?: string; delay?: number };

export function SplitText({ children, className, delay = 0 }: Props) {
  const chars = Array.from(children);
  return (
    <span className={className} aria-label={children}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          data-char
          aria-hidden="true"
          initial={{ opacity: 0, y: '0.4em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm run test -- SplitText
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/SplitText.tsx src/components/motion/SplitText.test.tsx
git commit -m "feat: SplitText letter-reveal primitive"
```

---

### Task 18: Parallax motion primitive — test first

**Files:**
- Create: `src/components/motion/Parallax.test.tsx`, `src/components/motion/Parallax.tsx`

- [ ] **Step 1: Write failing test `src/components/motion/Parallax.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Parallax } from './Parallax';

describe('Parallax', () => {
  it('renders its children inside a wrapper', () => {
    render(
      <Parallax speed={0.15}>
        <span>content</span>
      </Parallax>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npm run test -- Parallax
```
Expected: FAIL.

- [ ] **Step 3: Create `src/components/motion/Parallax.tsx`**

```tsx
'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = 0.15, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm run test -- Parallax
```

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/Parallax.tsx src/components/motion/Parallax.test.tsx
git commit -m "feat: Parallax scroll-transform primitive"
```

---

### Task 19: Copy-to-clipboard utility — test first

**Files:**
- Create: `src/lib/copy.test.ts`, `src/lib/copy.ts`

- [ ] **Step 1: Write failing test `src/lib/copy.test.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyText } from './copy';

describe('copyText', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn(async () => {}) },
    });
  });

  it('writes the text to the clipboard and resolves true', async () => {
    const ok = await copyText('hello@example.com');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello@example.com');
    expect(ok).toBe(true);
  });

  it('resolves false when the clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', {});
    const ok = await copyText('x');
    expect(ok).toBe(false);
  });

  it('resolves false if writeText rejects', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn(async () => { throw new Error('denied'); }) },
    });
    const ok = await copyText('x');
    expect(ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm run test -- copy
```

- [ ] **Step 3: Create `src/lib/copy.ts`**

```ts
export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator === 'undefined') return false;
    const clip = (navigator as Navigator & { clipboard?: Clipboard }).clipboard;
    if (!clip?.writeText) return false;
    await clip.writeText(text);
    return true;
  } catch {
    return false;
  }
}
```

- [ ] **Step 4: Run — expect 3 passing**

```bash
npm run test -- copy
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/copy.ts src/lib/copy.test.ts
git commit -m "feat: copyText utility with graceful fallback"
```

---

### Task 20: Nav component

**Files:**
- Create: `src/components/layout/Nav.tsx`, `src/components/layout/Nav.test.tsx`

- [ ] **Step 1: Write failing test `src/components/layout/Nav.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders brand and anchor links', () => {
    render(<Nav />);
    expect(screen.getByText(/A\.Leach/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/#about');
    expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('href', '/#experience');
    expect(screen.getByRole('link', { name: /open source/i })).toHaveAttribute(
      'href',
      '/#open-source',
    );
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/#contact');
  });
});
```

- [ ] **Step 2: Run — expect fail**

```bash
npm run test -- Nav
```

- [ ] **Step 3: Create `src/components/layout/Nav.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Nav() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[color:var(--color-ink)]/70 border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tighter">
          A.Leach
        </Link>
        <ul className="hidden md:flex gap-8 label-mono">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#experience">Work</Link></li>
          <li><Link href="/#open-source">Open Source</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
      </div>
      <div
        className="h-px bg-[color:var(--color-paper)] origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </nav>
  );
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm run test -- Nav
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Nav.tsx src/components/layout/Nav.test.tsx
git commit -m "feat: sticky Nav with scroll-progress bar"
```

---

### Task 21: Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/layout/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] py-10 label-mono">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-4 px-6">
        <span>© {new Date().getFullYear()} Andrew Leach</span>
        <div className="flex gap-6">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/andrew-b-leach/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="/resume.pdf" download>Resume</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: Footer with socials and resume download"
```

---

## Phase 4 — Content data & homepage sections

### Task 22: Define experience + project content data

**Files:**
- Create: `src/content/experience.ts`, `src/content/projects.ts`

- [ ] **Step 1: Create `src/content/experience.ts`**

```ts
export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;   // ISO YYYY-MM
  end: string | 'present';
  location: string;
  stack: string[];
  summary: string;
  featured: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    company: 'Wastequip',
    role: 'Lead Software Engineer',
    start: '2022-04',
    end: 'present',
    location: 'Charlotte, NC',
    stack: ['React', 'PHP', 'Laravel', 'Inertia', 'AWS', 'Terraform', 'ECS'],
    summary:
      'Leading the Wasteware inventory platform and all AWS infrastructure — codified infra in Terraform and built the deployment pipeline.',
    featured: true,
  },
  {
    company: 'Better Car People',
    role: 'Senior Software Developer',
    start: '2019-11',
    end: '2022-06',
    location: 'Remote',
    stack: ['PHP', 'Laravel', 'TypeScript', 'Vue', 'Angular', 'Twilio'],
    summary:
      'Architected the contact-center suite powering hundreds of dealerships.',
    featured: true,
  },
  {
    company: 'Better Car People',
    role: 'Web Developer',
    start: '2017-02',
    end: '2019-11',
    location: 'Remote',
    stack: ['PHP', 'JavaScript'],
    summary: 'Front-of-house product work on the pre-contact-center stack.',
    featured: false,
  },
  {
    company: 'Big Ring',
    role: 'Web Developer',
    start: '2014-06',
    end: '2017-01',
    location: 'Monroe, NC',
    stack: ['PHP', 'WordPress', 'HTML/CSS'],
    summary: 'Agency work — dynamic WordPress themes and HTML builds.',
    featured: false,
  },
];

export const education = {
  school: 'University of North Carolina at Charlotte',
  degree: "Bachelor's Degree, Computer Science, Software and Info Systems",
  years: '2009–2015',
};
```

- [ ] **Step 2: Create `src/content/projects.ts`**

```ts
export type ProjectEntry = {
  slug: 'visualizations' | 'workflowable';
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  year: number;
  license: 'MIT';
  links: {
    github?: string;
    packagist?: string;
    docs?: string;
  };
};

export const projects: ProjectEntry[] = [
  {
    slug: 'visualizations',
    name: 'Visualizations',
    tagline: 'Data visualizations for Laravel.',
    description:
      'DataGrids and Charts as PHP classes, with auto filtering, sorting, and pagination. Renders into Blade or Inertia.',
    stack: ['Laravel', 'PHP 8.x', 'Inertia', 'Blade'],
    year: 2024,
    license: 'MIT',
    links: {
      docs: 'https://trysettleup.com',
    },
  },
  {
    slug: 'workflowable',
    name: 'Workflowable',
    tagline: 'Event-driven workflow engine for Laravel.',
    description:
      'JSON-defined workflows with a full audit trail via event sourcing. Replayable, conditional transitions, framework-native.',
    stack: ['Laravel', 'PHP 8.x', 'Event Sourcing'],
    year: 2024,
    license: 'MIT',
    links: {
      docs: 'https://trysettleup.com',
    },
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/content/experience.ts src/content/projects.ts
git commit -m "feat: seed experience and projects content data"
```

---

### Task 23: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```tsx
import { Picture } from '@/components/Picture';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="grain" />
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 px-6 pt-32 pb-24 items-center">
        <div>
          <p className="label-mono mb-6">01 — Andrew Leach</p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tightest">
            <SplitText>Andrew</SplitText>
            <br />
            <SplitText delay={0.15}>Leach.</SplitText>
          </h1>
          <p className="mt-8 label-mono">Lead Software Engineer · Charlotte, NC</p>
          <p className="mt-6 max-w-md text-[color:var(--color-paper)]/80 leading-relaxed">
            I build inventory, workflow, and contact-center systems with React, Laravel, and AWS.
          </p>
        </div>
        <Parallax speed={0.12}>
          <Picture
            name="portrait"
            alt="Andrew Leach, looking out across the ocean"
            priority
            className="w-full h-auto grayscale"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Parallax>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 label-mono">↓ Scroll</div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero section with parallax portrait and letter reveal"
```

---

### Task 24: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create `src/components/sections/About.tsx`**

```tsx
import { FadeUp } from '@/components/motion/FadeUp';

export function About() {
  return (
    <section id="about" className="py-32 border-t border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-2xl px-6">
        <p className="label-mono mb-6">02 — About</p>
        <div className="space-y-6 font-display text-xl md:text-2xl leading-snug text-[color:var(--color-paper)]/90">
          <FadeUp>
            <p>
              I lead application teams building web platforms that have to hold up under real
              operational load — inventory systems, contact centers, workflow engines.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p>
              My work sits between architecture and execution: I draw the shape of a system, then
              ship it with the team. React and Laravel on the surface; Terraform, ECS, and
              event-sourcing under it.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p>
              Lately I'm focused on workflow orchestration, OIDC-based identity, and pragmatic
              AI tooling for engineering teams.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: About section with staggered fade-ups"
```

---

### Task 25: Experience section

**Files:**
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: Create `src/components/sections/Experience.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { FadeUp } from '@/components/motion/FadeUp';
import { experience, education, type ExperienceEntry } from '@/content/experience';

function formatRange(start: string, end: string | 'present') {
  const s = start.replace('-', '.');
  const e = end === 'present' ? 'Present' : end.replace('-', '.');
  return `${s} — ${e}`;
}

function Entry({ entry }: { entry: ExperienceEntry }) {
  return (
    <FadeUp className="relative pl-8 pb-12 last:pb-0 border-l border-[color:var(--color-rule)]">
      <span className="absolute left-[-5px] top-1 block h-[10px] w-[10px] rounded-full bg-[color:var(--color-paper)]" />
      <p className="label-mono">{formatRange(entry.start, entry.end)}</p>
      <h3 className="mt-2 font-display text-3xl tracking-tighter">{entry.role}</h3>
      <p className="mt-1 text-[color:var(--color-mute)]">
        {entry.company} · {entry.location}
      </p>
      <p className="mt-4 max-w-2xl text-[color:var(--color-paper)]/85 leading-relaxed">
        {entry.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2 label-mono">
        {entry.stack.map((s) => (
          <li
            key={s}
            className="border border-[color:var(--color-rule)] px-2 py-1 rounded-sm"
          >
            {s}
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}

export function Experience() {
  const [showEarlier, setShowEarlier] = useState(false);
  const featured = experience.filter((e) => e.featured);
  const earlier = experience.filter((e) => !e.featured);

  return (
    <section id="experience" className="py-32 border-t border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-3xl px-6">
        <p className="label-mono mb-10">03 — Experience</p>
        {featured.map((e) => (
          <Entry key={`${e.company}-${e.start}`} entry={e} />
        ))}

        {showEarlier &&
          earlier.map((e) => <Entry key={`${e.company}-${e.start}`} entry={e} />)}

        {!showEarlier && earlier.length > 0 && (
          <button
            type="button"
            onClick={() => setShowEarlier(true)}
            className="label-mono underline underline-offset-4 hover:text-[color:var(--color-paper)]"
          >
            Show earlier roles →
          </button>
        )}

        <div className="mt-16 pt-8 border-t border-[color:var(--color-rule)]">
          <p className="label-mono mb-2">Education</p>
          <p className="font-display text-xl">{education.school}</p>
          <p className="text-[color:var(--color-mute)]">
            {education.degree} · {education.years}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: Experience timeline with collapsible earlier roles"
```

---

### Task 26: OpenSource section

**Files:**
- Create: `src/components/sections/OpenSource.tsx`

- [ ] **Step 1: Create `src/components/sections/OpenSource.tsx`**

```tsx
import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { projects } from '@/content/projects';

export function OpenSource() {
  return (
    <section id="open-source" className="py-32 border-t border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-10">04 — Open Source · trysettleup.com</p>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <FadeUp key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full border border-[color:var(--color-rule)] p-8 transition-colors hover:border-[color:var(--color-paper)]"
              >
                <p className="label-mono">{p.license} · {p.year}</p>
                <h3 className="mt-4 font-display text-4xl tracking-tighter">{p.name}</h3>
                <p className="mt-3 text-[color:var(--color-paper)]/80">{p.tagline}</p>
                <p className="mt-4 text-[color:var(--color-mute)] leading-relaxed">
                  {p.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 label-mono">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="border border-[color:var(--color-rule)] px-2 py-1 rounded-sm group-hover:border-[color:var(--color-paper)] transition-colors"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 label-mono">Read case study →</p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/OpenSource.tsx
git commit -m "feat: OpenSource section with project cards"
```

---

### Task 27: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create `src/components/sections/Contact.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { copyText } from '@/lib/copy';

const EMAIL = 'andrew@leachcreative.com';

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyText(EMAIL);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section
      id="contact"
      className="py-40 border-t border-[color:var(--color-rule)] text-center"
    >
      <div className="mx-auto max-w-3xl px-6">
        <p className="label-mono mb-8">05 — Contact</p>
        <h2 className="font-display text-6xl md:text-8xl tracking-tightest">Let's talk.</h2>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            type="button"
            onClick={onCopy}
            aria-label={`Copy email ${EMAIL}`}
            className="label-mono border border-[color:var(--color-rule)] px-4 py-3 hover:border-[color:var(--color-paper)] transition-colors"
          >
            {copied ? 'Copied ✓' : EMAIL}
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="label-mono border border-[color:var(--color-paper)] px-4 py-3 bg-[color:var(--color-paper)] text-[color:var(--color-ink)]"
          >
            Send email →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: Contact section with copy-email + mailto"
```

---

### Task 28: Wire the homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { OpenSource } from '@/components/sections/OpenSource';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <OpenSource />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose homepage scroll narrative"
```

---

## Phase 5 — Project case-study pages

### Task 29: MDX components mapping

**Files:**
- Create: `src/mdx-components.tsx`

- [ ] **Step 1: Create `src/mdx-components.tsx`**

```tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-display text-5xl tracking-tightest mt-12 mb-6"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-display text-3xl tracking-tighter mt-10 mb-4"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-display text-2xl tracking-tighter mt-8 mb-3"
        {...props}
      />
    ),
    p: (props) => (
      <p className="my-4 leading-relaxed text-[color:var(--color-paper)]/85" {...props} />
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6 space-y-1" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6 space-y-1" {...props} />,
    a: (props) => (
      <a
        className="underline underline-offset-4 hover:text-[color:var(--color-paper)]"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="font-mono text-[0.9em] px-1 py-0.5 rounded bg-[color:var(--color-rule)]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-md border border-[color:var(--color-rule)] p-4 text-sm font-mono"
        {...props}
      />
    ),
    ...components,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/mdx-components.tsx
git commit -m "feat: MDX component mapping with themed typography"
```

---

### Task 30: ProjectHero component

**Files:**
- Create: `src/components/project/ProjectHero.tsx`

- [ ] **Step 1: Create `src/components/project/ProjectHero.tsx`**

```tsx
import Link from 'next/link';
import { SplitText } from '@/components/motion/SplitText';
import type { ProjectEntry } from '@/content/projects';

export function ProjectHero({ project }: { project: ProjectEntry }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 border-b border-[color:var(--color-rule)]">
      <div className="grain" />
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/#open-source" className="label-mono">← All projects</Link>
        <p className="label-mono mt-8">Open Source · {project.license} · {project.year}</p>
        <h1 className="mt-4 font-display text-6xl md:text-7xl leading-[0.9] tracking-tightest">
          <SplitText>{project.name}</SplitText>
        </h1>
        <p className="mt-6 text-xl text-[color:var(--color-paper)]/85 max-w-2xl">
          {project.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 label-mono">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          )}
          {project.links.packagist && (
            <a href={project.links.packagist} target="_blank" rel="noreferrer">Packagist ↗</a>
          )}
          {project.links.docs && (
            <a href={project.links.docs} target="_blank" rel="noreferrer">Docs ↗</a>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project/ProjectHero.tsx
git commit -m "feat: ProjectHero component for case-study pages"
```

---

### Task 31: Projects layout

**Files:**
- Create: `src/app/projects/layout.tsx`

- [ ] **Step 1: Create `src/app/projects/layout.tsx`**

```tsx
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-4xl px-6 pb-24">{children}</div>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/layout.tsx
git commit -m "feat: shared layout for /projects/*"
```

---

### Task 32: Visualizations case-study page

**Files:**
- Create: `src/app/projects/visualizations/page.tsx`, `src/app/projects/visualizations/content.mdx`

- [ ] **Step 1: Create `src/app/projects/visualizations/content.mdx`**

```mdx
## Overview

Every Laravel app eventually rebuilds tables and charts from scratch — column definitions, filters, sorting, pagination, rendering. **Visualizations** makes those first-class citizens of your domain model: a DataGrid or Chart is a PHP class with a query and columns, and rendering is someone else's problem.

## Capabilities

### Declarative DataGrids
Subclass `DataGrid`, declare columns, point it at an Eloquent query. Filtering, sorting, and pagination come along automatically.

### Chart classes
Same idea for aggregations. Your controller hands back a chart class; the renderer decides whether that's Chart.js in Inertia or a blade partial.

### Inertia & Blade rendering
Bring your own stack. The package doesn't assume React, Vue, or Livewire.

### Zero vendor lock-in
MIT, Packagist-distributed, no SaaS behind it.

## A DataGrid, start to finish

{/* TODO: paste the real Visualizations example from the package README */}

```php
class OrdersGrid extends DataGrid
{
    protected function columns(): array
    {
        return [
            Column::make('id')->sortable(),
            Column::make('customer.name')->searchable(),
            Column::make('total')->sortable()->format(fn ($o) => money($o->total)),
            Column::make('created_at')->sortable()->label('Placed'),
        ];
    }

    protected function query(): Builder
    {
        return Order::query()->with('customer');
    }
}
```

## Architecture

`DataGrid` composes a `QueryBuilder` → `Paginator` → `Renderer`. Filters and sort order arrive as request params, get normalized, applied to the query, and handed off to the renderer. Every step is overridable; nothing is final.

{/* TODO: insert the architecture SVG once drawn */}
```

- [ ] **Step 2: Create `src/app/projects/visualizations/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { ProjectHero } from '@/components/project/ProjectHero';
import { projects } from '@/content/projects';
import Content from './content.mdx';

const project = projects.find((p) => p.slug === 'visualizations')!;

export const metadata: Metadata = {
  title: project.name,
  description: project.tagline,
};

export default function Page() {
  return (
    <>
      <ProjectHero project={project} />
      <article className="prose-invert mt-12">
        <Content />
      </article>
      <nav className="mt-20 flex justify-between label-mono">
        <span />
        <a href="/projects/workflowable/">Next: Workflowable →</a>
      </nav>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: `out/projects/visualizations/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/visualizations
git commit -m "feat: Visualizations case-study page with starter MDX"
```

---

### Task 33: Workflowable case-study page

**Files:**
- Create: `src/app/projects/workflowable/page.tsx`, `src/app/projects/workflowable/content.mdx`

- [ ] **Step 1: Create `src/app/projects/workflowable/content.mdx`**

```mdx
## Overview

Business processes in Laravel apps sprawl. A state flag here, a job there, a listener somewhere else — nobody can reconstruct how an entity got to its current state. **Workflowable** collapses that into a single event-driven engine: workflows live as JSON, transitions are events, history is a first-class artifact.

## Capabilities

### JSON-defined workflows
Describe states, transitions, and guards declaratively. Version them alongside your migrations.

### Event-sourced audit trail
Every transition emits an event. Replay the event stream to reconstruct any entity's state at any point in time.

### Conditional transitions
Guards are closures or invokables — arbitrary PHP with access to the entity and context.

### Replayable state
Debugging a "how did we get here" bug is `->replay()` away.

## A workflow definition

{/* TODO: paste the real workflow JSON + controller snippet from the package */}

```json
{
  "name": "order_fulfillment",
  "initial": "pending",
  "states": ["pending", "shipped", "delivered", "cancelled"],
  "transitions": [
    { "from": "pending", "to": "shipped", "event": "ship" },
    { "from": "shipped", "to": "delivered", "event": "deliver" },
    { "from": "pending", "to": "cancelled", "event": "cancel" }
  ]
}
```

```php
public function ship(Order $order): RedirectResponse
{
    $order->workflow('order_fulfillment')->dispatch('ship');
    return back();
}
```

## Architecture

`Workflow` wraps a subject and a definition. A `Transition` writes to the event store and applies the resulting state. Reads hydrate from the store; writes append to it. Projections are optional — the event store is the source of truth.

{/* TODO: insert architecture SVG */}
```

- [ ] **Step 2: Create `src/app/projects/workflowable/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { ProjectHero } from '@/components/project/ProjectHero';
import { projects } from '@/content/projects';
import Content from './content.mdx';

const project = projects.find((p) => p.slug === 'workflowable')!;

export const metadata: Metadata = {
  title: project.name,
  description: project.tagline,
};

export default function Page() {
  return (
    <>
      <ProjectHero project={project} />
      <article className="prose-invert mt-12">
        <Content />
      </article>
      <nav className="mt-20 flex justify-between label-mono">
        <a href="/projects/visualizations/">← Previous: Visualizations</a>
        <span />
      </nav>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/workflowable
git commit -m "feat: Workflowable case-study page with starter MDX"
```

---

## Phase 6 — Polish, SEO, edge cases

### Task 34: not-found page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="label-mono">404</p>
        <h1 className="mt-4 font-display text-6xl tracking-tightest">Not here.</h1>
        <Link
          href="/"
          className="mt-10 inline-block label-mono underline underline-offset-4"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: cinematic 404 page"
```

---

### Task 35: next-sitemap config

**Files:**
- Create: `next-sitemap.config.mjs`

- [ ] **Step 1: Create `next-sitemap.config.mjs`**

```js
/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://leachcreative.com',
  generateRobotsTxt: true,
  outDir: './out',
  sitemapSize: 5000,
};
```

- [ ] **Step 2: Verify postbuild runs**

```bash
npm run build
```
Expected: `out/sitemap.xml` and `out/robots.txt` present.

- [ ] **Step 3: Commit**

```bash
git add next-sitemap.config.mjs
git commit -m "feat: generate sitemap.xml and robots.txt at build"
```

---

### Task 36: OG image and per-page metadata polish

**Files:**
- Create: `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`

- [ ] **Step 1: Create `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Andrew Leach — Lead Software Engineer';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0a',
          color: '#f5f5f0',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8a88' }}>
          leachcreative.com
        </div>
        <div>
          <div style={{ fontSize: 140, lineHeight: 1, letterSpacing: '-0.03em' }}>
            Andrew Leach.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: '#8a8a88' }}>
            Lead Software Engineer · Charlotte, NC
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: Create `src/app/twitter-image.tsx`** (reuses the OG at 1200×630 — Twitter accepts it)

```tsx
export { default, size, contentType, alt } from './opengraph-image';
```

- [ ] **Step 3: Verify build emits the images**

```bash
npm run build
```
Expected: `out/opengraph-image.png` and `out/twitter-image.png` (file names follow Next's convention).

- [ ] **Step 4: Commit**

```bash
git add src/app/opengraph-image.tsx src/app/twitter-image.tsx
git commit -m "feat: generate OG + Twitter card images"
```

---

### Task 37: Owner-supplied assets (placeholders + README note)

**Files:**
- Create: `public/images/portrait.placeholder.txt`, `public/resume.placeholder.txt`, `README.md`

- [ ] **Step 1: Create placeholder note `public/images/portrait.placeholder.txt`**

```
Replace this file with portrait.jpg (the B&W beach photo).
Recommended: 1600×1600 JPG, progressive, ~85% quality.
After dropping portrait.jpg in this folder, run `npm run prebuild` to regenerate manifest.json and portrait.webp.
```

- [ ] **Step 2: Create placeholder note `public/resume.placeholder.txt`**

```
Drop resume.pdf in the public/ folder. It will be served at /resume.pdf.
```

- [ ] **Step 3: Create `README.md`**

```markdown
# leach-resume-site

Personal site for Andrew Leach at https://leachcreative.com.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run ci       # typecheck + lint + format + test + build
```

Static output lands in `out/`.

## Owner-supplied assets

Before first real deploy:

1. Drop `public/images/portrait.jpg` (1600×1600 JPG, B&W).
2. Drop `public/resume.pdf`.
3. Run `npm run prebuild` once locally (CI does this automatically).

## Deploy

`main` push triggers `.github/workflows/deploy.yml`, which builds and deploys
to GitHub Pages. First-time setup:

1. In repo Settings → Pages, set **Source: GitHub Actions**.
2. Point DNS:
   - A `leachcreative.com` → `185.199.108.153`, `.154`, `.155`, `.156`
   - CNAME `www` → `<github-username>.github.io`
3. In Settings → Pages, set the custom domain to `leachcreative.com` and
   enforce HTTPS after Let's Encrypt provisions.

## Docs

- Design: [`docs/superpowers/specs/2026-04-16-leach-resume-site-design.md`](docs/superpowers/specs/2026-04-16-leach-resume-site-design.md)
- Plan: [`docs/superpowers/plans/2026-04-16-leach-resume-site.md`](docs/superpowers/plans/2026-04-16-leach-resume-site.md)
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: README + placeholder notes for owner-supplied assets"
```

---

### Task 38: Final CI dry run

- [ ] **Step 1: Run the full CI script locally**

```bash
npm run ci
```
Expected: typecheck, lint, format:check, vitest, and build all pass. `out/` contains:
- `index.html`
- `projects/visualizations/index.html`
- `projects/workflowable/index.html`
- `sitemap.xml`
- `robots.txt`
- `CNAME`
- `.nojekyll`
- `opengraph-image.png`

- [ ] **Step 2: Serve `out/` locally and spot-check**

```bash
npx serve out
```
Open `http://localhost:3000` (or whatever port serve reports). Click through homepage sections, the two project pages, and the 404 (visit a bogus URL). Confirm scroll motion feels right; confirm `/#contact` anchors scroll smoothly.

- [ ] **Step 3: Commit (no-op likely, but catch any format drift)**

```bash
git status
# if clean, skip; otherwise:
npm run format && git add -A && git commit -m "chore: format drift"
```

---

### Task 39: First deploy

- [ ] **Step 1 (owner manual step): Create the GitHub repo**

Name: `leach-resume-site`. Public. Do not initialize with README (we already have one).

- [ ] **Step 2: Push**

```bash
git remote add origin git@github.com:<github-username>/leach-resume-site.git
git push -u origin main
```

- [ ] **Step 3: Enable Pages**

In repo Settings → Pages, set **Source: GitHub Actions**. Save.

- [ ] **Step 4: Watch the workflow**

```bash
gh run watch
```
Expected: `build` → `deploy` succeed. Site is temporarily available at `<username>.github.io/leach-resume-site/` OR at `leachcreative.com` once DNS resolves.

- [ ] **Step 5 (owner manual step): Configure DNS**

At DNS provider for `leachcreative.com`:
- A `@` → `185.199.108.153`
- A `@` → `185.199.108.154`
- A `@` → `185.199.108.155`
- A `@` → `185.199.108.156`
- CNAME `www` → `<github-username>.github.io`

- [ ] **Step 6: Enforce HTTPS**

In repo Settings → Pages, wait for "DNS check successful", then check "Enforce HTTPS".

- [ ] **Step 7: Smoke test**

Visit `https://leachcreative.com/`. Verify:
- Homepage renders, scroll narrative plays
- `/projects/visualizations/` and `/projects/workflowable/` load
- 404 page loads for `/nonexistent/`
- Contact email copies on click
- Resume download works once `public/resume.pdf` is in place

---

## Phase 7 — Owner follow-ups (not required for first deploy)

These are documented in the spec's "Open questions / owner to-dos" and should be handled when ready:

- Replace `portrait.placeholder.txt` with the real `portrait.jpg`
- Replace `resume.placeholder.txt` with the real `resume.pdf`
- Replace every `{/* TODO: ... */}` in the two MDX files with the real package code samples, architecture diagrams, and any benchmarks worth citing
- Review the Wastequip impact line for proprietary-detail leakage
- Add GitHub and Packagist URLs to `src/content/projects.ts` once repos are public
- Decide on analytics (Vercel Analytics, Plausible, none) and add if wanted
