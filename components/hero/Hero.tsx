'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import gsap from 'gsap'

const HeroCanvas = dynamic(
  () => import('./HeroCanvas').then(m => ({ default: m.HeroCanvas })),
  { ssr: false },
)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const diagonalPattern = `repeating-linear-gradient(-45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 9px)`

export function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const bgRef         = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLDivElement>(null)
  const navLineRef    = useRef<HTMLDivElement>(null)
  const vLinesRef     = useRef<HTMLDivElement[]>([])
  const hStatsLineRef = useRef<HTMLDivElement>(null)
  const diag1Ref      = useRef<HTMLDivElement>(null)
  const diag2Ref      = useRef<HTMLDivElement>(null)
  const h1Ref         = useRef<HTMLHeadingElement>(null)
  const subRef        = useRef<HTMLParagraphElement>(null)
  const locRef        = useRef<HTMLDivElement>(null)
  const stat1Ref      = useRef<HTMLDivElement>(null)
  const stat2Ref      = useRef<HTMLDivElement>(null)

  // Computed at component level so HeroCanvas can receive it too
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const navEl     = document.querySelector<HTMLElement>('[data-sticky-nav]')
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches

    // ── État initial caché ───────────────────────────────────────────────
    gsap.set(bgRef.current,     { opacity: 0 })
    gsap.set(canvasRef.current, { opacity: 0 })
    if (navEl) gsap.set(navEl,  { opacity: 0, yPercent: -100 })

    if (isDesktop) {
      gsap.set(vLinesRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(navLineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(hStatsLineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set([diag1Ref.current, diag2Ref.current], { opacity: 0 })
    } else {
      gsap.set(hStatsLineRef.current, { scaleX: 1 })
    }

    gsap.set(h1Ref.current!.querySelectorAll('.hero-word'), { y: '110%' })
    gsap.set([subRef.current, locRef.current], { opacity: 0, y: 10 })
    gsap.set([stat1Ref.current, stat2Ref.current], { opacity: 0, y: 12 })

    // ── Timeline d'entrance ─────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (isDesktop) {
      // Phase 1 — fond + canvas fractal
      tl.to(bgRef.current,     { opacity: 1, duration: 0.9, ease: 'power2.inOut' })
      tl.to(canvasRef.current, { opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.7')

      // Phase 2 — lignes de grille
      tl.to(vLinesRef.current,    { scaleY: 1, duration: 0.65, stagger: 0.06, ease: 'power3.inOut' }, '-=0.3')
      tl.to(navLineRef.current,   { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, '<')
      tl.to(hStatsLineRef.current,{ scaleX: 1, duration: 0.5,  ease: 'power3.inOut' }, '<+=0.15')

      // Phase 3 — diagonales + header
      tl.to([diag1Ref.current, diag2Ref.current], { opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power2.out' }, '-=0.1')
      if (navEl) tl.to(navEl, { opacity: 1, yPercent: 0, duration: 0.5, ease: 'expo.out' }, '<+=0.05')

      // Phase 4 — textes
      tl.to(h1Ref.current!.querySelectorAll('.hero-word'), { y: '0%', duration: 0.65, stagger: 0.14 }, '-=0.15')
      tl.to(subRef.current,  { opacity: 1, y: 0, duration: 0.5  }, '-=0.35')
      tl.to(locRef.current,  { opacity: 1, y: 0, duration: 0.4  }, '-=0.25')
      tl.to([stat1Ref.current, stat2Ref.current], { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, '-=0.2')

    } else {
      // Mobile — séquence compressée
      tl.to(bgRef.current,     { opacity: 1, duration: 0.7, ease: 'power2.inOut' })
      tl.to(canvasRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      if (navEl) tl.to(navEl, { opacity: 1, yPercent: 0, duration: 0.45 }, '-=0.1')
      tl.to(h1Ref.current!.querySelectorAll('.hero-word'), { y: '0%', duration: 0.6, stagger: 0.12 }, '-=0.1')
      tl.to(subRef.current,  { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
      tl.to(locRef.current,  { opacity: 1, y: 0, duration: 0.35 }, '-=0.2')
      tl.to([stat1Ref.current, stat2Ref.current], { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.15')
    }

    return () => {
      tl.kill()
      if (navEl) gsap.killTweensOf(navEl)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden" aria-label="Introduction">

      {/* Background base — solid #1f1f1f, visible while canvas loads */}
      <div ref={bgRef} aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'var(--hero-bg)' }} />

      {/* Fractal glass gradient canvas (replaces WebP blobs) */}
      <div ref={canvasRef} aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <HeroCanvas reducedMotion={reducedMotion} />
      </div>

      {/* Grid lines overlay — desktop only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            ref={el => { if (el) vLinesRef.current[i - 1] = el }}
            className="absolute top-0 h-full w-px bg-white/[0.1] origin-top will-change-transform"
            style={{ left: `${(i / 7) * 100}%` }}
          />
        ))}
      </div>

      {/* Nav row bottom border */}
      <div ref={navLineRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-20 h-px bg-white/[0.1] origin-left will-change-transform" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col">

        {/* Main content zone */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-7 pt-20">
          <div className="hidden lg:block" aria-hidden="true" /> {/* col 1 */}

          <div className="col-span-1 lg:col-span-5 flex flex-col px-6 lg:px-0">
            <div className="flex-1 flex flex-col justify-center">
              <h1
                ref={h1Ref}
                className="flex gap-4 font-semibold leading-none text-black"
                style={{ fontSize: 'clamp(48px, 8.33vw, 120px)', letterSpacing: '-4.2px' }}
              >
                <span className="inline-block overflow-hidden align-bottom pb-[0.15em]">
                  <span className="hero-word inline-block">Product</span>
                </span>
                <span className="inline-block overflow-hidden align-bottom pb-[0.15em]">
                  <span className="hero-word inline-block">Designer</span>
                </span>
              </h1>

              <p ref={subRef} className="mt-2.5 text-white" style={{ fontSize: '20px' }}>
                I design UI for digital products and ship design systems.
              </p>
            </div>

            <div ref={locRef} className="flex items-center gap-1 p-2 text-base text-white">
              <MapPin size={16} aria-hidden="true" />
              Based in France
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" /> {/* col 7 */}
        </div>

        <div
          ref={hStatsLineRef}
          aria-hidden="true"
          className="h-px bg-white/[0.1] origin-left will-change-transform"
        />

        {/* Stats zone */}
        <div className="grid grid-cols-2 lg:grid-cols-7 h-[180px] lg:h-[257px]">
          <div className="hidden lg:block" aria-hidden="true" />

          <div
            ref={diag1Ref}
            className="hidden lg:block"
            aria-hidden="true"
            style={{ backgroundImage: diagonalPattern }}
          />

          <div className="hidden lg:block" aria-hidden="true" />

          <div ref={stat1Ref} className="flex flex-col justify-center p-[24px] border-r border-white/[0.1] lg:border-r-0">
            <span
              className="font-medium leading-none text-white text-[34px] lg:text-[44px]"
              style={{ letterSpacing: '-1.5px' }}
            >
              10+
            </span>
            <span className="text-sm text-white/[72%]">years of XP</span>
          </div>

          <div ref={stat2Ref} className="flex flex-col justify-center p-[24px] border-r border-white/[0.1] lg:border-r-0">
            <span
              className="font-medium leading-none text-white text-[34px] lg:text-[44px]"
              style={{ letterSpacing: '-1.5px' }}
            >
              Open
            </span>
            <span className="text-sm text-white/[72%]">for full-time roles</span>
          </div>

          <div
            ref={diag2Ref}
            className="hidden lg:block"
            aria-hidden="true"
            style={{ backgroundImage: diagonalPattern }}
          />

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
