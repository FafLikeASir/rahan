# Portfolio Maxime Luet — Hero Visual Specification

> Spécification visuelle du hero, issue de l'exploration brand-identity.
> Consolide les décisions de 91/92/93 + les 6 références visuelles explorées
> (Uprail, Asterisk, Lynx, Pelmatech, Mure, Barcelona/cikstefan) + les deux
> portfolios précédents (rahan.vercel.app, maximeluet.vercel.app).
>
> Lecture obligatoire avant le build Next.js du hero.

---

## Principe directeur

Le hero est la **couverture du magazine**, pas une page intérieure. C'est le seul
endroit du site où l'impact visuel est maximal. La direction Editorial Restrained
(93) s'applique au contenu de lecture (études de cas, Method, About) — pas à la
première impression.

**Structure du site :** hero cinématographique immersif → transition → blanc
éditorial typographique pour tout le reste.

---

## 1. Fond

**Sombre, profond, multi-couches.** Pas de flat linear-gradient à 2 stops.

- Base : gradient multi-stops bleu nuit → bleu profond → teal → émeraude
  - `#0c1929` → `#0f2847` → `#122e5e` → `#0e4a6e` → `#0a5c5e` → `#07694a`
  - Direction : 135deg ou radiale selon le rendu
- Mesh animées : 3-4 radial gradients à basse opacité (8-15%) qui driftent
  lentement (12-20s par cycle). Créent la profondeur sans manger la lisibilité.
  Inspiration : rahan (multi-color mesh), Asterisk (mesh avec grid), Pelmatech
  (aurora streaks).
- Vignette cinématographique : radial gradient sombre sur les bords, concentre
  l'attention sur la zone texte (centre-gauche). Inspiration : Uprail.
- Grain : noise SVG overlay, 2-3% opacité, mix-blend-mode overlay. Ajoute de la
  matière (pas un fond digital lisse). Inspiration : Lynx, Mure.

**Couleurs de mesh :**
- Pôle bleu : `rgba(37, 99, 235, .15-.25)` (blue-600)
- Pôle teal : `rgba(6, 182, 212, .10-.15)` (cyan-500)
- Pôle émeraude : `rgba(5, 150, 105, .12-.20)` (emerald-600)
- Accent indigo discret (optionnel) : `rgba(99, 102, 241, .08-.12)` (indigo-500)

---

## 2. Grid lines

**Lignes de structure visibles à travers le mesh.** C'est le signal "design
system" rendu visuel — pas de la décoration.

- Grille de lignes fines : 0.5px, `rgba(255, 255, 255, .05-.08)`
- Perspective légère optionnelle (CSS perspective transform) pour donner un
  effet de profondeur / horizon. Inspiration : Asterisk, Pelmatech.
- Espacement : ~60-80px entre les lignes
- La grille est SOUS le mesh (z-index inférieur aux radial gradients) mais
  visible à travers la transparence.

---

## 3. Glass elements

**2-4 rectangles arrondis en flottement.** Pas de la décoration abstraite —
idéalement des silhouettes de composants UI.

- Border : `1px solid rgba(255, 255, 255, .06-.10)`
- Background : `rgba(255, 255, 255, .02-.05)`
- `backdrop-filter: blur(1-2px)` (discret)
- Border-radius : 12-16px
- Animation : flottement lent vertical (8-14s par cycle), rotation très subtile
- Répartis côté droit du hero (le texte est à gauche)

**Option ambitieuse (à tester au build) :** un des glass elements contient un
vrai composant UI simplifié (un bouton avec ses états, ou un token de couleur),
directement lié à la section System. Le positionnement "designer who codes"
rendu littéral. Inspiration : Pelmatech (cartes de scheduling dans le hero).

---

## 4. Effets de lumière

**Aurora / streaks lumineux** qui traversent le fond de manière organique.

- 1-2 traînées de lumière (gradient linéaire étroit, bleu-teal, basse opacité)
- Animation lente (15-25s), drift + scale légère
- Bien en dessous du texte côté z-index
- Inspiration : Pelmatech (aurora bleue), Lynx (colonnes de lumière)

---

## 5. Contenu texte

Contenu validé dans le brief (00), inchangé.

```
[badge] 🟢 Open to remote roles

# Maxime Luet
### Product Designer who codes

Based in France, I design and ship UI and design systems.

from Figma ——→ to production
```

**Typographie :**
- H1 "Maxime Luet" : Plus Jakarta Sans, 48-56px, weight 800, blanc `#ffffff`
- H2 "Product Designer who codes" : 22-24px, weight 500, blanc 85%
- Body : 15px, weight 400, blanc 55%
- Badge : 12px, blanc 70%, border blanc 15%, background blanc 5%, backdrop-blur

**Ligne "Figma → production" :**
- Texte : 14px, weight 500, blanc 45-50%
- Flèche : gradient `#3b82f6` → `#06b6d4` → `#10b981` (bleu → cyan → émeraude)
- Sweep lumineux : animation 2.5s, trait de lumière blanc 60% qui parcourt la ligne
- C'est le seul endroit du hero où le gradient-signature P2 apparaît en mode
  "concentré" — le reste est de l'ambiance, ici c'est du design intentionnel.

---

## 6. Transition hero → contenu

**Fade progressif** du fond sombre du hero vers le blanc éditorial.

- Gradient vertical en bas du hero : du fond sombre → blanc `#ffffff`
- Hauteur de la transition : ~80-120px
- Pas de coupure nette — la respiration est importante
- En dessous : le site est en mode light éditorial (palette slate, cf. tokens)

---

## 7. Motion

- Mesh drift : transform translate + scale, 12-20s, ease-in-out, infinite
- Glass float : transform translateY + rotate, 8-14s, ease-in-out, infinite
- Aurora : transform translate + scale + opacity, 15-25s
- Sweep Figma→prod : 2.5s, ease-in-out, infinite
- **Tout en CSS** (transform + opacity uniquement, jamais width/height)
- **`prefers-reduced-motion: reduce`** : toutes les animations stoppées,
  le hero reste statique (beau quand même grâce aux mesh fixes)
- Grain : pas animé (statique)

---

## 8. Navigation dans le hero

Nav sticky superposée au hero (fond transparent dans le hero, fond blanc quand
on scroll dans le contenu).

```
Maxime Luet         Work · Method · About · Contact
```

- 15px, weight 600 pour le nom, weight 500 pour les liens
- Couleur dans le hero : blanc 90% (nom), blanc 50% (liens)
- Couleur hors hero : `#0f172a` (nom), `#475569` (liens)
- Transition : fade au scroll quand le hero sort du viewport

---

## 9. Responsive

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
