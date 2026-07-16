import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Link as LinkIcon, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
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
    <>
      {/* Full-bleed cover */}
      <section
        className={cn(
          'relative overflow-hidden bg-background border-b border-[#eeeeee]',
          !study.coverImage && 'pb-16 lg:pb-20'
        )}
      >
        {/* Gradient blob — brand orange centered just below the cover, soft outer glow fills the visible area */}
        <div
          className="pointer-events-none absolute rounded-full"
          aria-hidden="true"
          style={{
            width: '1600px',
            height: '1600px',
            left: '50%',
            top: 'calc(100% + 28px)',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, var(--hero-warm-orange) 0%, transparent 58%)',
            opacity: 0.45,
          }}
        />

        {/* Back link — max-w-3xl aligned to match content column below */}
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 lg:px-8 pt-28">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Work
          </Link>
        </div>

        {/* Content column: icon + title + optional screen */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-8 gap-8">
          <div className="flex flex-col items-center gap-3 w-full max-w-[720px]">
            {/* Company icon */}
            <div
              className="size-10 rounded-xl flex items-center justify-center shrink-0 font-semibold text-sm select-none overflow-hidden shadow-sm"
              style={
                !study.logo && study.bgFrom && study.bgTo
                  ? { background: `linear-gradient(135deg, ${study.bgFrom}, ${study.bgTo})` }
                  : undefined
              }
              aria-hidden="true"
            >
              {study.logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={study.logo} alt="" className="w-full h-full object-cover" />
                : study.company[0]
              }
            </div>

            {/* H1 — Syne Bold 700, 40px, centered */}
            <h1
              className="font-bold text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-center text-foreground"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {study.title}
            </h1>
          </div>

          {/* Glassmorphism screen wrapper — overflow clips at section bottom (peek effect) */}
          {study.coverImage && (
            <div className="-mb-10 w-full max-w-[720px]">
              <div
                className="rounded-3xl border border-white/20 p-2"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <div className="relative w-full h-[320px] rounded-[16px] overflow-hidden">
                  <Image
                    src={study.coverImage}
                    alt={`${study.company} product screenshot`}
                    fill
                    className="object-cover object-top w-full"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Constrained meta + content + footer */}
      <main id="main" className="mx-auto max-w-3xl px-6 pb-32 pt-10 lg:px-8">
        {/* Meta */}
        <header className="mb-12">
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
      </main>
    </>
  )
}
