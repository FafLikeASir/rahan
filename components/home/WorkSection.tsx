import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies, elsewhere } from '@/data/case-studies'

function WorkCard({ study }: { study: (typeof caseStudies)[number] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border">
      {/* Visual area */}
      <div
        className="relative h-52 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${study.bgFrom} 0%, ${study.bgTo} 100%)` }}
        aria-hidden="true"
      >
        {/* Subtle grid */}
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
            className="text-7xl font-extrabold tracking-tighter select-none"
            style={{ color: 'var(--hero-initial)' }}
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
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <p className="text-xs font-medium text-text-tertiary">{study.role} · {study.period}</p>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-primary">{study.company}</h3>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">{study.description}</p>
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80 group-hover:gap-2.5"
        >
          Read case study
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-primary">Work</h2>

      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <WorkCard key={study.slug} study={study} />
        ))}
      </div>

      {/* Elsewhere band */}
      <div className="mt-16 border-t border-border pt-10">
        <p className="mb-6 text-sm font-medium text-text-tertiary uppercase tracking-widest">Elsewhere</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-4">
          {elsewhere.map((item) => (
            <div key={item.company} className="flex flex-col">
              <span className="text-sm font-semibold text-primary">
                {item.company}
                {'suffix' in item && (
                  <span className="ml-1 font-normal text-text-tertiary">({item.suffix})</span>
                )}
              </span>
              <span className="text-xs text-text-tertiary">{item.role} · {item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
