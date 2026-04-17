'use client';

import { useState } from 'react';
import { FadeUp } from '@/components/motion/FadeUp';
import { experience, education, type ExperienceEntry } from '@/content/experience';

function formatRange(start: string, end: string | 'present') {
  function pretty(iso: string) {
    const [y, m] = iso.split('-');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const mi = Math.max(0, Math.min(11, parseInt(m ?? '1', 10) - 1));
    return `${months[mi]} ${y}`;
  }
  const s = pretty(start);
  const e = end === 'present' ? 'Present' : pretty(end);
  return `${s} — ${e}`;
}

function Entry({ entry, featured }: { entry: ExperienceEntry; featured: boolean }) {
  return (
    <FadeUp className="relative pb-10 pl-10 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 block h-3 w-3 rounded-full border-2 border-[color:var(--color-bg)] bg-gradient-to-br from-[color:var(--color-accent-secondary)] to-[color:var(--color-accent)] shadow-[0_0_0_2px_var(--color-rule)]"
      />
      <span
        aria-hidden="true"
        className="absolute top-4 bottom-0 left-[5px] w-px bg-[color:var(--color-rule)]"
      />
      <p className="text-xs font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
        {formatRange(entry.start, entry.end)}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight text-[color:var(--color-fg)]">
          {entry.role}
        </h3>
        <span className="text-sm text-[color:var(--color-secondary)]">
          {entry.company} · {entry.location}
        </span>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-[color:var(--color-secondary)]">
        {entry.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {entry.stack.map((s) => (
          <li
            key={s}
            className={
              featured
                ? 'inline-flex items-center rounded-md border border-[color:var(--color-accent)]/20 bg-[color-mix(in_oklab,var(--color-accent)_8%,transparent)] px-2 py-0.5 text-xs font-medium text-[color:var(--color-accent-text)]'
                : 'inline-flex items-center rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-elevated)] px-2 py-0.5 text-xs font-medium text-[color:var(--color-secondary)]'
            }
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
    <section
      id="experience"
      className="relative border-t border-[color:var(--color-rule)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge-pill">Experience</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-5xl">
            A decade of application work.
          </h2>
        </div>

        <div className="mt-16">
          {featured.map((e) => (
            <Entry key={`${e.company}-${e.start}`} entry={e} featured />
          ))}

          {showEarlier &&
            earlier.map((e) => (
              <Entry key={`${e.company}-${e.start}`} entry={e} featured={false} />
            ))}

          {!showEarlier && earlier.length > 0 && (
            <div className="mt-2 pl-10">
              <button
                type="button"
                onClick={() => setShowEarlier(true)}
                className="cta-secondary h-9 text-xs"
              >
                Show earlier roles
              </button>
            </div>
          )}
        </div>

        <div className="mt-16 rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-elevated)] p-8">
          <p className="text-xs font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
            Education
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--color-fg)]">
            {education.school}
          </p>
          <p className="text-[color:var(--color-secondary)]">
            {education.degree} · {education.years}
          </p>
        </div>
      </div>
    </section>
  );
}
