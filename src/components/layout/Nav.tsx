'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Wordmark } from './Wordmark';

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
    <nav
      className="sticky top-0 z-40 w-full border-b border-[color:var(--color-rule)]/60 bg-[color:var(--color-bg)]/80 backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center text-[color:var(--color-fg)]"
          aria-label="Andrew Leach — home"
        >
          <Wordmark height={24} />
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-[color:var(--color-secondary)] md:flex">
          <li>
            <Link href="/#about" className="transition-colors hover:text-[color:var(--color-fg)]">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#experience"
              className="transition-colors hover:text-[color:var(--color-fg)]"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/#open-source"
              className="transition-colors hover:text-[color:var(--color-fg)]"
            >
              Open Source
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="transition-colors hover:text-[color:var(--color-fg)]">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className="hidden h-9 items-center gap-2 rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-elevated)] px-3 text-sm font-medium text-[color:var(--color-fg)] transition-colors hover:border-[color:var(--color-accent-secondary)] sm:inline-flex"
          >
            Resume
          </a>
        </div>
      </div>

      <div
        className="h-px origin-left bg-gradient-to-r from-[color:var(--color-accent-secondary)] to-[color:var(--color-accent)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </nav>
  );
}
