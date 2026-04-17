import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-24">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="hero-glow absolute inset-0" aria-hidden="true" />
      <div className="relative text-center">
        <span className="badge-pill">404 · Not found</span>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-7xl">
          This page doesn&apos;t exist <span className="text-gradient">yet</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-[color:var(--color-secondary)]">
          The link may be wrong, the page may have moved, or it may be something I haven&apos;t
          shipped yet.
        </p>
        <Link href="/" className="cta-primary group mt-10">
          Back to home
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
        </Link>
      </div>
    </section>
  );
}
