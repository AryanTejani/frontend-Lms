# CLAUDE.md

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **State**: Zustand (UI-only), React Query (server state)
- **HTTP**: Axios
- **Validation**: Zod (the only allowed validation library)
- **Language**: TypeScript (strict)

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint (zero warnings)
npm run typecheck    # TypeScript type checking
npm run fix          # ESLint autofix + Prettier format
```

## Project Structure

Feature-based architecture with Next.js App Router:

```
app/                          # App Router (file-based routing)
├── (auth)/                   # Auth pages (sign-in, sign-up, forgot/reset password)
├── (platform)/               # Authenticated pages with sidebar layout
├── (onboarding)/             # Onboarding wizard (fullscreen, no sidebar)
├── (payment)/                # Payment flow (fullscreen, no sidebar)
├── api/                      # API routes (auth callbacks)
middleware.ts                 # Auth protection + redirects
src/
├── assets/icons/             # SVGR icons — barrel export from index.ts
├── components/               # Shared UI components
├── config/                   # App config, env, paths
├── features/<name>/          # Feature modules (domain logic + UI)
│   ├── client/               # 'use client' components, hooks, api.ts
│   ├── server/               # Server actions
│   ├── schemas/              # Zod schemas
│   ├── views/                # Page-level view components
│   ├── mockData.ts           # (optional) Typed mock data during development
│   ├── <Name>Context.tsx     # (optional) Feature-level context + provider
│   ├── types.ts
│   └── index.ts              # Public barrel export
├── lib/                      # Utilities (fetch client, helpers)
├── providers/                # Context providers (UI state only)
├── stores/                   # Zustand stores (UI state only)
├── styles/globals.css        # Design tokens + CSS variables (single source of truth)
└── types/                    # Shared TypeScript types
```

## Key Conventions

### Styling

- **All styling via Tailwind + CSS variable design tokens** from `src/styles/globals.css`
- Never hardcode hex colors, font sizes, spacing, border-radius, or magic numbers
- Use Tailwind utilities with design tokens: `bg-(--color-bg-primary)`, `px-(--space-base)`
- **Dark mode**: CSS variables only via `[data-theme="dark"]` — no conditional JS
  - Theme init: inline `<script>` in root layout prevents flash
  - Persistence: `localStorage.setItem('theme', theme)`
  - Toggle: `document.documentElement.setAttribute('data-theme', theme)`
  - Reference: `src/features/account/client/components/ThemeToggle.tsx`

### Page Patterns

- **Thin page + View** (preferred for client interactivity): `page.tsx` imports a View from `features/<name>/views/` — all UI/logic in the View. Used by auth, account, assistant, videos, onboarding, payment.
- **Server-rendered page**: `page.tsx` contains data + JSX directly. Acceptable for pages with no client state. Used by dashboard.

### Modals

- Overlay: `fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay)`
- Backdrop dismissal: outer `onClick={onClose}`, inner `onClick={e => e.stopPropagation()}`
- Two types: **AlertModal** (confirmation) and **form modals** (Zod-validated)
- Reference: `src/features/account/client/components/AlertModal.tsx`

### Shared UI Components

- Location: `src/components/ui/` barrel-exported from `index.ts`
- Import: `import { Button, TextField } from '@/components/ui'`
- Variant pattern: `cn()` utility from `@/utils/cn` merging variant classes + `className` prop
- Available: Button (6 variants), TextField (error states, 2 sizes), Badge (4 variants), Chatbox, SearchBar, MenuItem, AiPrompt

### Imports & Exports

- `@/*` absolute imports pointing to `src/*` — always use these
- Icons: import only from `@/assets/icons` barrel export (`import { IconSearch } from "@/assets/icons"`)
- Feature modules must have barrel exports (`index.ts`)

### State Management

- **Providers** (`src/providers/`): `'use client'`, UI state only (theme, modals, toasts) — no data fetching
- **Zustand stores** (`src/stores/`): UI-only (sidebar, modal state) — no API calls, no server data, no auth state
- **Server data**: React Query cache or server components
- **Auth state**: httpOnly cookies managed by middleware
- **Feature context**: For cross-component state within a single feature, use `features/<name>/<Name>Context.tsx` with a Provider + `use<Name>()` hook. Wire provider into route layout (e.g., `app/(platform)/assistant/layout.tsx`). Reference: `src/features/assistant/AssistantContext.tsx`

### Mock Data

- During development, use `mockData.ts` at the feature root (`features/<name>/mockData.ts`)
- Must be typed and match the shape real API responses will have
- Remove when connecting to real APIs

### Validation

- **Zod is the only validation library** — no Yup, Joi, or manual if-chains
- Every form and API boundary must use Zod schemas
- Infer TypeScript types from Zod: `type MyType = z.infer<typeof mySchema>` — never duplicate types manually
- Schemas live in `features/<name>/schemas/`

## Gotchas

1. **`useSearchParams()` requires `<Suspense>`**: Any view using `useSearchParams()` must wrap the consuming component in `<Suspense>`. See `src/features/auth/views/ResetPasswordView.tsx` for the pattern.

2. **Auth route sync**: Auth routes must be kept in sync across three files:
   - `src/config/paths.ts` — route constants
   - `middleware.ts` — `protectedRoutes` and `authRoutes` arrays
   - `src/lib/fetch.client.ts` — `authPaths` array in the 401 interceptor

3. **Feature module structure**: Every feature under `src/features/` must follow:
   ```
   features/<name>/
   ├── client/
   │   ├── components/
   │   ├── hooks/
   │   ├── api.ts
   │   └── index.ts
   ├── server/
   ├── schemas/
   ├── views/
   ├── types.ts
   └── index.ts
   ```
