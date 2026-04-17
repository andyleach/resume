import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { projects, type ProjectEntry } from '@/content/projects';

function ChartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
      <path d="M7 11v2a2 2 0 0 0 2 2h2" />
      <path d="M17 11V9a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-[color:var(--color-muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--color-fg)]"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  const Icon = project.slug === 'visualizations' ? ChartIcon : WorkflowIcon;
  return (
    <FadeUp className="group relative">
      <div className="card-surface relative flex h-full flex-col overflow-hidden p-8">
        {/* Full-card click target for the case study. Inner <a>s use z-20 so
            they intercept their own clicks. */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${project.name} case study`}
          className="absolute inset-0 z-10"
        />
        <div className="pointer-events-none relative flex items-center justify-between">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-accent-secondary)]/30 bg-[color-mix(in_oklab,var(--color-accent-secondary)_12%,transparent)] text-[color:var(--color-accent-secondary)]">
            <Icon />
          </div>
          <ArrowUpRight />
        </div>
        <h3 className="pointer-events-none relative mt-6 text-2xl font-bold tracking-tight text-[color:var(--color-fg)]">
          {project.name}
        </h3>
        <p className="pointer-events-none relative mt-1 text-sm font-medium text-[color:var(--color-muted)]">
          {project.tagline}
        </p>
        <p className="pointer-events-none relative mt-4 text-[color:var(--color-secondary)]">
          {project.description}
        </p>

        <ul className="pointer-events-none relative mt-6 grid gap-2 text-sm text-[color:var(--color-secondary)] sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent-secondary)]" />
              {f}
            </li>
          ))}
        </ul>

        <div className="terminal-block pointer-events-none relative mt-8">
          <span className="prompt">$ </span>
          {project.install}
        </div>

        <div className="relative z-20 mt-auto pt-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] px-3 text-sm font-medium text-[color:var(--color-fg)] transition-colors hover:border-[color:var(--color-accent-secondary)]"
              >
                GitHub
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] px-3 text-sm font-medium text-[color:var(--color-fg)] transition-colors hover:border-[color:var(--color-accent-secondary)]"
              >
                Docs
              </a>
            )}
            <span className="ml-auto text-xs font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
              {project.license} · {project.year}
            </span>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

export function OpenSource() {
  return (
    <section id="open-source" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge-pill">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16.5 9.4 7.55 4.24" />
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            Open source · trysettleup.com
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-5xl">
            Packages, in the open.
          </h2>
          <p className="mt-4 text-lg text-[color:var(--color-secondary)]">
            Install from Packagist. Read the source on GitHub. Fork, patch, and ship on your own
            terms.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
