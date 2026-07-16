export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-32 lg:px-8">
      {/* Label */}
      <p className="mb-6 text-tag font-medium uppercase tracking-[0.08em] text-text-tertiary">About</p>

      {/* Lead sentence — display-scale entry point */}
      <p className="mb-16 text-[46px] font-semibold leading-[1.5] tracking-[-0.025em] text-text-primary">
        I&apos;m a French product designer,<br />
        living in Sarthe but never far from Mayenne dept. 一 my home turf.
      </p>

      {/* 3-col grid: bio | photo | identity */}
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">

        {/* Left: bio para 2 + 3 with italic emphasis */}
        <div className="space-y-5 text-body-sm leading-[1.6] text-text-secondary">
          <p>
            I came to design through code — or more honestly, <em>code through interfaces</em>.
            The abstract languages never quite landed; the visual ones did. Pixels you could
            push, mockups you could bring to life. That intersection has been my work ever since.
          </p>
          <p>
            What pulls me in is <em>the imagining part</em>. A problem, then a structure that
            answers it — an interface, a flow, a system. The same instinct shows up off the
            clock. I watch other people build things — architects and craftsmen. Some ideas keep
            at me until I get them out of my head. Paper, screen, doesn&apos;t matter; they need
            a shape. Always the same fascination: someone shaping something both useful and
            well-made.
          </p>
        </div>

        {/* Center: photo */}
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-muted"
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

        {/* Right: identity block + looking for card */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.015em] text-text-primary">
              Maxime Luet
            </h2>
            <p className="mt-2 text-body-sm text-text-tertiary">Founding Product Designer at eStorie</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <p className="mb-5 text-body-sm font-semibold text-text-primary">Looking for</p>

            <div className="space-y-4">
              {/* Roles */}
              <div>
                <p className="mb-2 text-tag font-medium uppercase tracking-[0.08em] text-text-tertiary">
                  Roles
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-sm border border-border px-2.5 py-0.5 text-sm font-medium text-text-primary">
                    Product Design
                  </span>
                  <span className="rounded-sm border border-border px-2.5 py-0.5 text-sm font-medium text-text-primary">
                    UI/UX
                  </span>
                  <span className="rounded-sm border border-border px-2.5 py-0.5 text-sm font-medium text-text-primary">
                    Design System Ops
                  </span>
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="mb-2 text-tag font-medium uppercase tracking-[0.08em] text-text-tertiary">
                  Location
                </p>
                <div className="space-y-1 text-body-sm leading-[1.5] text-text-secondary">
                  <p>🇪🇺 Europe in remote</p>
                  <p>🇫🇷 Paris or western France in hybrid</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href="https://www.linkedin.com/in/maxime-luet/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-md border border-foreground px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Resume
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
