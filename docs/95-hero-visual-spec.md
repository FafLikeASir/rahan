# Portfolio Maxime Luet — Hero Visual Specification

> Hero visual specification — **current and validated direction**.
> Source of truth: Figma node `1:2` (Desktop - 1, 1440×1024).
> Required reading before any hero modification.
>
> Note: a blue-emerald direction was explored and **abandoned**.
> This file documents only the retained direction (warm dark).

---

## Guiding principle

The hero is the **magazine cover**. Maximum visual impact, the only place
on the site this expressive. The rest of the site is Editorial Restrained (white, typographic).

**Site structure:** cinematic warm dark hero → transition → editorial white.

---

## 1. Background

**Dark, near-black, with warm mesh.**

- Base: `#1f1f1f` (dark near-black, no flat gradient)
- Orange blob (main): `radial-gradient(ellipse 44% 76% at 50% 50%, rgba(251,55,6,0.9) 0%, transparent 65%)`
  — centered, animated (breathing + mouse parallax)
- Slate blob (secondary): `radial-gradient(ellipse 52% 90% at 30% 100%, rgba(90,118,145,0.75) 0%, transparent 65%)`
  — anchored bottom-left, static
- Grain: SVG noise overlay, **25% opacity**, `mix-blend-mode: color-burn`, tiled 300×300px

---

## 2. Grid structure

7 columns × 205.7px (on 1440px viewport) visible via white borders at 10%:

| Col | Hero content | Nav content |
|---|---|---|
| 1 | empty | empty |
| 2-3 | content zone (H1, subtitle, location) | Logo "Maxime Luet" |
| 4-5 | content zone | Nav links |
| 6 | content zone | Badge "Available for work" |
| 7 | empty | empty |

- `border-r border-white/[0.1]` between columns
- `border-b border-white/[0.1]` below the nav row (y=80px)
- `border-t border-white/[0.1]` above the stats zone

Stats zone: diagonal pattern in cols 2 and 6 (repeating-linear-gradient -45deg, white 8%).

---

## 3. Nav row (80px)

7-col grid (`grid-cols-7 h-20`):
- **Col 2-3** — Logo: "Maxime Luet", 20px, font-normal, white (transparent hero) / `text-primary` (scrolled)
- **Col 4-5** — Nav links: Work · Method · About · Contact, 16px, font-medium, white/50 (hero) / `text-text-secondary` (scrolled)
- **Col 6** — Badge "Available for work":
  - `border: 1px solid rgba(255,255,255,0.1)`
  - `background: linear-gradient(99deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.20) 100%)`
  - `backdrop-filter: blur(50px)`
  - `border-radius: 8px`, `padding: 8px`, `gap: 8px`
  - Green dot 8×8px (`bg-emerald-400`, glow `0 0 6px 2px rgba(52,211,153,0.55)`)
  - Text 14px, font-normal, white
  - Alignment in col 6: `justify-end` (right edge of col 6)

Sticky nav: `bg-transparent` inside the hero → `bg-background/95 backdrop-blur-sm border-b border-border` outside the hero.

---

## 4. Text content

```
# Product Designer
I design UI for digital products and ship design systems.
📍 Based in France
```

**Typography:**
- H1 "Product Designer": Plus Jakarta Sans, `clamp(48px, 8.33vw, 120px)`, weight 600, `text-black`, `tracking-[-4.2px]`, layout `flex gap-4`
  — black on dark background is intentional (warm contrast, forces readability)
- Subtitle: 20px, weight 400, `text-white` (100%)
- Location: 16px, weight 400, `text-white` (100%), MapPin Lucide icon

---

## 5. Stats zone (257px)

- Col 4: `10+` (stat) + `years of XP` (label)
- Col 5: `Open` (stat) + `for full-time roles` (label)
- Stat: `52px` (desktop) / `40px` (mobile), weight 500 (medium), white, tracking -1.5px
- Label: 16px, `rgba(255,255,255,0.72)`, no margin-top
- Cell layout: `flex flex-col justify-center p-[24px]` (vertical centering + uniform 24px padding)

