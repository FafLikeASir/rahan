'use client'

import type { CSSProperties } from 'react'

/* ─── Grain SVG (inline, no PNG dep) ───────────────────────────────── */
const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

type StyledDiv = CSSProperties & { '--delay'?: string }

const SWATCH_COLORS = [
  'var(--gradient-blue)',
  'var(--gradient-cyan)',
  'var(--gradient-emerald)',
  'rgba(99,102,241,.8)',
]

export function Hero() {
  return (
    <>
      {/* ── Hero section ───────────────────────────────────────────── */}
      <section
        className="relative min-h-[400px] overflow-hidden sm:min-h-[560px] lg:min-h-svh"
        style={{ background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-deep) 30%, var(--hero-mid) 55%, var(--hero-teal) 78%, var(--hero-green) 100%)' }}
        aria-label="Introduction"
      >
        {/* Grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />

        {/* Mesh radials */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: '60%', height: '70%',
              top: '-20%', left: '-10%',
              background: 'radial-gradient(ellipse, var(--hero-mesh-blue) 0%, transparent 70%)',
              willChange: 'transform',
              animation: 'meshDrift1 18s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '50%', height: '60%',
              top: '10%', right: '-5%',
              background: 'radial-gradient(ellipse, var(--hero-mesh-cyan) 0%, transparent 70%)',
              willChange: 'transform',
              animation: 'meshDrift2 22s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '45%', height: '55%',
              bottom: '-15%', left: '30%',
              background: 'radial-gradient(ellipse, var(--hero-mesh-emerald) 0%, transparent 70%)',
              willChange: 'transform',
              animation: 'meshDrift3 16s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '35%', height: '40%',
              top: '30%', left: '20%',
              background: 'radial-gradient(ellipse, var(--hero-mesh-indigo) 0%, transparent 70%)',
              willChange: 'transform',
              animation: 'meshDrift4 20s ease-in-out infinite',
            }}
          />
        </div>

        {/* Aurora streaks */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            style={{
              position: 'absolute',
              top: '15%', left: '10%',
              width: '40%', height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--hero-aurora-cyan), transparent)',
              filter: 'blur(2px)',
              willChange: 'transform',
              animation: 'aurora1 20s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '55%', right: '5%',
              width: '30%', height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--hero-aurora-blue), transparent)',
              filter: 'blur(1px)',
              willChange: 'transform',
              animation: 'aurora2 25s ease-in-out infinite',
            }}
          />
        </div>

        {/* Glass elements (right side, desktop only) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          {/* Glass A — component spec silhouette */}
          <div
            style={{
              position: 'absolute',
              top: '18%', right: '8%',
              width: 180, height: 100,
              borderRadius: 14,
              border: '1px solid var(--hero-glass-a-border)',
              background: 'var(--hero-glass-a-bg)',
              backdropFilter: 'blur(1px)',
              willChange: 'transform',
              animation: 'glassFloat1 12s ease-in-out infinite',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gradient-emerald)', opacity: 0.8 }} />
              <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(255,255,255,.12)' }} />
            </div>
            <div style={{ width: '80%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,.07)' }} />
            <div style={{ width: '60%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,.07)' }} />
            <div style={{ marginTop: 'auto', height: 3, borderRadius: 2, background: 'linear-gradient(90deg, var(--gradient-blue), var(--gradient-cyan), var(--gradient-emerald))', opacity: 0.6 }} />
          </div>

          {/* Glass B — color token swatches */}
          <div
            style={{
              position: 'absolute',
              top: '42%', right: '15%',
              width: 140, height: 80,
              borderRadius: 12,
              border: '1px solid var(--hero-glass-b-border)',
              background: 'var(--hero-glass-b-bg)',
              backdropFilter: 'blur(1px)',
              willChange: 'transform',
              animation: 'glassFloat2 10s ease-in-out infinite',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              {SWATCH_COLORS.map((c, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: c, opacity: 0.75 }} />
              ))}
            </div>
            <div style={{ width: '70%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,.08)' }} />
            <div style={{ width: '50%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,.05)' }} />
          </div>

          {/* Glass C — minimal */}
          <div
            style={{
              position: 'absolute',
              bottom: '20%', right: '5%',
              width: 120, height: 60,
              borderRadius: 10,
              border: '1px solid var(--hero-grid)',
              background: 'var(--hero-glass-c-bg)',
              backdropFilter: 'blur(1px)',
              willChange: 'transform',
              animation: 'glassFloat3 14s ease-in-out infinite',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ width: '85%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,.09)' }} />
            <div style={{ width: '60%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,.06)' }} />
          </div>
        </div>

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 30% 50%, transparent 40%, var(--hero-vignette) 100%)',
          }}
        />

        {/* Grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.025]"
          style={{
            backgroundImage: grainSvg,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            mixBlendMode: 'overlay',
          }}
        />

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-end px-6 pb-20 pt-32 lg:px-8 lg:pt-40 lg:pb-24">
          {/* Badge */}
          <div className="mb-8 hero-fade" style={{ '--delay': '0ms' } as StyledDiv}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: 'var(--hero-badge-bg)',
                border: '1px solid var(--hero-badge-border)',
                backdropFilter: 'blur(4px)',
                color: 'var(--hero-badge-text)',
              }}
            >
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Open to remote roles
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mb-3 text-5xl font-extrabold tracking-tight text-white lg:text-6xl hero-fade"
            style={{ textShadow: '0 2px 24px var(--hero-shadow-text)', '--delay': '80ms' } as StyledDiv}
          >
            Maxime Luet
          </h1>

          {/* Subheading */}
          <p
            className="mb-4 text-xl font-medium lg:text-2xl hero-fade"
            style={{ color: 'var(--hero-text-1)', '--delay': '160ms' } as StyledDiv}
          >
            Product Designer who codes
          </p>

          {/* Body */}
          <p
            className="mb-8 max-w-sm text-body-sm leading-relaxed hero-fade"
            style={{ color: 'var(--hero-text-2)', '--delay': '240ms' } as StyledDiv}
          >
            Based in France, I design and ship UI and design systems.
          </p>

          {/* Figma → production arrow */}
          <div
            className="flex items-center gap-3 hero-fade"
            style={{ '--delay': '320ms' } as StyledDiv}
          >
            <span className="text-sm font-medium" style={{ color: 'var(--hero-text-3)' }}>
              from Figma
            </span>
            <svg width="80" height="12" viewBox="0 0 80 12" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" style={{ stopColor: 'var(--gradient-blue)', stopOpacity: 0.45 }} />
                  <stop offset="50%" style={{ stopColor: 'var(--gradient-cyan)', stopOpacity: 0.45 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--gradient-emerald)', stopOpacity: 0.45 }} />
                </linearGradient>
              </defs>
              {/* Static base line */}
              <line x1="0" y1="6" x2="68" y2="6" stroke="url(#arrowGrad)" strokeWidth="1.5" />
              <polyline points="62,2 74,6 62,10" fill="none" stroke="url(#arrowGrad)" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Traveling sweep highlight */}
              <line
                className="arrow-sweep-line"
                x1="0" y1="6" x2="68" y2="6"
                stroke="rgba(255,255,255,.75)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--hero-text-3)' }}>
              to production
            </span>
          </div>
        </div>

        {/* Hero → content fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        />
      </section>

      {/* ── Keyframe animations ──────────────────────────────────────── */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          /* Content entrance — staggered fade + slide */
          .hero-fade {
            animation: heroFadeIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
            animation-delay: var(--delay, 0ms);
          }
          @keyframes heroFadeIn {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* Availability dot — subtle pulse */
          .dot-pulse {
            animation: dotPulse 2.4s ease-in-out infinite;
          }
          @keyframes dotPulse {
            0%, 100% { opacity: 1;   transform: scale(1); }
            50%      { opacity: 0.45; transform: scale(0.8); }
          }

          /* Arrow sweep — light travels across the line */
          .arrow-sweep-line {
            stroke-dasharray: 18 68;
            stroke-dashoffset: 86;
            animation: arrowSweep 2.5s ease-in-out infinite;
            animation-delay: 1.2s;
          }
          @keyframes arrowSweep {
            from { stroke-dashoffset:  86; opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            to   { stroke-dashoffset: -86; opacity: 0; }
          }

          /* Mesh drifts */
          @keyframes meshDrift1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50%      { transform: translate(3%, 5%) scale(1.08); }
          }
          @keyframes meshDrift2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33%      { transform: translate(-4%, 3%) scale(1.05); }
            66%      { transform: translate(2%, -4%) scale(0.95); }
          }
          @keyframes meshDrift3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50%      { transform: translate(-3%, -4%) scale(1.06); }
          }
          @keyframes meshDrift4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40%      { transform: translate(4%, -2%) scale(1.04); }
            80%      { transform: translate(-2%, 3%) scale(0.97); }
          }

          /* Glass float */
          @keyframes glassFloat1 {
            0%, 100% { transform: translateY(0)     rotate(0deg); }
            50%      { transform: translateY(-10px)  rotate(0.5deg); }
          }
          @keyframes glassFloat2 {
            0%, 100% { transform: translateY(0)    rotate(0deg); }
            50%      { transform: translateY(-8px)  rotate(-0.4deg); }
          }
          @keyframes glassFloat3 {
            0%, 100% { transform: translateY(0)    rotate(0deg); }
            50%      { transform: translateY(-6px)  rotate(0.3deg); }
          }

          /* Aurora */
          @keyframes aurora1 {
            0%, 100% { transform: translateX(0)   scaleX(1);   opacity: .3; }
            50%      { transform: translateX(8%)  scaleX(1.2); opacity: .6; }
          }
          @keyframes aurora2 {
            0%, 100% { transform: translateX(0)   scaleX(1);   opacity: .25; }
            50%      { transform: translateX(-6%) scaleX(0.9); opacity: .5; }
          }
        }
      `}</style>
    </>
  )
}
