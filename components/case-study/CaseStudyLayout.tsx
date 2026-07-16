import Link from 'next/link'
import { ArrowLeft, ArrowRight, Link as LinkIcon, MapPin } from 'lucide-react'
import type { CaseStudy } from '@/data/case-studies'
import { caseStudyMap } from '@/data/case-studies'

// Maps tool name → filename in /public/tools/ (without .svg). Add entry when a new SVG is dropped in.
const TOOL_ICONS: Record<string, string> = {
  claude: 'claude',
  figma: 'figma',
  github: 'github',
  jira: 'jira',
  miro: 'miro',
  mui: 'materialui',
  'material ui': 'materialui',
  react: 'react',
  slack: 'slack',
  storybook: 'storybook',
  tailwind: 'tailwindcss',
  tailwindcss: 'tailwindcss',
  zeplin: 'zeplin',
}

function yearsOnly(period: string): string {
  const years = period.match(/\d{4}/g) ?? []
  const hasPresent = /present/i.test(period)
  return hasPresent ? `${years[0]} - Present` : years.join(' - ')
}

function ToolTag({ name }: { name: string }) {
  const file = TOOL_ICONS[name.toLowerCase()]
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-border px-2.5 py-0.5 text-sm font-medium text-text-primary">
      {file && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/tools/${file}.svg`}
          className="h-4 w-4 flex-none"
          alt=""
          aria-hidden
        />
      )}
      {name}
    </span>
  )
}

export function CaseStudyLayout({
  study,
  children,
}: {
  study: CaseStudy
  children: React.ReactNode
}) {
  const next = study.nextSlug ? caseStudyMap[study.nextSlug] : null

  return (
    <div className="mx-auto max-w-3xl px-6 pb-32 pt-28 lg:px-8">
      {/* Back link */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Work
      </Link>

      {/* Header */}
      <header className="mb-12">
        {/* Cover */}
        <div
          className="mb-8 overflow-hidden rounded-xl relative"
          style={{
            background: `linear-gradient(135deg, ${study.bgFrom} 0%, ${study.bgTo} 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[.07]"
            style={{
              backgroundImage:
                'linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)',
              backgroundSize: 'var(--hero-grid-size) var(--hero-grid-size)',
            }}
            aria-hidden="true"
          />
          <div className="relative min-h-[260px] lg:min-h-[380px] flex items-center justify-center px-8 py-12">
            <h1
              className="text-2xl lg:text-4xl font-semibold tracking-tight text-center leading-tight max-w-xl"
              style={{ color: 'var(--hero-text-1)' }}
            >
              {study.title}
            </h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-6">
          {/* Role + date */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-semibold text-primary">{study.role}</p>
            <p className="text-base text-text-tertiary">{yearsOnly(study.period)}</p>
          </div>

          {/* Company row */}
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div
                className="size-10 rounded-xl flex items-center justify-center shrink-0 font-semibold text-sm select-none overflow-hidden shadow-sm"
                style={!study.logo && study.bgFrom && study.bgTo
                  ? { background: `linear-gradient(135deg, ${study.bgFrom}, ${study.bgTo})` }
                  : undefined}
                aria-hidden="true"
              >
                {study.logo
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={study.logo} alt="" className="w-full h-full object-cover" />
                  : study.company[0]
                }
              </div>
              <span className="text-sm font-semibold text-primary">{study.company}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin className="size-3.5 text-text-tertiary flex-none" aria-hidden="true" />
              <span className="font-medium">{study.location}</span>
            </div>
            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary underline underline-offset-2 hover:text-primary transition-colors"
              >
                <LinkIcon className="size-3.5 flex-none" aria-hidden="true" />
                Website
              </a>
            )}
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <ToolTag key={tag} name={tag} />
            ))}
          </div>
        </div>
      </header>

      {/* MDX content */}
      <article className="prose">{children}</article>

      {/* Footer nav */}
      <footer className="mt-20 flex items-center justify-between border-t border-border pt-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Work
        </Link>
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            {next.company}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </footer>
    </div>
  )
}
