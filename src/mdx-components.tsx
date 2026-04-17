import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="font-display tracking-tightest mt-12 mb-6 text-5xl" {...props} />,
    h2: (props) => <h2 className="font-display mt-10 mb-4 text-3xl tracking-tighter" {...props} />,
    h3: (props) => <h3 className="font-display mt-8 mb-3 text-2xl tracking-tighter" {...props} />,
    p: (props) => <p className="my-4 leading-relaxed text-[color:var(--color-fg)]/85" {...props} />,
    ul: (props) => <ul className="my-4 list-disc space-y-1 pl-6" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal space-y-1 pl-6" {...props} />,
    a: (props) => <a className="link-accent" {...props} />,
    code: (props) => (
      <code
        className="rounded bg-[color:var(--color-rule)] px-1.5 py-0.5 font-mono text-[0.9em] text-[color:var(--color-fg)]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-md bg-[color:var(--color-code-bg)] p-4 font-mono text-sm text-[color:var(--color-code-fg)]"
        {...props}
      />
    ),
    ...components,
  };
}
