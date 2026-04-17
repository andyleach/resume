import { FadeUp } from '@/components/motion/FadeUp';

type Principle = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const principles: Principle[] = [
  {
    title: 'Systems that hold under load',
    body: 'Inventory, workflow, and contact-center platforms. The kind of software that real people rely on to do their jobs — where downtime has teeth.',
    icon: (
      <svg
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
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-7H4a2 2 0 0 0-2 2Z" />
        <path d="M14 3v4a2 2 0 0 0 2 2h4" />
        <path d="m9 18 2-2 4 4" />
      </svg>
    ),
  },
  {
    title: 'Architecture and execution',
    body: 'I draw the shape of a system and then ship it with the team. React and Laravel on the surface; Terraform, ECS, and event-sourcing underneath.',
    icon: (
      <svg
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
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="m16.24 16.24 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="m4.93 19.07 2.83-2.83" />
        <path d="m16.24 7.76 2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Workflow, identity, and AI tooling',
    body: 'Orchestration that you can reason about. OIDC-based identity that survives audit. Pragmatic AI tooling that earns its keep on the engineering floor.',
    icon: (
      <svg
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
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
      </svg>
    ),
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-[color:var(--color-rule)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge-pill">About</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-balance text-[color:var(--color-fg)] sm:text-5xl">
            Shipping software that matters.
          </h2>
          <p className="mt-4 text-lg text-[color:var(--color-secondary)]">
            Lead Software Engineer with a decade of application work — from contact-center suites to
            inventory platforms to open-source infrastructure.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.08}>
              <div className="card-surface h-full p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-accent)]/30 bg-[color-mix(in_oklab,var(--color-accent)_12%,transparent)] text-[color:var(--color-accent)]">
                  {p.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[color:var(--color-fg)]">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[color:var(--color-secondary)]">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
