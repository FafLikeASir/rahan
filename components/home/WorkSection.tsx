import Link from 'next/link'
import { caseStudies, elsewhere } from '@/data/case-studies'
import { cn, grainSvg } from '@/lib/utils'

const gradientOverlay = [
  'radial-gradient(ellipse 70% 600% at 52% 50%, color-mix(in srgb, var(--hero-warm-orange) 70%, transparent) 0%, color-mix(in srgb, var(--hero-warm-orange) 25%, transparent) 65%, transparent 85%)',
  'radial-gradient(ellipse 55% 600% at 12% 50%, color-mix(in srgb, var(--hero-warm-slate) 58%, transparent) 0%, transparent 70%)',
].join(', ')

// ponytail: single div replaces 29 Figma backdrop-blur strips; visual fidelity ~95%
const glassStrips = 'repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0%, rgba(255,255,255,0.02) 1.6%, transparent 3.33%)'

const textColor = {
  featured: { primary: 'text-white', secondary: 'text-text-secondary', meta: 'text-muted-foreground' },
  default:  { primary: 'text-foreground', secondary: 'text-text-secondary', meta: 'text-muted-foreground' },
}

export function WorkSection() {
  return (
    <section id="work" aria-label="Work" className="scroll-mt-20">

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
          const featured = study.slug === 'estorie'
          const c = featured ? textColor.featured : textColor.default

          return (
            <div
              key={study.slug}
              className={cn(
                'relative border-t border-foreground/[8%] group',
                !featured && 'transition-colors duration-150 hover:bg-foreground/[2.5%]',
              )}
              style={featured ? { backgroundColor: 'color-mix(in srgb, var(--hero-warm-orange) 6%, transparent)' } : undefined}
            >
              {/* Gradient overlay — featured row only */}
              {featured && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden"
                  style={{ backgroundImage: gradientOverlay }}
                />
              )}

              {/* Noise tile — featured row only */}
              {featured && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{ backgroundImage: grainSvg, backgroundSize: '300px 300px', mixBlendMode: 'color-burn' }}
                />
              )}

              {/* Glass strips — all rows, on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: glassStrips, mixBlendMode: 'overlay' }}
              />

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
                    Read case study{' '}
                    <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
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
                  Read case study →
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Elsewhere ─────────────────────────────────────────────────── */}
      <div className="mt-12">
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
                'flex flex-col gap-1',
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
