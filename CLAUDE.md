# CLAUDE.md — Portfolio Maxime Luet

> Ce fichier est lu automatiquement par Claude Code à chaque session.
> Il pointe vers la documentation complète dans `/docs`.

## Règle #1

Lire `docs/96-project-structure.md` avant toute action. C'est la source de
vérité sur l'architecture, la stack, les conventions, et les contraintes.

## Règle #2

Consulter `docs/97-skill-orchestration.md` pour savoir quel skill et quel
document lire selon la tâche en cours.

## Règle #3

Si une décision est écrite dans un des docs 91-95, elle est prise.
Ne pas la re-débattre. L'appliquer. Si elle semble contradictoire avec une
autre, demander à Maxime.

## Hiérarchie des documents

1. `docs/96-project-structure.md` — architecture et contraintes techniques
2. `docs/93-creative-direction.md` — axes esthétiques + liste de rejet
3. `docs/94-information-architecture.md` — structure, labels, gabarit
4. `docs/95-hero-visual-spec.md` — spécification du hero
5. `docs/92-creative-brief.md` — direction visuelle et scope
6. `docs/00-brief-global.md` — contenu validé
7. `docs/91-brand-discovery.md` — territoires et analyse

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind v4 · shadcn/ui · Plus Jakarta Sans · Vercel

## Ce qu'on ne fait PAS

Pas de Pages Router. Pas de dark mode. Pas de blog. Pas de formulaire.
Pas de API routes. Pas de CMS. Pas de canvas/WebGL au launch.
Pas de framer-motion/GSAP. Pas de `bg-white` en dur — tokens sémantiques.
Liste complète dans `docs/96-project-structure.md` §15.
