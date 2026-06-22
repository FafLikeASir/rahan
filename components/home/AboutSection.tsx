export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
        {/* Main bio */}
        <div>
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-primary">About</h2>

          <div className="space-y-5 text-body-sm leading-relaxed text-text-secondary">
            <p>
              I&apos;m a French product designer, living in the Sarthe and never far from the
              Mayenne — my home turf.
            </p>
            <p>
              I came to design through code — or more honestly, code through interfaces.
              The abstract languages never quite landed; the visual ones did. Pixels you
              could push, mockups you could bring to life. That intersection has been my
              work ever since.
            </p>
            <p>
              What pulls me in is the imagining part. A problem, then a structure that
              answers it — an interface, a flow, a system. The same instinct shows up off
              the clock. I watch other people build things — architects and craftsmen.
              Some ideas keep at me until I get them out of my head. Paper, screen,
              doesn&apos;t matter; they need a shape. Always the same fascination: someone
              shaping something both useful and well-made.
            </p>
          </div>

          {/* Mini-blocks — currently hidden (private employer + job search data) */}
          {/* <div className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Currently</p>
              <p className="text-sm leading-relaxed text-text-secondary">
                Two screens open most days: [current project], and eStorie on the side.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                What I&apos;m looking for
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                Product Designer roles — ideally with a Design System scope, but I&apos;m open.
                Remote across France, or hybrid in Paris (light) and cities in western France.
              </p>
            </div>
          </div> */}
        </div>

        {/* Photo — replace with next/image once available */}
        <div className="flex items-start justify-center lg:justify-end">
          <div
            className="relative h-80 w-64 overflow-hidden rounded-2xl border border-border lg:h-96 lg:w-72"
            style={{ background: 'linear-gradient(145deg, var(--muted) 0%, var(--secondary) 100%)' }}
            aria-label="Maxime Luet"
            role="img"
          >
            <div className="flex h-full items-center justify-center" aria-hidden="true">
              <span
                className="select-none font-extrabold tracking-tighter"
                style={{ fontSize: '5rem', color: 'var(--border)', lineHeight: 1 }}
              >
                ML
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
