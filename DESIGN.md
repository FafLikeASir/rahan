---
version: "1.0"
name: portfolio-maxime-luet
description: >
  Portfolio d'un Product Designer spécialisé UI & Design System qui code.
  Langage warm dark (hero cinématographique) → blanc éditorial (body).
  Un accent orange, une famille typo, sobriété maximale hors hero.

colors:
  # ── Surfaces éditoriales (body) ──────────────────────────────────────
  background: "#ffffff"
  foreground: "oklch(0.208 0.042 265.755)"    # slate-900
  muted: "oklch(0.984 0.003 247.858)"         # slate-50
  muted-foreground: "oklch(0.554 0.046 257.417)"  # slate-500
  border: "oklch(0.929 0.013 255.508)"        # slate-200

  # ── Texte sémantique ─────────────────────────────────────────────────
  text-primary: "oklch(0.208 0.042 265.755)"   # slate-900
  text-secondary: "oklch(0.446 0.043 257.281)" # slate-600
  text-tertiary: "oklch(0.554 0.046 257.417)"  # slate-500

  # ── Accent (flèche P2, focus rings) ──────────────────────────────────
  accent: "oklch(0.488 0.196 258.5)"           # blue-600
  accent-foreground: "#ffffff"

  # ── Hero : warm dark ─────────────────────────────────────────────────
  hero-bg: "#1f1f1f"
  hero-orange: "#fb3706"    # blob principal, couleur signature
  hero-slate: "#809fb4"     # blob secondaire
  hero-shadow: "#782800"    # ombre orange profond

  # ── Hero : texte sur fond sombre ─────────────────────────────────────
  hero-text-1: "rgba(255,255,255,0.85)"
  hero-text-2: "rgba(255,255,255,0.55)"
  hero-text-3: "rgba(255,255,255,0.45)"

typography:
  display-xl:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    use: "Headline hero (Designer)"
  display-lg:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    use: "Titres de sections"
  display-md:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    use: "Titres de cartes, principes Method"
  body-lg:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    use: "Lead paragraphs, intro sections"
  body-md:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    use: "Corps de texte standard"
  body-sm:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
    use: "Métadonnées, nav links, captions"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
    use: "Tags, badges, labels uppercase RARES"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    use: "Labels techniques, stats hero (accent uniquement)"

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
  md: 8px     # cartes
  lg: 12px    # cartes grandes
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
    blobs: "orange centré animé + slate bas-gauche statique + grain SVG 25%"
  work-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.border}"
  section-editorial:
    backgroundColor: "{colors.background}"
    paddingY: "{spacing.section}"
    maxWidth: "1440px centré, contenu dans cols 2-6 (≈ 72% du viewport)"

---

## Vue d'ensemble

Portfolio personnel de Maxime Luet, Product Designer UI & Design System qui code.
Audience double : recruteur au scan 6 s + head of design à l'inspection du craft.

**Principe structurel :** hero cinématographique warm dark (unique moment expressif du site) → transition → blanc éditorial patient (tout le reste). La retenue *est* le signal.

**Identité visuelle :** un seul accent fort (orange `{colors.hero-orange}` et sa déclinaison slate `{colors.hero-slate}`), une seule famille typo (Plus Jakarta Sans, bien réglée), aucun décor hors hero. La densité croît vers l'intérieur du site — le scan voit peu, l'inspection voit tout.

## Do

- Utiliser `{colors.hero-orange}` comme seul accent expressif (hors interactions UI bleues)
- Tracking négatif agressif sur les titres display (`-0.03em` à `-0.015em`)
- `min-h-[100dvh]` — jamais `h-screen`
- Tokens CSS sémantiques (`text-primary`, `text-secondary`) — jamais valeurs hex en dur
- Grain + blobs uniquement dans le hero, pas sur d'autres sections
- Une seule famille typo ; JetBrains Mono en accent *rare* (stats, labels techniques)
- Crédits et périmètres précis dans les études de cas

## Don't

- `bg-white` ou couleurs hex en dur hors hero (utiliser les tokens)
- Dark mode — le light éditorial est le choix délibéré
- Gradient / glass décoratif hors hero
- Deuxième famille typo en thème (une seule, point)
- Monospace / terminal comme ambiance globale (accent rare seulement)
- `framer-motion` / `motion` — GSAP uniquement en phase animation
- Vocabulaire générique : « crafted », « pixel-perfect », « passionate », « seamless »
- Double diamant ou process maps décoratifs
- Dark sections isolées dans un contexte light (thème lock global)
- Em-dash (`—`) partout — utiliser tiret ou restructurer

## Références complètes

- Direction créative complète : `docs/93-creative-direction.md`
- Spécification hero : `docs/95-hero-visual-spec.md`
- Architecture & conventions : `docs/96-project-structure.md`
- Tokens CSS live : `app/global.css` (`@theme inline`)
