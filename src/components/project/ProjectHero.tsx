import Link from 'next/link';
import type { ProjectEntry } from '@/content/projects';

export function ProjectHero({ project }: { project: ProjectEntry }) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-rule)] pt-24 pb-16 sm:pt-32">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="hero-glow absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6">
        <Link
          href="/#open-source"
          className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-secondary)] transition-colors hover:text-[color:var(--color-fg)]"
        >
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
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          All projects
        </Link>

        <div className="mt-8">
          <span className="badge-pill">
            Open source · {project.license} · {project.year}
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-6xl md:text-7xl">
          {project.name}
        </h1>
        <p className="mt-4 text-lg text-[color:var(--color-accent-text)] sm:text-xl">
          {project.tagline}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-secondary)]">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="cta-secondary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.58.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                />
              </svg>
              GitHub
            </a>
          )}
          {project.links.docs && (
            <a href={project.links.docs} target="_blank" rel="noreferrer" className="cta-secondary">
              <svg
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
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              Docs
            </a>
          )}
          {project.links.packagist && (
            <a
              href={project.links.packagist}
              target="_blank"
              rel="noreferrer"
              className="cta-secondary"
            >
              Packagist
            </a>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
          {project.stack.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-6">
              <span>{s}</span>
              {i < project.stack.length - 1 && <span className="dot-sep" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
