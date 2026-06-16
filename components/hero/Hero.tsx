import { MapPin } from 'lucide-react'

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

const diagonalPattern = `repeating-linear-gradient(-45deg, color-mix(in srgb, var(--foreground) 6%, transparent) 0px, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px, transparent 9px)`

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden" aria-label="Introduction">

      {/* Warm gradient — two radial blobs (orange + slate-blue) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--background)',
          backgroundImage: [
            'radial-gradient(ellipse 58% 82% at 52% 50%, color-mix(in srgb, var(--hero-warm-orange) 55%, transparent) 0%, transparent 68%)',
            'radial-gradient(ellipse 66% 90% at 28% 98%, color-mix(in srgb, var(--hero-warm-slate) 68%, transparent) 0%, transparent 68%)',
          ].join(', '),
        }}
      />

      {/* Noise grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.03]"
        style={{ backgroundImage: grainSvg, backgroundSize: '256px 256px', mixBlendMode: 'multiply' }}
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col">

        {/* Main content zone */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-7 pt-20">
          <div className="hidden lg:block" aria-hidden="true" /> {/* col 1 */}

          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center px-6 lg:px-0 py-16 lg:py-20">
            <h1 className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span
                className="font-extrabold tracking-tighter leading-none text-white"
                style={{ fontSize: 'clamp(48px, 8.5vw, 130px)', textShadow: `0 2px 32px color-mix(in srgb, var(--hero-warm-shadow) 25%, transparent)` }}
              >
                Product
              </span>
              <span
                className="font-extrabold tracking-tighter leading-none text-white"
                style={{ fontSize: 'clamp(48px, 8.5vw, 130px)', textShadow: `0 2px 32px color-mix(in srgb, var(--hero-warm-shadow) 25%, transparent)` }}
              >
                Designer
              </span>
            </h1>

            <p className="mt-4 text-base text-foreground/70 max-w-[520px]">
              I design UI for digital products and ship design systems.
            </p>

            <div className="mt-auto pt-10 flex items-center gap-2 text-sm text-foreground/55">
              <MapPin size={16} aria-hidden="true" />
              Based in France
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" /> {/* col 7 */}
        </div>

        {/* Stats zone */}
        <div className="grid grid-cols-2 lg:grid-cols-7 h-[180px] lg:h-[260px] border-t border-black/[0.06]">
          {/* col 1 (lg) */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* col 2 (lg) — diagonal pattern */}
          <div
            className="hidden lg:block"
            aria-hidden="true"
            style={{ backgroundImage: diagonalPattern }}
          />

          {/* col 3 (lg) */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* col 4 (lg) / mobile col 1 — 10+ */}
          <div className="flex flex-col justify-end pb-8 px-6 lg:px-0 lg:pl-6">
            <span
              className="font-extrabold tracking-tighter leading-none text-white"
              style={{ fontSize: 'clamp(40px, 4vw, 60px)', textShadow: `0 1px 16px color-mix(in srgb, var(--hero-warm-shadow) 20%, transparent)` }}
            >
              10+
            </span>
            <span className="text-xs text-foreground/55 mt-1.5">years of XP</span>
          </div>

          {/* col 5 (lg) / mobile col 2 — Open */}
          <div className="flex flex-col justify-end pb-8 px-6 lg:px-0 lg:pl-6">
            <span
              className="font-extrabold tracking-tighter leading-none text-white"
              style={{ fontSize: 'clamp(40px, 4vw, 60px)', textShadow: `0 1px 16px color-mix(in srgb, var(--hero-warm-shadow) 20%, transparent)` }}
            >
              Open
            </span>
            <span className="text-xs text-foreground/55 mt-1.5">for full-time roles</span>
          </div>

          {/* col 6 (lg) — diagonal pattern */}
          <div
            className="hidden lg:block"
            aria-hidden="true"
            style={{ backgroundImage: diagonalPattern }}
          />

          {/* col 7 (lg) */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
