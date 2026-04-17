export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;
  end: string | 'present';
  location: string;
  stack: string[];
  summary: string;
  featured: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    company: 'Wastequip',
    role: 'Lead Software Engineer',
    start: '2022-04',
    end: 'present',
    location: 'Charlotte, NC',
    stack: ['React', 'PHP', 'Laravel', 'Inertia', 'AWS', 'Terraform', 'ECS'],
    summary:
      'Leading the Wasteware inventory platform and all AWS infrastructure — codified infra in Terraform and built the deployment pipeline.',
    featured: true,
  },
  {
    company: 'Better Car People',
    role: 'Senior Software Developer',
    start: '2019-11',
    end: '2022-06',
    location: 'Remote',
    stack: ['PHP', 'Laravel', 'TypeScript', 'Vue', 'Angular', 'Twilio'],
    summary: 'Architected the contact-center suite powering hundreds of dealerships.',
    featured: true,
  },
  {
    company: 'Better Car People',
    role: 'Web Developer',
    start: '2017-02',
    end: '2019-11',
    location: 'Remote',
    stack: ['PHP', 'JavaScript'],
    summary: 'Front-of-house product work on the pre-contact-center stack.',
    featured: false,
  },
  {
    company: 'Big Ring',
    role: 'Web Developer',
    start: '2014-06',
    end: '2017-01',
    location: 'Monroe, NC',
    stack: ['PHP', 'WordPress', 'HTML/CSS'],
    summary: 'Agency work — dynamic WordPress themes and HTML builds.',
    featured: false,
  },
];

export const education = {
  school: 'University of North Carolina at Charlotte',
  degree: "Bachelor's Degree, Computer Science, Software and Info Systems",
  years: '2009–2015',
};
