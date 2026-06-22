# Portfolio Maxime Luet — Information Architecture

> Pont entre la direction créative (93) et l'implémentation. Fige la structure du
> site : pages, routes, navigation, gabarit d'étude de cas. Lecture obligatoire
> avant le build Next.js. Pas de taxonomie ni de card sorting : sur 3–4 pages, le
> framework IA classique est largement hors-sujet ; on en garde ce qui sert le
> build et on déclare explicitement ce qu'on n'instancie pas.
>
> Décisions de session : sitemap arrêté, gabarit d'étude de cas commun, ordre
> vitrine confirmé (eStorie → Mention → eKonsilio), 4ᵉ étude de cas méta (Making
> this) prévue en v1.1.

---

## 1. Résumé

- **Une seule page longue** (home en scroll) + **routes séparées pour les études
  de cas**. C'est la « structure à deux niveaux » du brief, formalisée.
- **6 sections en scroll** sur la home : Hero, Work (3 cartes), Method, System,
  About, Contact. (Plus 2 mini-blocs sous About : Currently / What I'm looking for.)
- **3 études de cas au launch** (eStorie, Mention, eKonsilio), sous `/work/[slug]`.
- **1 bandeau « Elsewhere »** sous les 3 cartes, condensé, non-cliquable, porte les
  expériences hors-vitrine (GIE actuel, Sparteo, Bfast).
- **1 étude de cas méta `/work/making-this`** prévue en v1.1, écrite après le
  launch dans le même gabarit que les autres.
- **Nav sticky minimale** : Work · Method · About · Contact. System sans entrée
  propre (se vit au scroll).
- **Pas de taxonomie, pas de tags, pas de breadcrumbs.** Assumé.

---

## 2. Audience & comportements (rappel court)

Déjà cadré dans 90, 91, 92. Ce qui informe l'IA :

- **Recruteur / talent (primaire)** scanne en 6–10 s. Premier réflexe : trouver le
  travail (Work) et savoir comment contacter (Contact). Ces deux items doivent
  être atteignables instantanément, depuis n'importe où dans le site, sans réflexion.
- **Head of design (secondaire)** lit en profondeur : Method, études de cas,
  System. Il veut pouvoir entrer dans une étude de cas et y rester (lecture longue,
  zéro friction de retour).
- **Conséquence IA** : nav permanente Work + Contact ; gabarit d'étude de cas
  pensé pour la lecture longue ; pas d'éparpillement en multi-pages — le scroll
  unifié sert le scan rapide.

---

## 3. Sitemap

```
/                              home (page unique, scroll)
├─ #hero                       accroche
├─ #work                       3 cartes vitrine
│   └─ Elsewhere               bandeau compact sous les cartes
├─ #method                     5 principes nommés
├─ #system                     section composants ("modéré +")
├─ #about                      About + Currently / What I'm looking for
└─ #contact                    footer

/work/estorie                  étude de cas — à écrire
/work/mention                  étude de cas — rédigée, à ré-équilibrer
/work/ekonsilio                étude de cas — à écrire (arc 3 actes)

/work/making-this              étude de cas méta — v1.1, post-launch
```

**Type de chaque page :**

| Route | Type | Statut launch | Note |
|---|---|---|---|
| `/` | singleton, scroll | ✅ launch | home + ancres |
| `/work/estorie` | détail (gabarit cas) | ✅ launch | confidentialité à vérifier |
| `/work/mention` | détail (gabarit cas) | ✅ launch | ré-équilibrage visuel |
| `/work/ekonsilio` | détail (gabarit cas) | ✅ launch | à écrire |
| `/work/making-this` | détail (gabarit cas) | ⏳ v1.1 | post-launch |

Pas de page `/work` index : la vitrine `#work` sur la home joue ce rôle, pas
besoin d'une page d'index parallèle qui dédoublerait la liste.

**Cross-références :**

- Chaque étude de cas renvoie en haut et en bas vers `/#work` (« ← Work »).
- Chaque carte de la vitrine `#work` mène à son étude `/work/[slug]` (les 3 au
  launch ; ajout de Making this en v1.1).
- Le bandeau Elsewhere ne mène nulle part (intentionnellement — c'est du contexte
  de parcours, pas du contenu détaillé ; le CV joue ce rôle).

---

## 4. URL structure

**Pattern retenu :** `/work/[slug]` pour toutes les études de cas (décidé D1).

Cohérent avec les pairs (daneden, valdivia), prévisible, encaisse une nᵉ étude de
cas sans casser le modèle. Le préfixe `/work/` est aussi un label utile dans
l'URL elle-même (le lecteur sait où il est s'il copie-colle).

