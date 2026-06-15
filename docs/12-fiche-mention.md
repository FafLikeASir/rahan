# Fiche — Mention

> Carte n°2 de la vitrine. Étude de cas COMPLÈTE déjà rédigée :
> voir etude-de-cas-mention.md. Fil narratif : design system GOVERNANCE /
> « faire entrer le design dans les décisions produit » (fil B).

## Faits

- **Structure** : Mention — SaaS B2B de media monitoring & social listening
  (surveiller le web et les réseaux, analyser les conversations, gérer sa présence
  sociale). Racheté par Agorapulse (NON mentionné dans l'étude de cas — hors sujet).
- **Rôle** : Product Designer, UI & Design System — seul designer.
- **Période** : oct. 2022 – juil. 2024.
- **Collaboration** : chantier porté avec les PM et les développeurs (squad
  Foundation pour le volet système).
- **Mandat** : recruté par le Head of Product pour faire entrer le design dans les
  décisions produit et diffuser une culture design (équipe produit → devs →
  entreprise).

## Situation de départ

- Produit basé sur Material UI + simple couche CSS pour les couleurs.
- Côté Figma : aucun UI Kit, fichier fourre-tout non documenté, chacun modifie
  par-dessus les autres.
- Côté code : pas de vrais composants (copier-coller de code en prod), couleurs en
  dur dispersées (HTML/CSS/composants), MUI patché par du CSS épars, pas de styles
  de texte ni de layouts structurés.
- Pas de handoff (lien Figma dans un ticket Jira). Reviews interminables : une user
  story pouvait demander autant de temps de correction que d'estimation initiale.
- Maintenance « effroyable » pour la squad Foundation.

## Ce que Maxime a fait

**Volet collaboration (avec les PM)**
- Normalisation des fichiers Figma.
- Definition of Done partagée (états : défaut, vide, erreur, chargement).
- Handoff reconstruit : Zeplin comme passerelle « ready to dev » ; workflow et
  templates Jira reliant ticket produit → user stories design → user stories dev.

**Volet système (avec la squad Foundation)**
- UI Kit Figma sur base Material UI redessinée (principes Refactoring UI,
  Practical UI).
- TailwindCSS + design tokens comme couche d'abstraction entre style et composants.
- Bibliothèque de composants MUI surcouchée Mention, développée AVEC les devs.
- Documentation Storybook, reliée aux composants Figma via l'addon Designs.

**Autres réalisations (dans le dossier de compétences, à exploiter dans l'étude de cas)**
- UX : session tracking, A/B testing connexion/création de compte, tunnel
  d'onboarding, suivi KPIs UX (click rage, heatmap, clipboard).
- **Features IA** (atout marché / red flag 3) : résumé automatique de pages web,
  analyse de sentiments, scoring de confiance ; IA générative texte/image pour le
  multi-réseaux. → réservées à l'étude de cas (pas en vitrine).
- Outil de gestion multi-réseaux sociaux (post multicanal, campagnes, rôles,
  bibliothèque médias).
- Product Discovery : Product Vision, User Journey Map, framework F.O.C.U.S.E.D.,
  Design Sprints, ateliers.
- Collaboration dev : testing, code reviews, POCs.

## Résultats (qualitatifs + le seul chiffre solide)

- ~100 écrans couverts (desktop/tablette/mobile) — ampleur de Material UI.
- Source de vérité partagée ; frictions design/PM/dev réduites ; passage
  wireframe→design accéléré ; onboarding devs accéléré ; maintenance Foundation
  allégée.
- Tests automatisés au niveau de la librairie → composants fiabilisés, QA prod
  allégée.
- Alignement visuel produit ↔ marketing.
- Temps regagné pour discovery, UX research, R&D, POCs rapides.

## Recul (dans l'étude de cas)

- Un design system est un outil social avant d'être technique.
- Zeplin assumé comme obsolète aujourd'hui (Figma le remplace) — distinction
  outil vs fonction.

## Carte vitrine (validée)

> **Mention** — Product Designer, UI & Design System · 2022–2024
> Turned a scattered Material UI codebase into a real design system, and rebuilt
> the design-to-dev workflow so design finally had a seat in product decisions.

## État

- Étude de cas rédigée et validée (etude-de-cas-mention.md).
- Reste : ré-équilibrer visuel/texte (red flag 1), répétitions « source de vérité »
  déjà corrigées, paragraphe Jira candidat à un schéma visuel.
