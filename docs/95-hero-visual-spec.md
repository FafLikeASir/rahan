# Portfolio Maxime Luet — Hero Visual Specification

> Spécification visuelle du hero — direction **actuelle et validée**.
> Source de vérité : Figma node `1:2` (Desktop - 1, 1440×1024).
> Lecture obligatoire avant toute modification du hero.
>
> Note : une direction bleu-émeraude a été explorée et **abandonnée**.
> Ce fichier documente uniquement la direction retenue (warm dark).

---

## Principe directeur

Le hero est la **couverture du magazine**. Impact visuel maximal, unique endroit
du site aussi expressif. Le reste du site est Editorial Restrained (blanc, typographique).

**Structure du site :** hero cinématographique warm dark → transition → blanc éditorial.

---

## 1. Fond

**Sombre, near-black, avec mesh warm.**

- Base : `#1f1f1f` (dark near-black, pas de flat gradient)
- Blob orange (principal) : `radial-gradient(ellipse 44% 76% at 50% 50%, rgba(251,55,6,0.9) 0%, transparent 65%)`
  — centré, animé (breathing + mouse parallax)
- Blob slate (secondaire) : `radial-gradient(ellipse 52% 90% at 30% 100%, rgba(90,118,145,0.75) 0%, transparent 65%)`
  — ancré bas-gauche, statique
- Grain : SVG noise overlay, **25% opacité**, `mix-blend-mode: color-burn`, tiled 300×300px

---

## 2. Structure grille

7 colonnes × 205.7px (sur 1440px viewport) visibles via bordures blanches à 10% :

| Col | Contenu hero | Contenu nav |
|---|---|---|
| 1 | vide | vide |
| 2-3 | content zone (H1, subtitle, location) | Logo "Maxime Luet" |
| 4-5 | content zone | Nav links |
| 6 | content zone | Badge "Available for work" |
| 7 | vide | vide |

- `border-r border-white/[0.1]` entre les colonnes
- `border-b border-white/[0.1]` sous la nav row (y=80px)
- `border-t border-white/[0.1]` au-dessus de la stats zone

Stats zone : diagonal pattern dans cols 2 et 6 (repeating-linear-gradient -45deg, blanc 8%).

---

## 3. Nav row (80px)

Grille 7-col (`grid-cols-7 h-20`) :
- **Col 2-3** — Logo : "Maxime Luet", 20px, font-normal, white (transparent hero) / `text-primary` (scrolled)
- **Col 4-5** — Nav links : Work · Method · About · Contact, 16px, font-medium, white/50 (hero) / `text-text-secondary` (scrolled)
- **Col 6** — Badge "Available for work" :
  - `border: 1px solid rgba(255,255,255,0.1)`
  - `background: linear-gradient(99deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.20) 100%)`
  - `backdrop-filter: blur(50px)`
  - `border-radius: 8px`, `padding: 8px`, `gap: 8px`
  - Green dot 8×8px (`bg-emerald-400`, glow `0 0 6px 2px rgba(52,211,153,0.55)`)
  - Texte 14px, font-normal, white
  - Alignement dans col 6 : `justify-end` (bord droit de col 6)

Nav sticky : `bg-transparent` dans le hero → `bg-background/95 backdrop-blur-sm border-b border-border` hors hero.

---

## 4. Contenu texte

```
# Product Designer
I design UI for digital products and ship design systems.
📍 Based in France
```

**Typographie :**
- H1 "Product Designer" : Plus Jakarta Sans, `clamp(48px, 8.33vw, 120px)`, weight 600, `text-black`, `tracking-[-4.2px]`, layout `flex gap-4`
  — le noir sur fond dark est intentionnel (contraste warm, force la lisibilité)
- Subtitle : 20px, weight 400, `text-white` (100%)
- Location : 16px, weight 400, `text-white` (100%), icône MapPin Lucide

---

## 5. Stats zone (257px)

- Col 4 : `10+` (stat) + `years of XP` (label)
- Col 5 : `Open` (stat) + `for full-time roles` (label)
- Stat : `52px` (desktop) / `40px` (mobile), weight 500 (medium), white, tracking -1.5px
- Label : 16px, `rgba(255,255,255,0.72)`, pas de margin-top
- Layout cellule : `flex flex-col justify-center p-[24px]` (centrage vertical + padding uniforme 24px)

---

## 6. Motion (GSAP + CSS)