**Slugs au launch :**

```
/work/estorie
/work/mention
/work/ekonsilio
/work/making-this        (v1.1)
```

**Principes :**

- Lowercase, kebab-case.
- Pas de date dans l'URL (les études de cas ne sont pas datées par le slug ;
  les dates sont dans l'en-tête de page).
- Pas de catégorie dans l'URL (pas de taxonomie — voir §7).
- Slug stable. Une fois publié, un slug ne change pas — si renommage,
  redirect 301.
- Pas de `/case-studies/`, pas de `/projects/`. `work` est plus court, plus
  honnête, et matche le label de nav.

**Cas particuliers :**

- `making-this` : slug court, prononce le label de nav. Pas `making-this-site`
  (redondant), pas `colophon` (label écarté).
- `estorie` : pas `e-storie` (le nom de marque est en un mot).

---

## 5. Navigation

### 5.1 Nav primaire (sticky)

Sur **toutes les pages**, en haut, persistante au scroll :

```
Maxime Luet         Work · Method · About · Contact
```

- 4 items. Sous le seuil cognitif (5-7 max).
- Sur la home, les items sont des ancres (smooth scroll).
- Sur une étude de cas, ils ramènent à la home + ancre.
- Pas d'entrée **System** dans la nav (décidé D4) : la section se vit au scroll
  pour qui descend, mais le label est opaque pour un recruteur qui scanne. Mieux
  vaut une nav que tout le monde lit du premier coup que cinq items dont un
  obscur.
- Le nom **Maxime Luet** à gauche est aussi un lien vers `/` (réflexe attendu).

**Justification de l'ordre :** Work d'abord (le travail = la valeur), Method
ensuite (la pensée), About (la personne), Contact (l'action). C'est aussi l'ordre
de priorité d'un recruteur qui scanne.

### 5.2 Nav secondaire

Inexistante. Le site est plat (2 niveaux, pas 3). Pas de sidebars, pas de
sous-menus.

### 5.3 Nav utilitaire

Aussi inexistante au sens classique (pas de login, pas de search, pas de panier).
Les liens utilitaires (email, LinkedIn, CV) vivent dans le **footer / section
Contact**.

### 5.4 Breadcrumbs

Aucun. Le site fait 2 niveaux (home → étude de cas), le skill ne les recommande
qu'à partir de 3. Un simple lien **« ← Work »** en haut de chaque étude de cas
suffit, doublé en bas par un retour vers `/#work`.

### 5.5 Footer

Sobre, factuel. Pas une copie complète de la nav.

```
maxime.luet@gmail.com · LinkedIn · CV (PDF)

© Maxime Luet — 2026
Designed and built in Next.js + Tailwind. Hosted on Vercel.
(→ Making this)        ← apparaît en v1.1 quand la page existe
```

Le footer est aussi la zone Contact de la home (`#contact` y mène). Pas
d'ambiguïté : une seule zone, deux noms (footer comme objet, Contact comme nav).

---

## 6. Gabarit d'étude de cas (page `/work/[slug]`)

Le point à plus fort levier de cette passe IA : si les 3 (puis 4) études de cas
partagent une enveloppe stable, la lecture reste cohérente *et* le build a un
gabarit unique. L'**intérieur** du récit reste libre (Mention raconte 2 fronts,
eKonsilio raconte 3 actes — c'est exactement ça qu'on veut préserver).

### 6.1 Structure type

```
[← Work]                                            (lien de retour, en haut)

# [Titre du cas]                                     (H1 — verbe d'action recommandé,
                                                      cf. Mention : "Refondre le
                                                      design system d'un SaaS B2B")

[Rôle · Période]                                     (méta principale, en-tête)
[Type d'entreprise · Périmètre solo/équipe]          (méta secondaire)

[Visuel d'ouverture]                                 (hero du cas — soigné, montre le
                                                      travail avant qu'on lise)

## Le contexte                                        (entreprise + produit, court)

## Le problème                                        (la situation de départ)

## [Section libre — angle narratif du cas]
   Mention      → "Le mandat" + "L'audit" + "L'approche" (2 fronts)
   eKonsilio    → "Acte 1 / Acte 2 / Acte 3"
   eStorie      → à définir (probablement : "Le scope" + "L'approche")
   Making this  → à définir (méta-récit : brief → discovery → exécution)

[Visuels intercalés]                                  (interfaces, schémas, captures)

## Les résultats

## Ce que j'en retire

[← Work]                                              (lien de retour, en bas)
[Next case → ]                                        (lien vers le cas suivant)
```

