# Portfolio Maxime Luet — Brief global

> Source de vérité du projet de refonte du portfolio. Document chapeau :
> positionnement, cible, architecture, contraintes, décisions. Les fiches
> expériences (10-…) et la discovery (90-…) le complètent.

---

## Qui

**Maxime Luet** — Product Designer, spécialiste UI & Design System, avec des
compétences de développeur front-end (HTML/CSS, JavaScript, React, TailwindCSS).
Positionnement : « designer qui code » — designer produit qui conçoit des design
systems et sait les amener jusqu'en production dans le code.

~10 ans d'expérience, exclusivement sur des produits SaaS.

## Objectif du portfolio

Décrocher un poste de Product Designer / UI-UX Designer (spécialité UI & Design
System), en startup / scale-up / grand groupe à équipe produit interne.
Marché tendu, recherche active.

Cible géographique : remote France, Le Mans, Laval, Paris (hybride léger),
Angers, Rennes. (Détail dans le skill de recherche d'emploi.)

## Positionnement

- Titre retenu : **« Product Designer who codes »** (sobre, matche les intitulés
  visés tout en affichant la différence). « Design Engineer » écarté comme titre
  principal (trop tech, cible trop étroite) mais le concept de design engineering
  peut nourrir la section Approche.
- Différenciateur clé : **du design jusqu'au code en production** — « from Figma
  to production ».
- Angle à faire vivre partout : le design system non comme une fin, mais comme le
  moyen de relier design, produit et code.

## Stack technique du site

- **Next.js + TailwindCSS** (choix assumé : le site est lui-même une preuve de la
  compétence front).
- **shadcn/ui** autorisé comme fondation technique (accessibilité, comportement),
  MAIS recouvert des tokens / du style de Maxime — le rendu ne doit pas ressembler
  à du shadcn par défaut (cf. red flag 2). shadcn = squelette, design system perso
  par-dessus.
- Textes gardés séparés des composants (pour faciliter une éventuelle version FR
  plus tard, sans i18n maintenant).
- Langue : **anglais uniquement** pour l'instant (la langue de la tech ; ouvre au
  remote international). FR éventuellement plus tard si une candidature le justifie.

## Architecture du portfolio (7 sections)

1. **Hero / accroche** — validé (voir plus bas).
2. **Travaux sélectionnés (vitrine)** — validé. 3 cartes format phrase-résultat.
3. **Pages d'études de cas (détail)** — Mention rédigée (à ré-équilibrer visuel),
   eKonsilio à écrire. Structure à deux niveaux : vitrine concise → page détaillée.
4. **Approche / méthode** — à faire. Façon section « Approach » de Gabriel
   Valdivia : principes nommés, courts. Matière dans les fiches expériences.
5. **Système / composants** — à cadrer. Fragment de design system manipulable.
   Candidat au rôle de side project (coche red flag 5). Peut porter un signal IA.
6. **À propos** — à faire. Court, une touche perso dosée. Option : court texte sur
   le métier façon Stamatiou.
7. **Contact / pied de page** — sobre. Email, LinkedIn, CV.

## Hero (validé)

```
🟢 Open to remote roles
# Maxime Luet
### Product Designer who codes
Based in France, I design and ship UI and design systems.
from Figma → to production   (traitement graphique à définir au moment du code)
```

## Vitrine — 3 cartes (validées)

Ordre : eStorie → Mention → eKonsilio. Puis side projects.

**eStorie** — Founding Product Designer · 2025–Present
> Sole designer at a funeral-tech startup, building the entire product from
> scratch — tribute spaces for families, tools for funeral homes — on a design
> system shipped to production.

**Mention** — Product Designer, UI & Design System · 2022–2024
> Turned a scattered Material UI codebase into a real design system, and rebuilt
> the design-to-dev workflow so design finally had a seat in product decisions.

**eKonsilio** — Founding UI/UX Designer & Front-end Developer · 2019–2022
> First designer at a conversational-marketing startup. Defined the UI, founded
> the design system, and built it in React — the foundation a product team would
> scale on.

Note : les deux cartes Mention et eKonsilio sont volontairement qualitatives
(pas de chiffres en vitrine ; les chiffres et les features IA vont dans les
études de cas détaillées). Les deux racontent des angles distincts —
Mention = design system governance, eKonsilio = from scratch to prod.

## Contraintes & garde-fous : les 8 red flags (Tom Scott, Verified Insider)

À garder en tête à chaque étape :
1. **Pavés de texte** — visuel d'abord ; le texte ne doit jamais écraser l'output.
2. **Template > travail** — le craft du site doit égaler/dépasser tout template.
3. **Aucun signal IA** — montrer une pratique de l'IA. Ici : la refonte assistée
   par IA du portfolio elle-même peut servir de preuve (« making-of »).
4. **Ressenti visuel immédiat** — la qualité visuelle décide en quelques secondes.
5. **Pas de preuve de shipping** — side project / produits réels. eStorie + la
   section Système jouent ce rôle.
