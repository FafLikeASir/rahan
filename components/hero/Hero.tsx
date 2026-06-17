'use client'

import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import gsap from 'gsap'
import { grainSvg } from '@/lib/utils'

const diagonalPattern = `repeating-linear-gradient(-45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 9px)`

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const blobRef    = useRef<HTMLDivElement>(null)
  const h1Ref      = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const locRef     = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current!
    const blob    = blobRef.current!

    // ── Entrance timeline ────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl
      .from(bgRef.current, { opacity: 0, duration: 0.8, ease: 'power2.out' })
      .from(
        h1Ref.current!.querySelectorAll('.hero-word'),
        { y: '110%', duration: 0.7, stagger: 0.15 },
        '-=0.4',
      )
      .from(subRef.current,  { opacity: 0, y: 10, duration: 0.5 }, '-=0.3')
      .from(locRef.current,  { opacity: 0, duration: 0.4 },        '-=0.2')
      .from(statsRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')

    // ── Blob breathing — only scale, GPU-composited ──────────────────
    const breathing = gsap.to(blob, {
      scale: 1.07,
      duration: 9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // ── Mouse parallax — moves blob in xPercent/yPercent ────────────
    const xTo = gsap.quickTo(blob, 'xPercent', { duration: 1.5, ease: 'power2.out' })
    const yTo = gsap.quickTo(blob, 'yPercent', { duration: 1.5, ease: 'power2.out' })

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = section.getBoundingClientRect()
      xTo(((e.clientX - left) / width  - 0.5) *  8)
      yTo(((e.clientY - top)  / height - 0.5) *  6)
    }

    section.addEventListener('mousemove', onMouseMove)

    return () => {
      tl.kill()
      breathing.kill()
      gsap.killTweensOf(blob)
      section.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden" aria-label="Introduction">

      {/* Background base */}
      <div ref={bgRef} aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'var(--hero-bg)' }} />

      {/* Warm orange blob — animated independently */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ backgroundImage: 'radial-gradient(ellipse 44% 76% at 50% 50%, color-mix(in srgb, var(--hero-warm-orange) 90%, transparent) 0%, transparent 65%)' }}
      />

      {/* Slate blob (bottom-left) — static */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 52% 90% at 30% 100%, color-mix(in srgb, var(--hero-warm-slate) 75%, transparent) 0%, transparent 65%)' }}
      />

      {/* Noise grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: grainSvg, backgroundSize: '300px 300px', mixBlendMode: 'color-burn' }}
      />

      {/* Nav row bottom border — matches Figma grid row 1 border-b */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-20 h-px bg-white/[0.1]" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col">

        {/* Main content zone */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-7 pt-20 border-b border-white/[0.1]">
          <div className="hidden lg:block border-r border-white/[0.1]" aria-hidden="true" /> {/* col 1 */}

          <div className="col-span-1 lg:col-span-5 flex flex-col px-6 lg:px-0 border-r border-white/[0.1]">
            {/* Centered text zone */}
            <div className="flex-1 flex flex-col justify-center">
              <h1
                ref={h1Ref}
                className="flex gap-4 font-semibold leading-none text-black"
                style={{ fontSize: 'clamp(48px, 8.33vw, 120px)', letterSpacing: '-4.2px' }}
              >
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="hero-word inline-block">Product</span>
                </span>
                <span className="inline-block overflow-hidden align-bottom">
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

        {/* Stats zone */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-7 h-[180px] lg:h-[257px] border-t border-white/[0.1]">
          {/* col 1 (lg) */}
          <div className="hidden lg:block border-r border-white/[0.1]" aria-hidden="true" />

          {/* col 2 (lg) — diagonal pattern */}
          <div
            className="hidden lg:block border-r border-white/[0.1]"
            aria-hidden="true"
            style={{ backgroundImage: diagonalPattern }}
          />

          {/* col 3 (lg) */}
          <div className="hidden lg:block border-r border-white/[0.1]" aria-hidden="true" />

          {/* col 4 (lg) / mobile col 1 — 10+ */}
          <div className="flex flex-col justify-center p-[24px] border-r border-white/[0.1]">
            <span
              className="font-medium leading-none text-white text-[40px] lg:text-[52px]"
              style={{ letterSpacing: '-1.5px' }}
            >
              10+
            </span>
            <span className="text-base text-white/[72%]">years of XP</span>
          </div>

          {/* col 5 (lg) / mobile col 2 — Open */}
          <div className="flex flex-col justify-center p-[24px] border-r border-white/[0.1]">
            <span
              className="font-medium leading-none text-white text-[40px] lg:text-[52px]"
              style={{ letterSpacing: '-1.5px' }}
            >
              Open
            </span>
            <span className="text-base text-white/[72%]">for full-time roles</span>
          </div>

          {/* col 6 (lg) — diagonal pattern */}
          <div
            className="hidden lg:block border-r border-white/[0.1]"
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