### 6.2 Règles dures du gabarit

- **En-tête honnête, non négociable** (red flag 7) : le rôle, la période, le
  périmètre, les collaborateurs. C'est *dans* le gabarit, pas en option. Mention
  l'a déjà : « seul designer, en collaboration avec l'équipe produit et les
  développeurs ». eKonsilio devra avoir : « UI/UX + design system + front en
  React. Collaborateur fullstack/back sur le POC ; équipe étendue ensuite. »
- **Visuel d'ouverture obligatoire.** Pas de mur de texte d'entrée (red flag 1).
  Le visuel donne immédiatement à voir le travail avant que la lecture commence.
- **Visuels intercalés.** Chaque section longue doit être ponctuée d'un visuel ou
  d'un schéma. Le ré-équilibrage visuel de Mention découle directement de cette
  règle.
- **Voix off, première personne.** Le ton de Mention est la référence.
- **Pas de double diamant décoratif** (red flag 6). Les phases sont nommées avec
  les mots du cas, pas avec un vocabulaire de méthodo générique.
- **Lien de retour systématique** en haut et en bas. Le lecteur ne doit jamais
  se sentir coincé dans une page de détail.
- **Lien vers l'étude suivante** en bas (« Next case → »). Ordre vitrine.

### 6.3 Cas spéciaux

**eStorie.** Confidentialité à vérifier (peut-on montrer les écrans publiquement,
nommer le produit, etc.). Si écrans confidentiels, le visuel d'ouverture peut être
travaillé (anonymisation, recadrage, ou visuel produit sans données). À régler avant
l'écriture.

**Making this.** Écrite *après* le launch, dans le même gabarit. Mandat (décrocher
un poste), contexte (10 ans SaaS, marché tendu, 200 portfolios qui se
ressemblent), problème (le site actuel + le benchmark des 14 portfolios),
approche (les axes décidés et ce qui a été écarté), résultats (à compléter
quand il y en a), ce que j'en retire. La matière est dans 90/91/92/93 — il faudra
beaucoup couper, pas écrire.

---

## 7. Taxonomie & métadonnées

**Catégories : aucune.** 3–4 études de cas n'ont pas besoin d'une couche de
catégorisation. Le risque sur un volume aussi petit est précisément d'en mettre
(« B2B SaaS », « Design System », « Greenfield »…) et de produire un effet
sur-corporatisé pour rien.

**Tags : aucun.** Pareil. Pas de page index `/tag/design-system` qui ferait croire
qu'il y a 50 cas derrière.

**Métadonnées affichées (par cas)** — vivent en en-tête de la page, pas en
filtrage de nav :

