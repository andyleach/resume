import type { Metadata } from 'next';
import { ProjectHero } from '@/components/project/ProjectHero';
import { projects } from '@/content/projects';
import Content from './content.mdx';

const project = projects.find((p) => p.slug === 'visualizations')!;

export const metadata: Metadata = {
  title: project.name,
  description: project.tagline,
};

export default function Page() {
  return (
    <>
      <ProjectHero project={project} />
      <article className="prose-invert mt-12">
        <Content />
      </article>
      <nav className="label-mono mt-20 flex justify-between">
        <span />
        <a href="/projects/workflowable/">Next: Workflowable →</a>
      </nav>
    </>
  );
}
