'use client';

import { useState } from 'react';
import { copyText } from '@/lib/copy';
import { RESUME_DOWNLOAD_NAME, RESUME_URL } from '@/lib/resume';

const EMAIL = 'midge-rockery9c@icloud.com';

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

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
      className="relative border-t border-[color:var(--color-rule)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-rule)] bg-[color:var(--color-elevated)] p-10 text-center shadow-[0_24px_60px_-24px_rgba(14,165,233,0.25)] sm:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-br from-[color:var(--color-accent-secondary)]/15 via-transparent to-[color:var(--color-accent)]/15 blur-3xl"
          />
          <div className="relative">
            <span className="badge-pill">Get in touch</span>
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-6xl">
              Let&apos;s build something <span className="text-gradient">worth keeping</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[color:var(--color-secondary)]">
              Hiring, consulting, or just want to trade notes on Laravel, React, or workflow
              engines? Drop a line.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`mailto:${EMAIL}`} className="cta-primary group">
                {EMAIL}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <button
                type="button"
                onClick={onCopy}
                aria-label={`Copy ${EMAIL} to clipboard`}
                className="cta-secondary"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
              <a
                href="https://www.linkedin.com/in/andrew-b-leach/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[color:var(--color-fg)]"
              >
                LinkedIn
              </a>
              <span className="dot-sep" />
              <a
                href="https://github.com/andyleach"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[color:var(--color-fg)]"
              >
                GitHub
              </a>
              <span className="dot-sep" />
              <a
                href={RESUME_URL}
                download={RESUME_DOWNLOAD_NAME}
                className="transition-colors hover:text-[color:var(--color-fg)]"
              >
                Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