**Entrance (GSAP timeline) :**
1. Background fade in (0.8s, power2.out)
2. H1 words slide up from overflow-hidden mask (0.7s, stagger 0.15s, power3.out)
3. Subtitle fade+slide (0.5s)
4. Location fade (0.4s)
5. Stats fade+slide (0.5s)

**Ambient (GSAP, infinite) :**
- Blob breathing : scale 1→1.07, 9s, sine.inOut, yoyo
- Mouse parallax : blob suit la souris via `quickTo` xPercent/yPercent, 1.5s

**`prefers-reduced-motion: reduce`** → entrance/ambient désactivés, hero statique.

---

## 7. Responsive

- **Desktop (≥1024px)** : layout 7-col complet, grille nav, diagonal patterns
- **Mobile (<768px)** : nav hamburger, grille stats 2-col (pas 7-col)

---

## 8. Performance

- **Desktop (>1024px)** : layout tel que décrit, glass elements visibles
- **Tablette (768-1024px)** : glass elements réduits (2 au lieu de 4), grid
  lines plus espacées
- **Mobile (<768px)** : pas de glass elements (trop petits pour avoir un
  impact), grid lines masquées, mesh simplifié (2 au lieu de 4), hero plus
  court (400px au lieu de 520+). Le cinématographique reste via le fond + la
  vignette + le grain.

---

## 10. Performance

- **Pas de canvas/WebGL** au launch — CSS pur. Si on veut pousser le mesh
  plus tard (interaction souris, particules), on ajoutera un canvas par-dessus.
- Mesh = `position: absolute` + `border-radius: 50%` + `filter: blur(60px)`
  + animation CSS. Léger, GPU-composité.
- Grain = SVG inline en background-image, tiled. Pas de PNG lourd.
- `will-change: transform` sur les éléments animés.
- Tester le framerate sur mobile (les blur larges peuvent coûter cher —
  réduire le blur ou désactiver sur mobile si nécessaire).

---

## Références consolidées

| Référence | Ce qu'on en prend |
|---|---|
| rahan.vercel.app | L'instinct de profondeur et de richesse multi-couleur |
| maximeluet.vercel.app | Le corridor bleu→vert (teintes), la grid — mais PAS le flat gradient |
| Uprail | La vignette cinématographique, le sens de l'horizon |
| Asterisk | Le mesh gradient riche + grid lines visibles à travers |
| Lynx | Les colonnes de lumière aurora, le grain, la retenue |
| Pelmatech | L'aurora en mouvement, les cartes UI glass dans la scène |
| Mure | La texture réelle, le mot-clé en accent coloré |
| Barcelona/cikstefan | Le cadrage architectural — pas directement applicable mais informe le sens du "cadre" et du masking |

---

## Ce qu'on ne fait PAS

- Pas de flat linear-gradient 2 stops (le problème de maximeluet)
- Pas de cubes 3D aléatoires (le problème de rahan)
- Pas de couleurs chaudes corail/orange **autre que `--hero-warm-orange` (#fb3706)** — c'est la couleur signature du hero depuis juin 2026
- Pas de glassmorphism en ambiance générale sur tout le site
- Pas de dark mode — seulement le hero est sombre
- Pas de canvas/WebGL au launch (CSS d'abord)
- Pas de vidéo ou d'image photographique en fond

---

## Tokens spécifiques au hero (dans `app/global.css` — Tailwind v4, pas de tailwind.config.js)

```css
/* Palette warm — switch opéré en juin 2026 (suppression bleu/émeraude comme ambiance) */
--hero-bg:           #1f1f1f;   /* fond de base */
--hero-warm-orange:  #fb3706;   /* blob principal animé (GSAP parallax) */
--hero-warm-slate:   #809fb4;   /* blob secondaire statique bas-gauche */

/* Ancienne palette conservée en variable mais non utilisée visuellement */
--hero-deep: #0f2847;
--hero-mid:  #0e4a6e;
--hero-teal: #0a5c5e;
--hero-green: #07694a;
```

Usage : toujours via `var(--hero-*)` dans les `inline style` des blobs et fonds. Ne pas hardcoder les hex dans les composants — utiliser `color-mix(in srgb, var(--hero-warm-orange) XX%, transparent)` pour les gradients avec opacité.

Les tokens éditoriaux du site (palette slate, accent bleu-600) restent inchangés.
