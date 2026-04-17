export type ProjectEntry = {
  slug: 'visualizations' | 'workflowable';
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  year: number;
  license: 'MIT';
  install: string;
  features: string[];
  links: {
    github?: string;
    packagist?: string;
    docs?: string;
  };
};

export const projects: ProjectEntry[] = [
  {
    slug: 'visualizations',
    name: 'Visualizations',
    tagline: 'DataGrids & Charts as PHP classes',
    description:
      'A Laravel package for building data visualizations. Define DataGrids and Charts as PHP classes — the package handles query generation, filtering, sorting, pagination, and schema generation for your front end.',
    stack: ['Laravel', 'PHP 8.x', 'Inertia', 'Blade'],
    year: 2024,
    license: 'MIT',
    install: 'composer require settleup/visualizations',
    features: [
      'Query-backed DataGrids',
      'Composable Chart definitions',
      'Auto filtering, sorting, pagination',
      'Front-end schema generation',
    ],
    links: {
      github: 'https://github.com/trysettleup/visualizations',
      docs: 'https://visualizations.trysettleup.com',
    },
  },
  {
    slug: 'workflowable',
    name: 'Workflowable',
    tagline: 'Event-driven workflow engine for Laravel',
    description:
      'JSON-defined workflows with a full audit trail via event sourcing. Replayable state, conditional transitions, and framework-native — drop it into any Laravel app and build orchestration you can reason about.',
    stack: ['Laravel', 'PHP 8.x', 'Event Sourcing'],
    year: 2024,
    license: 'MIT',
    install: 'composer require workflowable/workflowable',
    features: [
      'JSON-defined workflows',
      'Event-sourced audit trail',
      'Conditional transitions',
      'Replayable state',
    ],
    links: {
      github: 'https://github.com/workflowable/workflowable',
      docs: 'https://workflowable.io',
    },
  },
];
