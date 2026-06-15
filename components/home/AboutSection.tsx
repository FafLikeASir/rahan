export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
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

          {/* Mini-blocks */}
          <div className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">Currently</p>
              <p className="text-sm leading-relaxed text-text-secondary">
                Two screens open most days: the Health Solutions Catalogue at GIE SESAM-Vitale
                (via SII), and eStorie on the side.
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
          </div>
        </div>

        {/* Photo placeholder */}
        <div className="flex items-start justify-center lg:justify-end">
          <div
            className="h-80 w-64 rounded-2xl bg-muted border border-border flex items-center justify-center lg:h-96 lg:w-72"
            aria-label="Photo de Maxime Luet"
          >
            <span className="text-sm text-text-tertiary">Photo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
