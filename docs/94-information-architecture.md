# Portfolio Maxime Luet — Information Architecture

> Bridge between creative direction (93) and implementation. Locks the site
> structure: pages, routes, navigation, case study template. Required reading
> before the Next.js build. No taxonomy or card sorting: on 3–4 pages, the
> classic IA framework is wildly out of scope; we keep what serves the
> build and explicitly declare what we do not instantiate.
>
> Session decisions: sitemap settled, shared case study template, showcase
> order confirmed (eStorie → Mention → eKonsilio), 4th meta case study (Making
> this) planned for v1.1.

---

## 1. Summary

- **One long page** (home as scroll) + **separate routes for case studies**. This is the "two-level structure" from the brief, formalized.
- **6 scroll sections** on the home: Hero, Work (3 cards), Method, System,
  About, Contact. (Plus 2 mini-blocks under About: Currently / What I'm looking for.)
- **3 case studies at launch** (eStorie, Mention, eKonsilio), under `/work/[slug]`.
- **1 "Elsewhere" banner** below the 3 cards, compact, non-clickable, carries
  experiences outside the showcase (Sparteo, Bfast).
- **1 meta case study `/work/making-this`** planned for v1.1, written after launch
  in the same template as the others.
- **Minimal sticky nav**: Work · Method · About · Contact. System has no nav entry
  (experienced via scroll).
- **No taxonomy, no tags, no breadcrumbs.** Intentional.

---

## 2. Audience & behaviors (short recap)

Already framed in 90, 91, 92. What informs the IA:

- **Recruiter / talent (primary)** scans in 6–10s. First reflex: find the
  work (Work) and know how to contact (Contact). Both must be reachable instantly,
  from anywhere on the site, without thinking.
- **Head of design (secondary)** reads in depth: Method, case studies,
  System. Wants to enter a case study and stay (long read, zero friction to return).
- **IA consequence**: permanent Work + Contact nav; case study template
  designed for long reading; no scattering across multi-pages — unified scroll
  serves the quick scan.

---

## 3. Sitemap

```
/                              home (single page, scroll)
├─ #hero                       hook
├─ #work                       3 showcase cards
│   └─ Elsewhere               compact banner below cards
├─ #method                     5 named principles
├─ #system                     components section ("moderate +")
├─ #about                      About + Currently / What I'm looking for
└─ #contact                    footer

/work/estorie                  case study — to write
/work/mention                  case study — written, to rebalance visually
/work/ekonsilio                case study — to write (3-act arc)

/work/making-this              meta case study — v1.1, post-launch
```

**Type of each page:**

| Route | Type | Launch status | Note |
|---|---|---|---|
| `/` | singleton, scroll | ✅ launch | home + anchors |
| `/work/estorie` | detail (case template) | ✅ launch | confidentiality to verify |
| `/work/mention` | detail (case template) | ✅ launch | visual rebalancing |
| `/work/ekonsilio` | detail (case template) | ✅ launch | to write |
| `/work/making-this` | detail (case template) | ⏳ v1.1 | post-launch |

No `/work` index page: the `#work` showcase on the home plays that role, no
need for a parallel index page that would duplicate the list.

**Cross-references:**

- Each case study links top and bottom to `/#work` ("← Work").
- Each showcase `#work` card leads to its study `/work/[slug]` (the 3 at
  launch; Making this added in v1.1).
- The Elsewhere banner leads nowhere (intentionally — it is career context,
  not detailed content; the CV plays that role).

---

## 4. URL structure

**Retained pattern:** `/work/[slug]` for all case studies (decided D1).

Consistent with peers (daneden, valdivia), predictable, accommodates an nth case
study without breaking the model. The `/work/` prefix is also a useful label in
the URL itself (the reader knows where they are if they copy-paste).

**Slugs at launch:**

```
/work/estorie
/work/mention
/work/ekonsilio
/work/making-this        (v1.1)
```

**Principles:**

- Lowercase, kebab-case.
- No date in the URL (case studies are not dated by slug;
  dates are in the page header).
- No category in the URL (no taxonomy — see §7).
- Stable slug. Once published, a slug does not change — if renamed,
  redirect 301.
- No `/case-studies/`, no `/projects/`. `work` is shorter, more
  honest, and matches the nav label.

**Special cases:**

- `making-this`: short slug, pronounces the nav label. Not `making-this-site`
  (redundant), not `colophon` (label rejected).
- `estorie`: not `e-storie` (the brand name is one word).

---

## 5. Navigation

### 5.1 Primary nav (sticky)

On **all pages**, at the top, persistent through scroll:

```
Maxime Luet         Work · Method · About · Contact
```

- 4 items. Below the cognitive threshold (5-7 max).
- On the home, items are anchors (smooth scroll).
- On a case study, they bring back to home + anchor.
- No **System** entry in the nav (decided D4): the section is experienced via scroll
  for those who scroll down, but the label is opaque for a scanning recruiter. Better
  a nav everyone reads immediately than five items with one obscure one.
- The name **Maxime Luet** on the left is also a link to `/` (expected reflex).

**Order justification:** Work first (the work = the value), Method
next (the thinking), About (the person), Contact (the action). Also the priority
order of a scanning recruiter.

### 5.2 Secondary nav

Does not exist. The site is flat (2 levels, not 3). No sidebars, no
sub-menus.

### 5.3 Utility nav

Also non-existent in the classic sense (no login, no search, no cart).
Utility links (email, LinkedIn, CV) live in the **footer / Contact section**.

### 5.4 Breadcrumbs

None. The site has 2 levels (home → case study), the skill only recommends them
from 3. A simple **"← Work"** link at the top of each case study suffices, doubled
at the bottom by a return to `/#work`.

### 5.5 Footer

Minimal, factual. Not a full copy of the nav.

```
maxime.luet@gmail.com · LinkedIn · CV (PDF)

© Maxime Luet — 2026
Designed and built in Next.js + Tailwind. Hosted on Vercel.
(→ Making this)        ← appears in v1.1 when the page exists
```

The footer is also the Contact zone of the home (`#contact` leads there). No
ambiguity: one zone, two names (footer as object, Contact as nav).

---

## 6. Case study template (page `/work/[slug]`)

The highest-leverage point of this IA pass: if the 3 (then 4) case studies
share a stable wrapper, the reading stays consistent *and* the build has a
single template. The **inside** of the narrative stays free (Mention tells 2 fronts,
eKonsilio tells 3 acts — that is exactly what to preserve).

### 6.1 Standard structure

```
[← Work]                                            (return link, top)

# [Case title]                                       (H1 — action verb recommended,
                                                      cf. Mention: "Redesigning a
                                                      B2B SaaS design system")

[Role · Period]                                      (primary meta, header)
[Company type · Solo/team scope]                     (secondary meta)

[Opening visual]                                     (case hero — polished, shows the
                                                      work before reading starts)

## The context                                        (company + product, short)

## The problem                                        (starting situation)

## [Free section — narrative angle of the case]
   Mention      → "The mandate" + "The audit" + "The approach" (2 fronts)
   eKonsilio    → "Act 1 / Act 2 / Act 3"
   eStorie      → to define (probably: "The scope" + "The approach")
   Making this  → to define (meta-story: brief → discovery → execution)

[Interspersed visuals]                                (interfaces, diagrams, screenshots)

## The results

## What I take from this

[← Work]                                              (return link, bottom)
[Next case → ]                                        (link to next case)
```

### 6.2 Hard template rules

- **Honest header, non-negotiable** (red flag 7): the role, the period, the
  scope, the collaborators. It is *in* the template, not optional. Mention
  already has it: "sole designer, in collaboration with the product team and
  developers." eKonsilio will need: "UI/UX + design system + front in
  React. Fullstack/back collaborator on the POC; extended team later."
- **Opening visual required.** No wall of text as the entry (red flag 1).
  The visual immediately shows the work before reading begins.
- **Interspersed visuals.** Each long section must be punctuated with a visual or
  diagram. The visual rebalancing of Mention follows directly from this rule.
- **Voice-over, first person.** Mention's tone is the reference.
- **No decorative double diamond** (red flag 6). Phases are named with
  the case's own words, not generic methodology vocabulary.
- **Return link systematically** at top and bottom. The reader must never
  feel trapped on a detail page.
- **Link to next case** at the bottom ("Next case →"). Showcase order.

### 6.3 Special cases

**eStorie.** Confidentiality to verify (can screens be shown publicly,
can the product be named, etc.). If screens are confidential, the opening visual can be
worked around (anonymization, cropping, or product visual without data). To resolve before
writing.

**Making this.** Written *after* launch, in the same template. Mandate (landing
a job), context (10 years SaaS, competitive market, 200 look-alike portfolios),
problem (the current site + the benchmark of 14 portfolios),
approach (the decided axes and what was rejected), results (to fill when available),
what I take from this. The material is in 90/91/92/93 — a lot of cutting needed, not writing.

---

## 7. Taxonomy & metadata

**Categories: none.** 3–4 case studies do not need a categorization layer. The risk
on such a small volume is precisely adding one ("B2B SaaS", "Design System", "Greenfield"…)
and producing an over-corporatized effect for no reason.

**Tags: none.** Same. No `/tag/design-system` index page that would imply
50 cases behind it.

**Displayed metadata (per case)** — live in the page header, not as
nav filtering:

- Role (job title)
- Period (`YYYY – YYYY`)
- Company type (1 line: "B2B SaaS", "B2B2C Startup"…)
- Scope / collaborators (1–2 lines — honesty red flag 7)

These are **content data**, not taxonomy. They feed nothing other than their own page header.

**Technical metadata (SEO):**

- `<title>` per page:
  - Home: `Maxime Luet — Product Designer who codes`
  - Case study: `[Case title] — Maxime Luet`
- `<meta description>`: 1 sentence per page, derived from content.
- Open Graph image: per page (same as the opening visual for case studies,
  a dedicated image for the home).

---

## 8. Labels (settled vocabulary)

Reference table for the build — every label must come from this list, not be
reinvented along the way.

| Element | Retained label | Why |
|---|---|---|
| Showcase section | **Work** | Not "Projects" (generic), not "Portfolio" (meta), not "Selected work" (designer jargon). Simple, neutral, scannable. |
| Method section | **Method** | Already validated. Assumed conviction, dosed Authority register. |
| Components section | **System** | Short, speaks to designers; recruiters discover it via scroll. Not in nav (D4). |
| Personal section | **About** | Standard. No reason to reinvent. |
| Footer / form | **Contact** | Same. |
| Off-showcase banner | **Elsewhere** | Decided. True temporally (past + present) and tonally (voice-over). Not "Previously" (wrong: current role is present), not "Also" (flatter). |
| Situation mini-block | **Currently** | Already validated. Voice-over, present continuous. |
| Search mini-block | **What I'm looking for** | Already validated. Factual, recruiter-readable. |
| v1.1 meta page | **Making this** | Voice-over, present continuous, states the object (the site itself). Slug `/work/making-this`. |
| Return link | **← Work** | Not "Back", not "← Home". States where you return to. |
| Next case link | **Next case →** | Short, conventional. |
| Footer CV | **CV (PDF)** | States the format to avoid surprise. |

**Explicitly banned:**

- "Solutions", "Resources" — vague, catch-all (IA skill failure pattern).
- "Selected work", "Featured projects" — conventional designer jargon, empty.
- "Get in touch", "Let's chat" — Medium/Substack register rejected in 93.
- "My portfolio", "My work" — unnecessary possessive, the site is already yours.
- "Crafted", "delightful", "passionate" — banned category vocabulary from 93.

---

## 9. Build implications

For the upcoming Next.js pass, the IA implies:

- **App Router routing**:
  - `app/page.tsx`: home (all sections + anchors)
  - `app/work/[slug]/page.tsx`: single case study template (dynamic route)
  - `app/work/[slug]/page.tsx` reads content from MDX or an object — one
    `<CaseStudy>` component for all cases.
- **Shared components**:
  - `<StickyNav>` — 4 links, hash on home, full path elsewhere
  - `<CaseStudyHeader>` — visual + meta (role, period, type, scope)
  - `<CaseStudyFooter>` — ← Work + Next case →
  - `<Elsewhere>` — compact banner below showcase
  - `<Footer>` — Contact + mentions
- **MDX recommended** for case studies: separates content from component, and
  keeps content in plain text (eases a future FR version without i18n now).
- **Smooth scroll** enabled for anchors (`scroll-behavior: smooth`).
- **Basic SEO**: generated sitemap.xml, permissive robots.txt, Open Graph images
  per page (recruiters share links in Slack).

---

## 10. What we do not do (explicitly declared)

- No search engine.
- No breadcrumbs.
- No pagination, no archive.
- No categories, no tags, no category index pages.
- No blog or writing section (out of scope for this redesign).
- No dedicated contact page — `#contact` = footer.
- No `/work` index page — the `#work` showcase plays that role.
- No HTML CV page — link to the PDF.
- No light/dark toggle (light only at launch).
- No FR version (English only at launch).

These are choices, not oversights.

---

## 11. Open questions (post-IA)

- **eStorie confidentiality**: can screens / the name be published? Blocking
  decision for the case opening visual. To resolve before writing.
- **Opening visual for each case**: 1 static image? A mini-sequence? To
  decide at design time.
- **Home Open Graph image**: to design (the preview that appears when
  the link is shared — decisive for a recruiter sharing in Slack).

---

## Session decisions (recap)

| Question | Decision |
|---|---|
| Case study URL pattern | `/work/[slug]` (D1.a) |
| Does eStorie have a case study? | Yes, like the other two (D2) |
| Off-showcase (Sparteo/Bfast) | Compact banner, label **Elsewhere** (D3.b) |
| Primary nav | Sticky 4 links: Work · Method · About · Contact (D4.a) |
| Making-of / process page | Meta case study `/work/making-this`, written after launch, in v1.1 (D5.c) |
| Label for meta page | **Making this** |
| Showcase order | eStorie → Mention → eKonsilio (settled since 90) |
| Taxonomy | None (intentional) |
| Breadcrumbs | None (2 levels suffice) |
