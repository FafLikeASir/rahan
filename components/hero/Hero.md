# Hero

## Rôle
Section plein viewport du haut de page : nom, titre, stats, badge disponibilité, et arrière-plan WebGL animé (fractal glass gradient).

## Props
Aucune prop — contenu entièrement statique (cf. `docs/00-brief-global.md`).

## Tokens Lyse utilisés
- `--hero-bg` (#1f1f1f) → fond base CSS (visible pendant le chargement du canvas)
- `--hero-warm-orange` (#fb3706) → couleur uC1 shader (blob orange dominant)
- `--hero-warm-slate` (#809fb4) → couleur uC4 shader (blob slate)
- `--hero-grid` → couleur lignes de grille

## Variants / états
- État initial : opacité 0 sur canvas + textes (GSAP timeline à l'entrée)
- `prefers-reduced-motion` : désactive la timeline GSAP et fige `uTime` dans le shader

## Architecture WebGL (HeroCanvas.tsx)
Pipeline deux passes via React Three Fiber :
1. **Noise pass** — simplex noise 2D (snoise2d, Ashima Arts) rendu dans un FBO 256×256 → texture de warp `uNoiseMap`
2. **Main pass** — `GaussianEllipses` + distortion warp + effet "fluted glass" + grain JPG + tone mapping exponentiel

Presets "Flow-like" hardcodés : `noiseScaleX=0.35`, `noiseScaleY=0.55`, `warpStrength=0.4`, `warpSpeed=0.12`, `fluteWidth=70`, `fluteStrength=140`, `toneMapExposure=0.9`, `grainStrength=0.2`.

Palette warm dark (5 blobs Gaussian) :
- uC1 `#fb3706` (orange, grande ellipse)
- uC2 amber chaud
- uC3 orange-rouge profond
- uC4 `#809fb4` slate
- uC5 slate sombre

Grain rendu dans le shader via `/public/film_grain_contrasted.jpg` (chargé via `useLoader` + Suspense). Le grain CSS (`grainSvg`) a été retiré de Hero.tsx.

## Décisions design
Les `rgba(255,255,255,0.08)` dans `diagonalPattern` sont des valeurs de superposition sans token équivalent dans le DS.
Stats label `rgba(255,255,255,0.72)` : hors échelle des tokens `--hero-text-*` existants — à tokeniser si réutilisé ailleurs.
`THREE.Clock` deprecation warning (inoffensif) : R3F 9.x utilise encore l'ancienne API en interne.
