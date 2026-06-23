'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import gsap from 'gsap'
import { grainSvg } from '@/lib/utils'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const diagonalPattern = `repeating-linear-gradient(-45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 9px)`

export function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const bgRef         = useRef<HTMLDivElement>(null)
  const blobRef       = useRef<HTMLImageElement>(null)
  const slateBlobRef  = useRef<HTMLImageElement>(null)
  const navLineRef    = useRef<HTMLDivElement>(null)
  const vLinesRef     = useRef<HTMLDivElement[]>([])
  const hStatsLineRef = useRef<HTMLDivElement>(null)
  const diag1Ref      = useRef<HTMLDivElement>(null)
  const diag2Ref      = useRef<HTMLDivElement>(null)
  const h1Ref         = useRef<HTMLHeadingElement>(null)
  const subRef        = useRef<HTMLParagraphElement>(null)
  const locRef        = useRef<HTMLDivElement>(null)
  const statsRef      = useRef<HTMLDivElement>(null)
  const stat1Ref      = useRef<HTMLDivElement>(null)
  const stat2Ref      = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section  = sectionRef.current!
    const blob     = blobRef.current!
    const navEl    = document.querySelector<HTMLElement>('[data-sticky-nav]')
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches

    // ── État initial caché ───────────────────────────────────────────────
    gsap.set(bgRef.current, { opacity: 0 })
    gsap.set(blob, { opacity: 0, scale: 0.7 })
    gsap.set(slateBlobRef.current, { opacity: 0 })
    if (navEl) gsap.set(navEl, { opacity: 0, yPercent: -100 })

    if (isDesktop) {
      gsap.set(vLinesRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(navLineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(hStatsLineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set([diag1Ref.current, diag2Ref.current], { opacity: 0 })
    } else {
      // Mobile : stats line visible immédiatement (pas d'animation de ligne)
      gsap.set(hStatsLineRef.current, { scaleX: 1 })
    }

    gsap.set(h1Ref.current!.querySelectorAll('.hero-word'), { y: '110%' })
    gsap.set([subRef.current, locRef.current], { opacity: 0, y: 10 })
    gsap.set([stat1Ref.current, stat2Ref.current], { opacity: 0, y: 12 })

    // ── Wander per-axis — chaque propriété oscille indépendamment ───────
    function wander(el: HTMLElement, prop: string, min: number, max: number, durMin: number, durMax: number) {
      gsap.to(el, {
        [prop]: gsap.utils.random(min, max),
        duration: gsap.utils.random(durMin, durMax),
        ease: 'sine.inOut',
        onComplete: () => wander(el, prop, min, max, durMin, durMax),
      })
    }

    // Closure pour le cleanup du mousemove (défini après onComplete)
    let removeMouseMove: (() => void) | null = null

    // ── Timeline d'entrance ─────────────────────────────────────────────
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        // Orange blob — 3 axes indépendants, Lissajous organique
        wander(blob, 'xPercent', -28,  28,  7, 13)
        wander(blob, 'yPercent', -22,  22,  5, 10)
        wander(blob, 'scale',   0.85, 1.2,  4,  8)
        // Slate blob — plus subtil, plus lent
        wander(slateBlobRef.current!, 'xPercent', -12, 12, 11, 18)
        wander(slateBlobRef.current!, 'yPercent',  -8,  8,  9, 15)

        // Mouse parallax en x/y pixels — s'additionne au drift sans le court-circuiter
        const xTo = gsap.quickTo(blob, 'x', { duration: 1.5, ease: 'power2.out' })
        const yTo = gsap.quickTo(blob, 'y', { duration: 1.5, ease: 'power2.out' })

        const onMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = section.getBoundingClientRect()
          xTo(((e.clientX - left) / width  - 0.5) * 50)
          yTo(((e.clientY - top)  / height - 0.5) * 35)
        }
        section.addEventListener('mousemove', onMouseMove)
        removeMouseMove = () => section.removeEventListener('mousemove', onMouseMove)
      },
    })

    if (isDesktop) {
      // Phase 1 — fond noir → bg fade
      tl.to(bgRef.current, { opacity: 1, duration: 0.9, ease: 'power2.inOut' })

      // Phase 2 — blobs : apparition propre
      tl.to(slateBlobRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.1')
      tl.to(blob, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, '-=0.6')

      // Phase 3 — lignes de grille
      tl.to(vLinesRef.current, { scaleY: 1, duration: 0.65, stagger: 0.06, ease: 'power3.inOut' }, '-=0.3')
      tl.to(navLineRef.current, { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, '<')
      tl.to(hStatsLineRef.current, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }, '<+=0.15')

      // Phase 4 — diagonales + header
      tl.to([diag1Ref.current, diag2Ref.current], { opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power2.out' }, '-=0.1')
      if (navEl) tl.to(navEl, { opacity: 1, yPercent: 0, duration: 0.5, ease: 'expo.out' }, '<+=0.05')

      // Phase 5 — textes
      tl.to(h1Ref.current!.querySelectorAll('.hero-word'), { y: '0%', duration: 0.65, stagger: 0.14 }, '-=0.15')
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
      tl.to(locRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
      tl.to([stat1Ref.current, stat2Ref.current], { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, '-=0.2')

    } else {
      // Mobile — séquence compressée sans lignes
      tl.to(bgRef.current, { opacity: 1, duration: 0.7, ease: 'power2.inOut' })
      tl.to(blob, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, duration: 0.6 }, '-=0.1')
      tl.to(slateBlobRef.current, { opacity: 1, duration: 0.5 }, '<')
      if (navEl) tl.to(navEl, { opacity: 1, yPercent: 0, duration: 0.45 }, '-=0.1')
      tl.to(h1Ref.current!.querySelectorAll('.hero-word'), { y: '0%', duration: 0.6, stagger: 0.12 }, '-=0.1')
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
      tl.to(locRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.2')
      tl.to([stat1Ref.current, stat2Ref.current], { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.15')
    }

    return () => {
      tl.kill()
      gsap.killTweensOf([blob, slateBlobRef.current])
      if (navEl) gsap.killTweensOf(navEl)
      removeMouseMove?.()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden" aria-label="Introduction">

      {/* Background base */}
      <div ref={bgRef} aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'var(--hero-bg)' }} />

      {/* Warm orange blob — entrance + drift + mouse parallax */}
      {/* ponytail: pre-rendered WebP, CSS filter blur was too expensive on GPU */}
      <img
        ref={blobRef}
        src="/blobs/blob-orange.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* Slate blob (bottom-left) — drift ambiant */}
      <img
        ref={slateBlobRef}
        src="/blobs/blob-blue.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute will-change-transform"
        style={{ left: '-30%', bottom: '-50%', width: '160%', height: 'auto' }}
      />

      {/* Noise grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: grainSvg, backgroundSize: '300px 300px', mixBlendMode: 'color-burn' }}
      />

      {/* Grid lines overlay — desktop only, animées en phase 3 */}
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
            {/* Centered text zone */}
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

            {/* Location pinned to bottom */}
            <div ref={locRef} className="flex items-center gap-1 p-2 text-base text-white">
              <MapPin size={16} aria-hidden="true" />
              Based in France
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" /> {/* col 7 */}
        </div>

        {/* Stats horizontal separator — remplace border-t sur le stats container */}
        <div
          ref={hStatsLineRef}
          aria-hidden="true"
          className="h-px bg-white/[0.1] origin-left will-change-transform"
        />

        {/* Stats zone */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-7 h-[180px] lg:h-[257px]">
          {/* col 1 (lg) */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* col 2 (lg) — diagonal pattern */}
          <div
            ref={diag1Ref}
            className="hidden lg:block"
            aria-hidden="true"
            style={{ backgroundImage: diagonalPattern }}
          />

          {/* col 3 (lg) */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* col 4 (lg) / mobile col 1 — 10+ */}
          <div ref={stat1Ref} className="flex flex-col justify-center p-[24px] border-r border-white/[0.1] lg:border-r-0">
            <span
              className="font-medium leading-none text-white text-[34px] lg:text-[44px]"
              style={{ letterSpacing: '-1.5px' }}
            >
              10+
            </span>
            <span className="text-sm text-white/[72%]">years of XP</span>
          </div>

          {/* col 5 (lg) / mobile col 2 — Open */}
          <div ref={stat2Ref} className="flex flex-col justify-center p-[24px] border-r border-white/[0.1] lg:border-r-0">
            <span
              className="font-medium leading-none text-white text-[34px] lg:text-[44px]"
              style={{ letterSpacing: '-1.5px' }}
            >
              Open
            </span>
            <span className="text-sm text-white/[72%]">for full-time roles</span>
          </div>

          {/* col 6 (lg) — diagonal pattern */}
          <div
            ref={diag2Ref}
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
