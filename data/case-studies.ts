export const caseStudies = [
  {
    slug: 'estorie',
    company: 'eStorie',
    title: 'Designing an entire product from scratch',
    role: 'Founding Product Designer',
    period: 'June 2025 - Present',
    scope: 'Sole designer, in collaboration with one developer',
    context: 'funeral-tech startup · B2B2C SaaS',
    description:
      'Sole designer at a funeral-tech startup, building the entire product from scratch: tribute spaces for families, tools for funeral homes, on a design system shipped to production.',
    tags: ['Design System', 'B2B2C', 'From scratch'],
    bgFrom: 'var(--hero-bg)',
    bgTo: 'var(--hero-mid)',
    nextSlug: 'mention',
    caseReady: false, // confidentiality review pending
  },
  {
    slug: 'mention',
    company: 'Mention',
    title: 'A design system, and the workflow to make it stick',
    role: 'Product Designer, UI & Design System',
    period: 'October 2022 - July 2024',
    scope: 'Sole designer, in collaboration with the product team and developers',
    context: 'B2B SaaS · media monitoring & social listening',
    description:
      'Turned a scattered Material UI codebase into a real design system, and rebuilt the design-to-dev workflow so design finally had a seat in product decisions.',
    tags: ['Design System', 'Governance', 'B2B SaaS'],
    bgFrom: 'var(--hero-deep)',
    bgTo: 'var(--hero-navy)',
    nextSlug: 'ekonsilio',
    caseReady: true,
  },
  {
    slug: 'ekonsilio',
    company: 'eKonsilio',
    title: "Building a startup's first product, from Figma to React",
    role: 'Founding UI/UX Designer & Front-end Developer',
    period: 'November 2019 - August 2022',
    scope: 'Sole designer and front-end developer; one fullstack developer on back end and infra',
    context: 'B2B SaaS · conversational marketing',
    description:
      'First designer at a conversational-marketing startup. Defined the UI, founded the design system, and built it in React: the foundation a product team would scale on.',
    tags: ['UI/UX', 'React', 'From scratch'],
    bgFrom: 'var(--hero-teal)',
    bgTo: 'var(--hero-green)',
    nextSlug: null,
    caseReady: true,
  },
] as const

export type CaseStudy = (typeof caseStudies)[number]

export const caseStudyMap = Object.fromEntries(caseStudies.map((c) => [c.slug, c]))

export const elsewhere = [
  // ponytail: GIE SESAM-Vitale entry removed before public release — private employer data
  {
    company: 'Sparteo',
    role: 'Senior Product Designer',
    period: '2024-2025',
  },
  {
    company: 'Bfast System',
    role: 'UI/UX Designer & Web Integrator',
    period: '2015-2019',
  },
] as const

export const sideProjects: { name: string; role: string; period: string; url?: string }[] = []

export type WorkItem = {
  company: string
  role?: string
  period: string
  slug?: string
  logo?: string
  bgFrom?: string
  bgTo?: string
  caseReady?: boolean
  externalUrl?: string
}

// Ordered display list for the home Work section.
// caseStudies keeps full data for /work/[slug] routes; workItems drives the list UI.
export const workItems: WorkItem[] = [
  {
    company: 'eStorie',
    role: 'Founding Product Designer',
    period: 'Currently',
    slug: 'estorie',
    logo: '/logos/estorie.svg',
    bgFrom: 'var(--hero-bg)',
    bgTo: 'var(--hero-mid)',
    caseReady: false,
    externalUrl: 'https://www.estorie.fr',
  },
  {
    company: 'SII',
    role: 'Senior UI/UX Designer',
    period: '2026',
    logo: '/logos/sii.svg',
  },
  {
    company: 'Sparteo',
    role: 'Senior Product Designer',
    period: '2024-2025',
    logo: '/logos/sparteo.svg',
  },
  {
    company: 'Mention',
    role: 'Product Designer, UI & Design System',
    period: '2022-2024',
    slug: 'mention',
    logo: '/logos/mention.svg',
    bgFrom: 'var(--hero-deep)',
    bgTo: 'var(--hero-navy)',
    caseReady: true,
  },
  {
    company: 'eKonsilio',
    role: 'Founding UI/UX Designer & Front-end Developer',
    period: '2019-2022',
    slug: 'ekonsilio',
    logo: '/logos/ekonsilio.svg',
    bgFrom: 'var(--hero-teal)',
    bgTo: 'var(--hero-green)',
    caseReady: true,
  },
  {
    company: 'Bfast System',
    role: 'UI/UX Designer & Web Integrator',
    period: '2015-2019',
    logo: '/logos/bfast.svg',
  },
]
