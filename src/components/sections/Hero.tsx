import { Picture } from '@/components/Picture';
import { Parallax } from '@/components/motion/Parallax';

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="hero-glow absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div>
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
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Available for senior &amp; lead roles
            </span>

            <h1 className="mt-5 text-3xl leading-[0.95] font-extrabold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-4xl md:text-5xl">
              Andrew Leach.
            </h1>
            <p className="text-gradient mt-0.5 pb-1 text-xl leading-[1.1] font-extrabold tracking-tight sm:text-2xl md:text-3xl">
              Lead Software Engineer.
            </p>

            <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-[color:var(--color-secondary)]">
              Building production-grade systems with React, Laravel, and AWS in Charlotte, NC.
            </p>

            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a href="#open-source" className="cta-primary group">
                View open source
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
              <a href="mailto:midge-rockery9c@icloud.com" className="cta-secondary">
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Get in touch
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium tracking-widest text-[color:var(--color-muted)] uppercase">
              <span>React · Laravel</span>
              <span className="dot-sep" />
              <span>AWS · Terraform · ECS</span>
              <span className="dot-sep" />
              <span>Event-sourced workflows</span>
              <span className="dot-sep" />
              <span>OIDC &amp; identity</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-br from-[color:var(--color-accent-secondary)]/20 via-transparent to-[color:var(--color-accent)]/20 blur-2xl"
              aria-hidden="true"
            />
            <Parallax speed={0.06}>
              <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-elevated)] shadow-[0_20px_50px_-20px_rgba(14,165,233,0.3)]">
                <Picture
                  name="portrait"
                  alt="Andrew Leach"
                  priority
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 33vw, 80vw"
                />
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
