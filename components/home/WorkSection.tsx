import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { workItems, sideProjects } from '@/data/case-studies'
import { cn } from '@/lib/utils'
import { WorkAnimations } from './WorkAnimations'

function IconBadge({ name, logo, bgFrom, bgTo }: { name: string; logo?: string; bgFrom?: string; bgTo?: string }) {
  return (
    <div
      className={cn(
        'size-10 rounded-xl flex items-center justify-center shrink-0 font-semibold text-sm select-none overflow-hidden shadow-sm',
        !logo && (bgFrom ? 'text-white' : 'bg-muted text-muted-foreground'),
      )}
      style={!logo && bgFrom && bgTo ? { background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` } : undefined}
      aria-hidden
    >
      {logo
        ? <img src={logo} alt="" className="w-full h-full object-cover" />
        : name[0]
      }
    </div>
  )
}

// Divider that respects the 7-col layout width (no gutter bleed)
function SectionDivider() {
  return (
    <>
      <div className="hidden lg:grid lg:grid-cols-7">
        <div />
        <div className="col-span-5 border-t border-foreground/[8%]" />
        <div />
      </div>
      <div className="lg:hidden mx-6 border-t border-foreground/[8%]" />
    </>
  )
}

export function WorkSection() {
  return (
    <section id="work" aria-label="Work" className="scroll-mt-20">
      <WorkAnimations />

      {/* heading */}
      <div className="grid grid-cols-1 lg:grid-cols-7 pt-20 pb-10">
        <div className="hidden lg:block" />
        <div className="col-span-1 lg:col-span-5 px-6 lg:px-0">
          <h2
            className="work-heading font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', letterSpacing: '-0.035em' }}
          >
            Work
          </h2>
        </div>
        <div className="hidden lg:block" />
      </div>

      {/* ── Unified work list ─────────────────────────────────────────── */}
      <div className="pb-20">
        {workItems.map((item, i) => {
          const showCta = !!item.slug && item.caseReady !== false
          const showDiscover = !!item.externalUrl

          return (
            <div key={item.company}>
              <div className="work-row">

                {/* Desktop: gutter | icon+company | role(×2) | period(centered) | CTA | gutter */}
                <div className="hidden lg:grid lg:grid-cols-7 gap-2 py-5 relative z-10">
                  <div />
                  <div className="flex items-center gap-3">
                    <IconBadge name={item.company} logo={item.logo} bgFrom={item.bgFrom} bgTo={item.bgTo} />
                    <p className="text-sm font-semibold text-foreground">{item.company}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {item.role && (
                      <p className="text-base font-medium text-text-secondary">{item.role}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-base text-muted-foreground text-center">{item.period}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    {showDiscover && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-foreground underline-offset-2 transition-all"
                      >
                        Discover{' '}
                        <ArrowUpRight className="inline-block w-3 h-3 ml-0.5 align-middle" strokeWidth={2.5} />
                      </a>
                    )}
                    {showCta && (
                      <Link
                        href={`/work/${item.slug}`}
                        className="text-sm font-semibold text-foreground underline-offset-2 transition-all"
                      >
                        Read case study{' '}
                        <ArrowRight className="inline-block w-3 h-3 ml-0.5 align-middle" strokeWidth={2.5} />
                      </Link>
                    )}
                  </div>
                  <div />
                </div>

                {/* Mobile: vertical stack */}
                <div className="lg:hidden px-6 py-5 flex flex-col gap-2 relative z-10">
                  <IconBadge name={item.company} logo={item.logo} bgFrom={item.bgFrom} bgTo={item.bgTo} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.company}</p>
                    {item.role && (
                      <p className="text-sm font-medium text-text-secondary mt-0.5">{item.role}</p>
                    )}
                  </div>
                  <p className="text-base text-muted-foreground">{item.period}</p>
                  {showDiscover && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 self-start rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-semibold text-foreground mt-1"
                    >
                      Discover
                      <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                    </a>
                  )}
                  {showCta && (
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center gap-1 self-start rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-semibold text-foreground mt-1"
                    >
                      Read case study
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              </div>

              <SectionDivider />
            </div>
          )
        })}
      </div>

      {/* Side projects — hidden until populated */}
      {sideProjects.length > 0 && (
        <div className="mt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-7 pb-4">
            <div className="hidden lg:block" />
            <div className="col-span-1 lg:col-span-5 px-6 lg:px-0">
              <h3
                className="font-semibold text-foreground"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.035em' }}
              >
                Side projects
              </h3>
            </div>
            <div className="hidden lg:block" />
          </div>

          <SectionDivider />

          {sideProjects.map((project) => (
            <div key={project.name}>
              <div className="work-row">

                {/* Desktop */}
                <div className="hidden lg:grid lg:grid-cols-7 gap-2 py-5 relative z-10">
                  <div />
                  <div className="flex items-center gap-3">
                    <IconBadge name={project.name} />
                    <p className="text-sm font-semibold text-foreground">{project.name}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-base font-medium text-text-secondary">{project.role}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-base text-muted-foreground text-center">{project.period}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-foreground underline-offset-2 transition-all"
                      >
                        View project{' '}
                        <ArrowRight className="inline-block w-3 h-3 ml-0.5 align-middle" strokeWidth={2.5} />
                      </Link>
                    )}
                  </div>
                  <div />
                </div>

                {/* Mobile: vertical stack */}
                <div className="lg:hidden px-6 py-5 flex flex-col gap-2 relative z-10">
                  <IconBadge name={project.name} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{project.name}</p>
                    <p className="text-sm font-medium text-text-secondary mt-0.5">{project.role}</p>
                  </div>
                  <p className="text-base text-muted-foreground">{project.period}</p>
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-semibold text-foreground mt-1"
                    >
                      View project{' '}
                      <ArrowRight className="inline-block w-3 h-3 ml-0.5 align-middle" strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              </div>

              <SectionDivider />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
