import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies, elsewhere } from '@/data/case-studies'
import { cn } from '@/lib/utils'
import { WorkAnimations } from './WorkAnimations'

const textColor = { primary: 'text-foreground', secondary: 'text-text-secondary', meta: 'text-muted-foreground' }

export function WorkSection() {
  return (
    <section id="work" aria-label="Work" className="scroll-mt-20">
      <WorkAnimations />

      {/* ── "Work" heading ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-7 pt-20 pb-10">
        <div className="hidden lg:block" />
        <div className="col-span-1 lg:col-span-5 px-6 lg:px-0">
          <h2
            className="font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', letterSpacing: '-0.035em' }}
          >
            Work
          </h2>
        </div>
        <div className="hidden lg:block" />
      </div>

      {/* ── Case Studies ──────────────────────────────────────────────── */}
      <div>
        {/* "Case Study" subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-7 pb-2">
          <div className="hidden lg:block" />
          <div className="col-span-1 lg:col-span-5 px-6 lg:px-0">
            <h3
              className="font-semibold text-foreground"
              style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.035em' }}
            >
              Case Study
            </h3>
          </div>
          <div className="hidden lg:block" />
        </div>

        {/* Rows */}
        {caseStudies.map((study) => {
          const c = textColor

          return (
            <div
              key={study.slug}
              className="work-row border-t border-foreground/[8%]"
            >

              {/* ─── Desktop: 7-column table ─────────────────────────── */}
              <div className="hidden lg:grid grid-cols-7 py-6 relative z-10">
                {/* col 1 — gutter */}
                <div />

                {/* col 2 — date */}
                <div className="flex items-start pt-0.5">
                  <p className={cn('text-xs leading-5', c.meta)}>{study.period}</p>
                </div>

                {/* col 3 — company */}
                <div className="flex items-start">
                  <p className={cn('text-base font-semibold leading-5', c.primary)}>{study.company}</p>
                </div>

                {/* col 4 — role */}
                <div className="flex items-start">
                  <p className={cn('text-base font-semibold leading-5', c.secondary)}>
                    {study.role}
                  </p>
                </div>

                {/* col 5 — description */}
                <div className="flex items-start pr-4">
                  <p className={cn('text-xs leading-5', c.meta)}>{study.description}</p>
                </div>

                {/* col 6 — CTA */}
                <div className="flex items-start justify-end">
                  <Link
                    href={`/work/${study.slug}`}
                    className={cn('text-xs font-semibold leading-5 underline-offset-2 transition-all', c.primary)}
                  >
                    Read case study <ArrowRight className="inline-block w-3 h-3 ml-0.5 align-middle" strokeWidth={2.5} />
                  </Link>
                </div>

                {/* col 7 — gutter */}
                <div />
              </div>

              {/* ─── Mobile: stacked ─────────────────────────────────── */}
              <div className="lg:hidden px-6 py-6 relative z-10">
                <p className={cn('text-xs mb-1', c.meta)}>{study.period}</p>
                <p className={cn('text-base font-semibold', c.primary)}>{study.company}</p>
                <p className={cn('text-sm font-semibold mt-0.5', c.secondary)}>{study.role}</p>
                <p className={cn('text-xs mt-2 leading-relaxed', c.meta)}>{study.description}</p>
                <Link
                  href={`/work/${study.slug}`}
                  className={cn('inline-block text-xs font-semibold mt-3', c.primary)}
                >
                  Read case study <ArrowRight className="inline-block w-3 h-3 ml-0.5 align-middle" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Elsewhere ─────────────────────────────────────────────────── */}
      <div className="elsewhere-section mt-12">
        {/* "Elsewhere" subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-7 pb-2">
          <div className="hidden lg:block" />
          <div className="col-span-1 lg:col-span-5 px-6 lg:px-0">
            <h3
              className="font-semibold text-foreground"
              style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.035em' }}
            >
              Elsewhere
            </h3>
          </div>
          <div className="hidden lg:block" />
        </div>

        {/* ─── Desktop: cols 2, 4, 6 ───────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-7 pt-4 pb-20">
          <div /> {/* col 1 */}
          {elsewhere.map((item, i) => (
            <div
              key={item.company}
              className={cn(
                'elsewhere-item flex flex-col gap-1',
                i === 0 && 'col-start-2',
                i === 1 && 'col-start-4',
                i === 2 && 'col-start-6',
              )}
            >
              <p className="text-xs text-muted-foreground leading-5">{item.period}</p>
              <p className="text-base font-semibold text-foreground leading-5">{item.company}</p>
              <p className="text-base font-semibold text-text-secondary leading-5">
                {item.role}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Mobile: stacked ─────────────────────────────────────── */}
        <div className="lg:hidden flex flex-col gap-6 px-6 pb-20 pt-4">
          {elsewhere.map((item) => (
            <div key={item.company} className="flex flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">{item.period}</p>
              <p className="text-sm font-semibold text-foreground">{item.company}</p>
              <p className="text-sm text-text-secondary">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
