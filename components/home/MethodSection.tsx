import { MethodAnimations } from './MethodAnimations'

const principles = [
  {
    title: 'Design where decisions happen.',
    body: 'I want to understand how things work, how they\'re put together, where they break down — before I start designing. The best work happens when design is a partner to product and engineering from the start, not a step they hand off to.',
  },
  {
    title: 'I work in systems.',
    body: 'Whether I\'m shaping a single feature or a full product, I think in reusable components and shared foundations. Design systems aren\'t a deliverable — they\'re the way teams stay aligned as they grow.',
  },
  {
    title: 'Systems are built with people.',
    body: 'A library nobody uses isn\'t a system, it\'s a folder. I work hands-on with developers and product managers — making the system theirs as much as mine is what makes it stick.',
  },
  {
    title: 'I don\'t hand off and walk away.',
    body: 'Whenever the project allows it, I follow my own designs into the code. Staying engaged through the build keeps design honest and ships products that look the way they were meant to.',
  },
  {
    title: 'Useful doesn\'t have to mean ugly.',
    body: 'Product design too often trades craft for utility, as if you had to choose. I don\'t. Function and beauty hold each other up — and a well-crafted interface earns the trust users give a product.',
  },
] as const

// border classes for each grid position in the 3×2 bento
// row 0: header, p[0], p[1]   — border-b + border-r where needed
// row 1: p[2], p[3], p[4]     — border-r only (no border-b on desktop; border-b on mobile except last)
const principleBorder = [
  'border-b border-white/[0.05] lg:border-r',    // p[0] row 0 col 1
  'border-b border-white/[0.05]',                 // p[1] row 0 col 2
  'border-b lg:border-b-0 border-white/[0.05] lg:border-r', // p[2] row 1 col 0
  'border-b lg:border-b-0 border-white/[0.05] lg:border-r', // p[3] row 1 col 1
  '',                                              // p[4] row 1 col 2 — last cell
]

export function MethodSection() {
  return (
    <section id="method" className="relative scroll-mt-20 bg-[var(--hero-bg)]">

      {/* ── Grid lines overlay — proportions match the bento cols (gutter|cell|cell|cell|gutter) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden lg:grid lg:grid-cols-[3fr_5fr_5fr_5fr_3fr]"
      >
        {Array.from({ length: 5 }).map((_, col) => (
          <div
            key={col}
            className={`h-full${col < 4 ? ' border-r border-white/[0.05]' : ''}`}
          />
        ))}
      </div>

      {/* ── Horizontal hairlines — top at nav-height, bottom closes the grid ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-20 h-px bg-white/[0.05]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-20 h-px bg-white/[0.05]" />

      {/* ── Content grid ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-7">

        {/* Col 1: left gutter */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Cols 2-6: bento */}
        <div className="col-span-1 lg:col-span-5 px-6 pt-20 pb-20 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* Header cell — row 0 col 0 */}
            <div className="method-header border-b border-white/[0.05] lg:border-r p-8 lg:p-10 flex flex-col min-h-[260px] lg:min-h-[300px]">
              <h2
                className="font-bold text-white leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.04em' }}
              >
                Method
              </h2>
              <p
                className="mt-6 leading-relaxed"
                style={{ fontSize: '14px', color: 'var(--hero-text-3)' }}
              >
                5 convictions on craft and collaboration.
              </p>
            </div>

            {/* Principle cells */}
            {principles.map((p, i) => (
              <div
                key={i}
                className={`method-cell ${principleBorder[i]} p-8 lg:p-10 flex flex-col min-h-[260px] lg:min-h-[300px] transition-colors duration-500 hover:bg-white/[0.025]`}
              >
                <span
                  className="font-bold leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.05em',
                    color: 'var(--hero-warm-orange)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="mt-4 font-bold text-white"
                  style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.05rem)', lineHeight: 1.2 }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ fontSize: '13px', color: 'var(--hero-text-2)' }}
                >
                  {p.body}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Col 7: right gutter */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
      <MethodAnimations />
    </section>
  )
}
