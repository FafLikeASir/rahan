import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { CaseStudy } from '@/data/case-studies'
import { caseStudyMap } from '@/data/case-studies'

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
      {/* Back link — top */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm font-medium text-text-tertiary hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Work
      </Link>

      {/* Header */}
      <header className="mb-12">
        {/* Opening visual placeholder */}
        <div
          className="mb-10 overflow-hidden rounded-2xl h-64 lg:h-80 relative"
          style={{
            background: `linear-gradient(135deg, ${study.bgFrom} 0%, ${study.bgTo} 100%)`,
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 opacity-[.07]"
            style={{
              backgroundImage:
                'linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)',
              backgroundSize: 'var(--hero-grid-size) var(--hero-grid-size)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-initial font-extrabold tracking-tighter select-none leading-none"
              style={{ color: 'var(--hero-grid)' }}
            >
              {study.company[0]}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-primary lg:text-4xl">
          {study.title}
        </h1>

        <dl className="flex flex-col gap-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-text-tertiary min-w-16">Role</dt>
            <dd className="font-medium text-text-secondary">{study.role} · {study.period}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-text-tertiary min-w-16">Scope</dt>
            <dd className="text-text-secondary">{study.scope}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-text-tertiary min-w-16">Context</dt>
            <dd className="text-text-secondary">{study.context}</dd>
          </div>
        </dl>
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
