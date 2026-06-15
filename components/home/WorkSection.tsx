import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies, elsewhere } from '@/data/case-studies'
import { cn } from '@/lib/utils'

type Layout = 'featured' | 'portrait' | 'wide'

function WorkCard({ study, layout }: { study: (typeof caseStudies)[number]; layout: Layout }) {
  const isPortrait = layout === 'portrait'

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border',
        'transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl',
        layout === 'featured' && 'lg:col-span-2',
        layout === 'portrait' && 'lg:row-span-2',
        layout === 'wide' && 'lg:col-span-2',
      )}
    >
      {/* Visual */}
      <div
        className={cn(
          'relative overflow-hidden',
          isPortrait
            ? 'h-56 lg:h-auto lg:flex-1'
            : cn(
                'flex-shrink-0',
                layout === 'featured' ? 'h-60 lg:h-72' : 'h-52 lg:h-60',
              ),
        )}
        style={{ background: `linear-gradient(135deg, ${study.bgFrom} 0%, ${study.bgTo} 100%)` }}
        aria-hidden="true"
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[.07]"
          style={{
            backgroundImage:
              'linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)',
            backgroundSize: 'var(--hero-grid-size) var(--hero-grid-size)',
          }}
        />
        {/* Company initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="select-none font-extrabold tracking-tighter"
            style={{
              fontSize: layout === 'featured' ? '9rem' : '7rem',
              color: 'var(--hero-initial)',
              lineHeight: 1,
            }}
          >
            {study.company[0]}
          </span>
        </div>
        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-tag font-medium"
              style={{
                background: 'var(--hero-tag-bg)',
                border: '1px solid var(--hero-badge-border)',
                color: 'var(--hero-tag-text)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={cn('flex flex-col gap-3 p-6', isPortrait ? 'flex-shrink-0' : 'flex-1')}>
        <div>
          <p className="text-xs font-medium text-text-tertiary">
            {study.role} · {study.period}
          </p>
          <h3
            className={cn(
              'mt-1 font-bold tracking-tight text-primary',
              layout === 'featured' ? 'text-2xl' : 'text-xl',
            )}
          >
            {study.company}
          </h3>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">{study.description}</p>
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5 hover:opacity-80 after:absolute after:inset-0"
        >
          Read case study
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-primary lg:text-4xl">Work</h2>

      {/* Bento grid — 3×2, zero empty cells */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <WorkCard
            key={study.slug}
            study={study}
            layout={i === 0 ? 'featured' : i === 1 ? 'portrait' : 'wide'}
          />
        ))}
      </div>

      {/* Elsewhere band */}
      <div className="mt-16 border-t border-border pt-10">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-text-tertiary">
          Elsewhere
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-4">
          {elsewhere.map((item) => (
            <div key={item.company} className="flex flex-col">
              <span className="text-sm font-semibold text-primary">
                {item.company}
                {'suffix' in item && (
                  <span className="ml-1 font-normal text-text-tertiary">({item.suffix})</span>
                )}
              </span>
              <span className="text-xs text-text-tertiary">
                {item.role} · {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
