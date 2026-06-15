'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const colorTokens = [
  { name: '--background', label: 'Background', hex: '#ffffff', style: { background: 'var(--background)', outline: '1px solid var(--border)' } },
  { name: '--foreground', label: 'Foreground', hex: '#0f172a', style: { background: 'var(--foreground)' } },
  { name: '--accent', label: 'Accent', hex: '#2563eb', style: { background: 'var(--accent)' } },
  { name: '--muted', label: 'Muted', hex: '#f8fafc', style: { background: 'var(--muted)', outline: '1px solid var(--border)' } },
  { name: '--border', label: 'Border', hex: '#e2e8f0', style: { background: 'var(--border)' } },
  { name: '--muted-foreground', label: 'Muted text', hex: '#64748b', style: { background: 'var(--muted-foreground)' } },
] as const

const typeRows = [
  { meta: '48 · 800', cls: 'text-5xl font-extrabold tracking-tight', sample: 'Maxime Luet' },
  { meta: '24 · 600', cls: 'text-2xl font-semibold tracking-tight', sample: 'Design where decisions happen.' },
  { meta: '16 · 400', cls: 'text-base font-normal leading-relaxed', sample: 'Based in France, I design and ship UI and design systems.' },
  { meta: '12 · 500', cls: 'text-xs font-medium font-mono tracking-wide', sample: 'Product Designer · 2022–2024' },
] as const

export function SystemSection() {
  const [hoveredToken, setHoveredToken] = useState<string | null>(null)

  return (
    <section id="system" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary lg:text-4xl">System</h2>
          <p className="text-base leading-relaxed text-text-secondary">
            The token layer behind every page. Same values in Figma and in code — colours,
            type, and components that compose the whole site.
          </p>
        </div>

        {/* Color tokens */}
        <div className="mb-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Colour tokens
          </p>
          <div className="flex flex-wrap gap-6">
            {colorTokens.map((token) => (
              <div
                key={token.name}
                className="flex cursor-default flex-col gap-2"
                onMouseEnter={() => setHoveredToken(token.name)}
                onMouseLeave={() => setHoveredToken(null)}
              >
                <div className="size-10 rounded-lg" style={token.style} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-primary">{token.label}</span>
                  <span className="font-mono text-xs text-text-tertiary">
                    {hoveredToken === token.name ? token.hex : token.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Hero gradient strip */}
            <div className="flex cursor-default flex-col gap-2">
              <div
                className="size-10 rounded-lg"
                style={{ background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-mid) 50%, var(--hero-green) 100%)' }}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-primary">Hero</span>
                <span className="font-mono text-xs text-text-tertiary">--hero-*</span>
              </div>
            </div>
          </div>
        </div>

        {/* Type scale */}
        <div className="mb-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Type scale · Plus Jakarta Sans
          </p>
          <div className="flex flex-col divide-y divide-border">
            {typeRows.map((row) => (
              <div key={row.meta} className="flex items-baseline gap-6 py-5">
                <span className="w-16 flex-shrink-0 font-mono text-xs text-text-tertiary">
                  {row.meta}
                </span>
                <span className={`${row.cls} text-primary`}>{row.sample}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Components */}
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Components
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Read case study</Button>
            <Button variant="outline">Read case study</Button>
            <Button variant="ghost">Read case study</Button>
            <Button disabled>Disabled</Button>

            {/* Hero badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: 'var(--badge-accent-bg)',
                border: '1px solid var(--badge-accent-border)',
                color: 'var(--accent)',
              }}
            >
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Open to remote roles
            </span>

            {/* Work card tag */}
            <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-text-secondary">
              Design System
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