---

## 6. Motion (GSAP + CSS)

**Entrance (GSAP timeline):**
1. Background fade in (0.8s, power2.out)
2. H1 words slide up from overflow-hidden mask (0.7s, stagger 0.15s, power3.out)
3. Subtitle fade+slide (0.5s)
4. Location fade (0.4s)
5. Stats fade+slide (0.5s)

**Ambient (GSAP, infinite):**
- Blob breathing: scale 1→1.07, 9s, sine.inOut, yoyo
- Mouse parallax: blob follows mouse via `quickTo` xPercent/yPercent, 1.5s

**`prefers-reduced-motion: reduce`** → entrance/ambient disabled, static hero.

---

## 7. Responsive

- **Desktop (≥1024px)**: full 7-col layout, nav grid, diagonal patterns
- **Mobile (<768px)**: hamburger nav, 2-col stats grid (not 7-col)

---

## 8. Performance

- **Desktop (>1024px)**: layout as described, glass elements visible
- **Tablet (768-1024px)**: reduced glass elements (2 instead of 4), more spaced grid lines
- **Mobile (<768px)**: no glass elements (too small to have impact), hidden grid lines, simplified mesh (2 instead of 4), shorter hero (400px instead of 520+). The cinematic feel is preserved via the background + vignette + grain.

---

## 10. Performance

- **No canvas/WebGL** at launch — pure CSS. If we want to push the mesh
  later (mouse interaction, particles), a canvas will be added on top.
- Mesh = `position: absolute` + `border-radius: 50%` + `filter: blur(60px)`
  + CSS animation. Lightweight, GPU-composited.
- Grain = inline SVG as background-image, tiled. No heavy PNG.
- `will-change: transform` on animated elements.
- Test framerate on mobile (large blurs can be expensive —
  reduce blur or disable on mobile if needed).

---

## Consolidated references

| Reference | What we take from it |
|---|---|
| rahan.vercel.app | The instinct for depth and multi-color richness |
| maximeluet.vercel.app | The blue→green corridor (hues), the grid — but NOT the flat gradient |
| Uprail | The cinematic vignette, the sense of horizon |
| Asterisk | The rich mesh gradient + grid lines visible through |
| Lynx | Aurora column light, grain, restraint |
| Pelmatech | Aurora in motion, glass UI cards in the scene |
| Mure | Real texture, the colored accent keyword |
| Barcelona/cikstefan | Architectural framing — not directly applicable but informs the sense of "frame" and masking |

---

## What we do NOT do

- No flat 2-stop linear-gradient (the maximeluet problem)
- No random 3D cubes (the rahan problem)
- No warm coral/orange colors **other than `--hero-warm-orange` (#fb3706)** — this is the hero's signature color since June 2026
- No glassmorphism as a general mood across the whole site
- No dark mode — only the hero is dark
- No canvas/WebGL at launch (CSS first)
- No video or photographic background image

---

## Hero-specific tokens (in `app/global.css` — Tailwind v4, no tailwind.config.js)

```css
/* Warm palette — switch made in June 2026 (removing blue/emerald as ambient color) */
--hero-bg:           #1f1f1f;   /* base background */
--hero-warm-orange:  #fb3706;   /* main animated blob (GSAP parallax) */
--hero-warm-slate:   #809fb4;   /* static secondary blob bottom-left */

/* Old palette kept as variables but not used visually */
--hero-deep: #0f2847;
--hero-mid:  #0e4a6e;
--hero-teal: #0a5c5e;
--hero-green: #07694a;
```

Usage: always via `var(--hero-*)` in the `inline style` of blobs and backgrounds. Do not hardcode hex values in components — use `color-mix(in srgb, var(--hero-warm-orange) XX%, transparent)` for gradients with opacity.

The site's editorial tokens (slate palette, blue-600 accent) remain unchanged.
