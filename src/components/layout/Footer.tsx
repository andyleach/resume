import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-elevated)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <Wordmark height={22} className="text-[color:var(--color-fg)]" />
          <span className="text-xs text-[color:var(--color-secondary)]">
            © {new Date().getFullYear()} · Charlotte, NC
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
          <a
            href="https://github.com/andyleach"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[color:var(--color-fg)]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-b-leach/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[color:var(--color-fg)]"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            download
            className="transition-colors hover:text-[color:var(--color-fg)]"
          >
            Resume
          </a>
          <a
            href="mailto:midge-rockery9c@icloud.com"
            className="transition-colors hover:text-[color:var(--color-fg)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