6. **Double diamant** — pas de discovery maps décoratives qui enterrent le travail.
7. **Flou sur la contribution perso** — toujours préciser ce que Maxime a fait vs
   l'équipe. (Corrections déjà appliquées : périmètre eKonsilio, statut eStorie.)
8. **Décalage scope/titre** — montrer le systems thinking et le « work before the
   work » (alignement, cadrage). Le fil « design dans les décisions » y répond.

## Principes éditoriaux retenus (de l'analyse des portfolios)

- Phrase-résultat en vitrine : rôle + objet + échelle/impact (Jean-Marc Denis,
  Hurrell).
- Structure à deux niveaux : vitrine → détail (Daniel Eden, Gabriel Valdivia).
- Section « Approche » = méthode formulée en principes nommés (Gabriel Valdivia).
- Section composants / design system manipulable (Heckel, Krehel, Wattenberger).
- Le site lui-même prouve la compétence (Comeau, Heckel).
- Créditer les collaborateurs (Brandon Walkin) → honnêteté red flag 7.
- Écrire sur son métier crédibilise le positionnement (Stamatiou).
- Ne pas imiter les portfolios de stars qui n'ont aucune étude de cas : leur
  notoriété fait le travail à leur place, pas le cas de Maxime. Les études de cas
  détaillées sont SA valeur ajoutée.

## Section 4 — Method (validée)

```
## Method

I came to product design through code — and I've stayed at that intersection
ever since. Different products, different teams, same convictions underneath.

**Design where decisions happen.**
I want to understand how things work, how they're put together, where they
break down — before I start designing. The best work happens when design is
a partner to product and engineering from the start, not a step they hand off to.

**I work in systems.**
Whether I'm shaping a single feature or a full product, I think in reusable
components and shared foundations. Design systems aren't a deliverable — they're
the way teams stay aligned as they grow.

**Systems are built with people.**
A library nobody uses isn't a system, it's a folder. I work hands-on with
developers and product managers — making the system theirs as much as mine is
what makes it stick.

**I don't hand off and walk away.**
Whenever the project allows it, I follow my own designs into the code. Staying
engaged through the build keeps design honest and ships products that look the
way they were meant to.

**Useful doesn't have to mean ugly.**
Product design too often trades craft for utility, as if you had to choose.
I don't. Function and beauty hold each other up — and a well-crafted interface
earns the trust users give a product.
```

Note : « Craft » mis de côté comme titre de section (jargon mode), à réutiliser
ailleurs dans le portfolio (peut-être section Système / page À propos / un encart).

## Section 6 — About (validée)

```
## About

I'm a French product designer, living in the Sarthe and never far from the
Mayenne — my home turf.

I came to design through code — or more honestly, code through interfaces.
The abstract languages never quite landed; the visual ones did. Pixels you
could push, mockups you could bring to life. That intersection has been my
work ever since.

What pulls me in is the imagining part. A problem, then a structure that
answers it — an interface, a flow, a system. The same instinct shows up off
the clock. I watch other people build things — architects and craftsmen.
Some ideas keep at me until I get them out of my head. Paper, screen,
doesn't matter; they need a shape. Always the same fascination: someone
shaping something both useful and well-made.
```

Notes :
- Ton voix off / cinéma assumé partout (italique en mockup ; à valider au design).
- 4ᵉ paragraphe sport (foot/ski) coupé après itération : trop catalogue, n'ajoutait
  pas de valeur distinctive. La section ferme sur « useful and well-made » qui
  renvoie à la conviction métier (principe 5 de Method).
- Photo : oui, à intégrer à côté du texte (la photo du CV).
- Deux mini-blocs prévus en dessous : Currently + What I'm looking for. À rédiger.

## Mini-blocs sous About (validés)

```
**Currently**
Two screens open most days: the Health Solutions Catalogue at GIE SESAM-Vitale
(via SII), and eStorie on the side.

**What I'm looking for**
Product Designer roles — ideally with a Design System scope, but I'm open.
Remote across France, or hybrid in Paris (light) and cities in western France.
```

Notes :
- Registres distincts assumés : Currently en voix off (transition douce depuis
  About), What I'm looking for en factuel (info pratique scannable par un recruteur).
- « (via SII) » respecte la convention de présentation client/prestataire validée.
- Pas de mention « pas d'ESN » : on reste ouvert (les chasseurs de tête peuvent
  amener des postes in-house intéressants).
- DS « ideally but open » : ne pas se fermer aux postes Product Designer plus larges.

## État d'avancement

- [x] Hero
- [x] Vitrine (3 cartes)
- [x] Section Method
- [x] Section About + mini-blocs Currently / What I'm looking for
- [ ] Étude de cas Mention (rédigée, à ré-équilibrer visuellement)
- [ ] Étude de cas eKonsilio (à écrire — fil « from scratch to prod », arc 3 actes)
- [ ] Section Système / composants
- [ ] Contact
- [ ] Implémentation Next.js + Tailwind (via Claude Code)
