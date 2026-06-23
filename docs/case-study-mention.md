# Mention — Redesigning a B2B SaaS design system

**Product Designer · October 2022 – July 2024**
Media monitoring & social listening platform · Sole designer, in collaboration with the product team and developers

---

## The context

Mention is a SaaS platform for media monitoring and social listening: it lets you track the web and social media, analyze online conversations, and manage your social presence, all in one tool. I was the sole designer there, working directly with PMs and developers.

The product was built on Material UI, dressed with a thin CSS layer replacing its colors. On the design side, there was no UI Kit: only scattered Figma mockups. Neither design nor code had a shared source of truth.

---

## The problem

Without a shared system, each team worked in silos — and design stayed at the end of the chain, never where product decisions were made.

On the design side, mockups lived in a catch-all Figma file, undocumented, where anyone would overwrite each other's work. No UI Kit, no rules: just stacked screens.

On the development side, with no shared library, components barely existed. A piece of working production code would get copy-pasted into the current screen, styled to match the mockup. No structured, documented component — just duplication. Colors were hardcoded, scattered across HTML, CSS, and these pseudo-components, while Material UI disappeared under layers of CSS patches.

Between the two: no handoff. Delivery meant dropping a Figma link into a Jira ticket, without context or intent. The cost came due in review: front-end feedback and test cycles stacked up to the point where a user story could take as long to correct as to build.

The result wasn't just visual inconsistencies from one screen to the next. It was a team spending its energy patching and redoing, instead of designing.

---

## The mandate

I wasn't hired to tidy a Figma file. The Head of Product brought me in with a clear objective: bring design into product decisions. Until then, design was executing choices already made upstream by PMs and developers. The goal was to make it a voice in its own right — and more broadly, to spread a design culture first within the product team, then developers, then the whole company.

The design system was not an end in itself. It was the means: concrete ground for bringing design and development closer, and establishing a shared way of working.

## The audit

Rather than attacking components right away, I started with a full picture: the Figma file, the production UI, the app's overall UX, team workflow, and handoff. The goal was to understand where time and consistency were being lost before deciding what to change.

This audit produced an action plan running on two fronts in parallel. With the Foundation squad — the team responsible for the product's technical foundations — the system front: a UI Kit shared across design and code. With the PMs, the collaboration front: a shared way to frame, document, and hand off work.

---

## The approach

The action plan advanced on two parallel fronts. First, bring teams together around a shared way of working; then give them the technical foundation to make it last.

### Front 1 — Structured collaboration (with PMs)

**Normalize Figma files.** As long as design lived in a catch-all file where anyone could overwrite anyone else's work, no source of truth was possible. I gave Figma files a normalized structure — a predictable organization where everything has its place and where you can find the actual state of a screen without asking.

**Define "done."** The endless review cycles came from an unstated disagreement about what a finished mockup was. A shared Definition of Done settled it upfront: a design was only handed off when it covered all its states — default, empty, error, loading. The debate happened before development, not after.

**Reliable handoff.** A Figma link dropped in a ticket conveys neither intent, nor decisions, nor cases to cover. I rebuilt the handoff end to end.

Zeplin became the "ready to dev" gateway: a checkpoint where only validated mockups entered, accompanied by their specs, serving as the single source of truth for all teams.

In Jira, I introduced a workflow and ticket templates that explicitly connected design and development. A parent ticket carried the product objective — a feature, a problem to solve. Under it, design user stories each carried the design context: link to discovery, UX research, user feedback, the list of use cases to produce, a Definition of Done covering all states (default, empty, error, loading), and a prototype when needed. Dev user stories were attached to one or more design user stories: the developer found context, decisions and comments, the relevant Zeplin links, their dedicated Git branch, and a reference to Storybook when the component was documented there.

Handoff stopped being a wall between two teams. It became a continuous thread: from the product problem to the integrated component, each link carried the context of the one before.

### Front 2 — A shared foundation for design and code (with the Foundation squad)

**Build from the existing, not from a blank page.** The product was built on Material UI. Rather than imposing a brutal redesign — risky, and felt as a repudiation by the devs — I kept Material UI as the base and redesigned it: a Figma UI Kit that preserved the existing components, but reworked, drawing on the principles of *Refactoring UI* and *Practical UI*.

**Add an abstraction layer between style and components.** Hardcoded colors scattered across HTML and CSS made every change risky and manual. By introducing TailwindCSS and its design tokens, style stopped being written literally everywhere: it passed through an intermediate layer, changeable in one place, applied everywhere.

**Build components with the devs, not for them.** A turnkey design system would have been bypassed like everything else. Components were built with the front-end developers, to fit their process and become their tool — not another top-down constraint.

**Document to make the foundation accessible.** A system nobody can read isn't a shared system, just another folder. Storybook gave components a living, documented library, readable by everyone. Crucially, via the Storybook Designs addon, each component was linked to its reference Figma mockup: the mockup displayed directly in a "Design" tab, alongside the real component. Designers and developers finally looked at the same object, described in the same place, without switching tools. The library also served as the entry point for new front-end and fullstack developers: instead of digging through scattered code to understand what existed, they had a clear catalog — which significantly accelerated their onboarding.

---

## The results

**One shared source of truth.** Designers, PMs, and developers finally worked from the same references: a Figma UI Kit, a documented component library, validated mockups. The UI Kit covered the breadth of Material UI — nearly 100 screens in three breakdowns: desktop, tablet, mobile.

**Less friction, less rework.** The endless review cycles cleared up: with a shared Definition of Done and structured components, the debate happened upfront, not at the finish line. Components, tested once at the library level, no longer needed re-checking with each feature — production test load was reduced accordingly.

**Design integrated, not executed.** That was the original mandate, and it was met. The workflow connected product context to design user stories to dev user stories; design no longer arrived at the end of the chain, it was present where decisions were made. Visual consistency also extended beyond the product, aligning the interface with marketing materials.

**Time returned to design.** By stopping the patching, the team reclaimed time for what matters: discovery, UX research, R&D. It even became possible to quickly build POCs to validate a feature idea or concept before committing.

---

## What I take from this

**A design system is a social tool before it's a technical one.** The hardest part wasn't drawing components or structuring tokens — it was getting a shared way of working adopted. Building components *with* developers rather than delivering them was what made the difference between a living system and an ignored library. I'd approach it the same way today.

**Tools age, principles don't.** At the time, Zeplin was the right choice for the "ready to dev" gateway. Since then, Figma's own evolutions — sharing modes, dev mode, integrated specs — have made that intermediary obsolete: today I'd have Figma itself play that role, without a third-party tool. What mattered wasn't Zeplin, but the function it served: a clear boundary between "in progress" and "ready to build." That function remains necessary.

**What I carry forward.** This project confirmed what genuinely interests me: not the design system for itself, but what it enables — connecting design, product, and code in a single movement. That has become the thread of my practice.
