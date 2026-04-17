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