- Rôle (intitulé du poste)
- Période (`YYYY – YYYY`)
- Type d'entreprise (1 ligne : « SaaS B2B », « Startup B2B2C »…)
- Périmètre / collaborateurs (1–2 lignes — l'honnêteté red flag 7)

Ce sont des **données de contenu**, pas de la taxonomie. Elles n'alimentent rien
d'autre que l'en-tête de leur propre page.

**Métadonnées techniques (SEO) :**

- `<title>` par page :
  - Home : `Maxime Luet — Product Designer who codes`
  - Étude de cas : `[Titre du cas] — Maxime Luet`
- `<meta description>` : 1 phrase par page, dérivée du contenu.
- Open Graph image : par page (la même que le visuel d'ouverture pour les études
  de cas, une image dédiée pour la home).

---

## 8. Labels (vocabulaire arrêté)

Tableau de référence pour le build — tout label doit venir de cette liste, pas en
être réinventé en cours de route.

| Élément | Label retenu | Pourquoi |
|---|---|---|
| Section vitrine | **Work** | Pas « Projects » (banal), pas « Portfolio » (méta), pas « Selected work » (jargon designer). Simple, neutre, scannable. |
| Section méthode | **Method** | Déjà validé. Conviction assumée, registre Authority dosé. |
| Section composants | **System** | Court, parle au designer ; le recruteur le découvre au scroll. Pas dans la nav (D4). |
| Section perso | **About** | Standard. Aucune raison de réinventer. |
| Pied / formulaire | **Contact** | Idem. |
| Bandeau hors-vitrine | **Elsewhere** | Décidé. Vrai temporellement (passé + présent) et tonalement (voix off). Pas « Previously » (faux : GIE est actuel), pas « Also » (plus plat). |
| Mini-bloc situation | **Currently** | Déjà validé. Voix off, présent continu. |
| Mini-bloc recherche | **What I'm looking for** | Déjà validé. Factuel, lisible recruteur. |
| Page méta v1.1 | **Making this** | Voix off, présent continu, dit l'objet (le site lui-même). Slug `/work/making-this`. |
| Lien de retour | **← Work** | Pas « Back », pas « ← Home ». Dit où on retourne. |
| Lien étude suivante | **Next case →** | Court, conventionnel. |
| Footer CV | **CV (PDF)** | Indique le format pour éviter la surprise. |

**Bannis explicitement :**

- « Solutions », « Resources » — vague, catch-all (failure pattern du skill IA).
- « Selected work », « Featured projects » — jargon designer convenu, vide.
- « Get in touch », « Let's chat » — registre Medium/Substack écarté en 93.
- « My portfolio », « My work » — possessif inutile, le site est déjà à toi.
- « Crafted », « delightful », « passionate » — vocabulaire catégorie banni en 93.

---

## 9. Implications pour le build

Pour la passe Next.js qui vient ensuite, l'IA implique :

- **Routing App Router** :
  - `app/page.tsx` : home (toutes les sections + ancres)
  - `app/work/[slug]/page.tsx` : gabarit unique d'étude de cas (route dynamique)
  - `app/work/[slug]/page.tsx` lit le contenu depuis MDX ou un objet — un seul
    composant `<CaseStudy>` pour tous les cas.
- **Composants partagés** :
  - `<StickyNav>` — 4 liens, hash sur la home, full path ailleurs
  - `<CaseStudyHeader>` — visuel + méta (rôle, période, type, périmètre)
  - `<CaseStudyFooter>` — ← Work + Next case →
  - `<Elsewhere>` — bandeau compact sous la vitrine
  - `<Footer>` — Contact + mentions
- **MDX recommandé** pour les études de cas : sépare le contenu du composant, et
  garde le contenu en clair (facilite une future version FR sans i18n maintenant).
- **Smooth scroll** activé pour les ancres (`scroll-behavior: smooth`).
- **SEO de base** : sitemap.xml généré, robots.txt permissif, Open Graph images
  par page (les recruteurs partagent des liens dans Slack).

---

## 10. Ce qu'on ne fait pas (déclaré explicitement)

- Pas de moteur de recherche.
- Pas de breadcrumbs.
- Pas de pagination, pas d'archive.
- Pas de catégories, pas de tags, pas de pages d'index par catégorie.
- Pas de blog ou de section écriture (séparé du périmètre de cette refonte).
- Pas de page contact dédiée — `#contact` = footer.
- Pas de page d'index `/work` — la vitrine `#work` joue ce rôle.
- Pas de page CV en HTML — lien vers le PDF.
- Pas de toggle light/dark (light only au launch).
- Pas de version FR (anglais only au launch).

Ce sont des choix, pas des oublis.

---

## 11. Questions ouvertes (post-IA)

- **Confidentialité eStorie** : peut-on publier les écrans / le nom ? Décision
  bloquante pour le visuel d'ouverture du cas. À régler avant l'écriture.
- **Visuel d'ouverture de chaque cas** : 1 image fixe ? Une mini-séquence ? À
  décider au moment du design.
- **Open Graph image de la home** : à concevoir (c'est l'aperçu qui apparaît
  quand le lien est partagé — décisif côté recruteur qui partage en Slack).

---

## Décisions de session (récap)

| Question | Décision |
|---|---|
| Pattern URL études de cas | `/work/[slug]` (D1.a) |
| eStorie a-t-elle une étude de cas ? | Oui, comme les deux autres (D2) |
| Hors-vitrine (GIE/Sparteo/Bfast) | Bandeau compact, label **Elsewhere** (D3.b) |
| Nav primaire | Sticky 4 liens : Work · Method · About · Contact (D4.a) |
| Page making-of / process | Étude de cas méta `/work/making-this`, écrite après launch, en v1.1 (D5.c) |
| Label de la page méta | **Making this** |
| Ordre vitrine | eStorie → Mention → eKonsilio (refermé depuis 90) |
| Taxonomie | Aucune (assumé) |
| Breadcrumbs | Aucun (2 niveaux suffisent) |
