# Agents

This file is read by AI coding assistants. Edit freely outside the Lyse-managed block.

## Toolchain

| File | Purpose |
|---|---|
| `package.json` | Dependencies & scripts (`dev`, `build`, `lint`) |
| `tsconfig.json` | TypeScript config (strict mode, path aliases `@/*`) |
| `next.config.ts` | Next.js 15 App Router config |
| `components.json` | shadcn/ui registry config |
| `.lyse.yaml` | Lyse DS audit config |
| `app/global.css` | Tailwind v4 `@theme inline` tokens + base styles |

Package manager: **npm** (package-lock.json present). pnpm not available in this environment.

## Lyse audit (auto-managed)

<!-- lyse-managed:begin -->
### Validate design-system conformance

```bash
pnpm exec lyse audit
```

Exit codes:
- 0 — pass (Health Score ≥ project threshold)
- 1 — fail (Health Score below threshold or hard errors)
- 2 — config error
<!-- lyse-managed:end -->
