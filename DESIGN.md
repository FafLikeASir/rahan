---
version: "1.0"
name: portfolio-maxime-luet
description: >
  Portfolio of a UI & Design System–focused Product Designer who codes.
  Warm dark language (cinematic hero) → editorial white (body).
  One orange accent, one type family, maximum restraint outside the hero.

colors:
  # ── Editorial surfaces (body) ────────────────────────────────────────
  background: "#ffffff"
  foreground: "oklch(0.208 0.042 265.755)"    # slate-900
  muted: "oklch(0.984 0.003 247.858)"         # slate-50
  muted-foreground: "oklch(0.554 0.046 257.417)"  # slate-500
  border: "oklch(0.929 0.013 255.508)"        # slate-200

  # ── Semantic text ────────────────────────────────────────────────────
  text-primary: "oklch(0.208 0.042 265.755)"   # slate-900
  text-secondary: "oklch(0.446 0.043 257.281)" # slate-600
  text-tertiary: "oklch(0.554 0.046 257.417)"  # slate-500

  # ── Accent (P2 arrow, focus rings) ───────────────────────────────────
  accent: "oklch(0.488 0.196 258.5)"           # blue-600
  accent-foreground: "#ffffff"

  # ── Hero: warm dark ──────────────────────────────────────────────────
  hero-bg: "#1f1f1f"
  hero-orange: "#fb3706"    # main blob, signature color
  hero-rust: "#7D330E"      # secondary blob (warm rust)
  hero-shadow: "#782800"    # deep orange shadow

  # ── Hero: text on dark background ────────────────────────────────────
  hero-text-1: "rgba(255,255,255,0.85)"
  hero-text-2: "rgba(255,255,255,0.55)"
  hero-text-3: "rgba(255,255,255,0.45)"

typography:
  display-xl:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    use: "Hero headline (Product Designer)"
  display-lg:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    use: "Section headings"
  display-md:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    use: "Card titles, Method principles"
  body-lg:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    use: "Lead paragraphs, intro sections"
  body-md:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    use: "Standard body text"
  body-sm:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
    use: "Metadata, nav links, captions"
  label:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
    use: "Tags, badges, rare uppercase labels"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    use: "Technical labels, hero stats (accent only)"

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  section: 128px

rounded:
  sm: 4px     # inputs, tags
  md: 8px     # cards
  lg: 12px    # large cards
  xl: 16px    # work cards
  full: 9999px

components:
  sticky-nav:
    backgroundColor: "transparent (hero) → rgba(255,255,255,0.9) backdrop-blur (scrolled)"
    height: 80px
    grid: "7-col, logo col2-3, links col4-5, badge col6"
  hero-section:
    backgroundColor: "{colors.hero-bg}"
    minHeight: "100dvh"
    grid: "7-col visible via border-white/10"
    blobs: "centered animated orange + warm rust depth blobs + SVG grain 25%"
  work-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.border}"
  section-editorial:
    backgroundColor: "{colors.background}"
    paddingY: "{spacing.section}"
    maxWidth: "1440px centered, content in cols 2-6 (≈ 72% of viewport)"

---

## Overview

Personal portfolio of Maxime Luet, UI & Design System Product Designer who codes.
Dual audience: recruiter scanning in 6s + head of design inspecting craft.

**Structural principle:** cinematic warm dark hero (the site's sole expressive moment) → transition → patient editorial white (everything else). Restraint *is* the signal.

**Visual identity:** one strong accent (orange `{colors.hero-orange}` and its slate variant `{colors.hero-slate}`), one type family (Plus Jakarta Sans, well-tuned), no decoration outside the hero. Density increases toward the interior — the scan sees little, the inspection sees everything.

## Do

- Use `{colors.hero-orange}` as the sole expressive accent (outside blue UI interactions)
- Aggressive negative tracking on display headings (`-0.03em` to `-0.015em`)
- `min-h-[100dvh]` — never `h-screen`
- Semantic CSS tokens (`text-primary`, `text-secondary`) — never hardcoded hex values
- Grain + blobs in the hero only, not on other sections
- One type family only; JetBrains Mono as a *rare* accent (stats, technical labels)
- Precise credits and scope in case studies

## Don't

- `bg-white` or hardcoded hex colors outside the hero (use tokens)
- Dark mode — editorial light is the deliberate choice
- Decorative gradient / glass outside the hero
- Second type family as a theme (one only, period)
- Monospace / terminal as a global mood (rare accent only)
- `framer-motion` / `motion` — GSAP only, during animation phase
- Generic vocabulary: "crafted", "pixel-perfect", "passionate", "seamless"
- Double diamond or decorative process maps
- Isolated dark sections in a light context (global theme lock)
- Em-dash (`—`) everywhere — use a hyphen or restructure

## Full references

- Full creative direction: `docs/93-creative-direction.md`
- Hero specification: `docs/95-hero-visual-spec.md`
- Architecture & conventions: `docs/96-project-structure.md`
- Live CSS tokens: `app/global.css` (`@theme inline`)
