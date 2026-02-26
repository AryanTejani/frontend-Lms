---
description: Use when creating a new feature module, adding a new domain area, or scaffolding a feature directory structure under src/features/
---

# New Feature Module

When creating a new feature module, scaffold the full directory structure under `src/features/<name>/`:

```
features/<name>/
├── client/
│   ├── components/       # 'use client' React components
│   ├── hooks/            # Custom hooks (forms, queries, etc.)
│   ├── api.ts            # API functions (Axios calls + Zod response parsing)
│   ├── mappers.ts        # (optional) Maps API Record types to UI Model types
│   └── index.ts          # Barrel export for client/
├── server/               # Server actions and utilities
├── schemas/              # Zod validation schemas
├── views/                # Page-level view components consumed by app/ routes
├── mockData.ts           # (optional) Typed mock data during development
├── <Name>Context.tsx     # (optional) Feature-level context + provider
├── types.ts              # TypeScript types (inferred from Zod via z.infer<>)
└── index.ts              # Public barrel export for the feature
```

## Rules

### Barrel Exports

Every directory must have an `index.ts` that re-exports its public API:

```ts
// features/<name>/index.ts
export * from './client';
export * from './views';
export * from './types';
// If feature has a context:
// export { <Name>Provider, use<Name> } from './<Name>Context';
```

```ts
// features/<name>/client/index.ts
export * from './api';
export * from './hooks';
export * from './components';
```

### Client Directive

All files under `client/components/` and `client/hooks/` that use React hooks or browser APIs must include `'use client'` at the top of the file.

### Path Aliases

Use `@/*` absolute imports (pointing to `src/*`) for all imports:

```ts
import { something } from '@/features/<name>/client';
import api from '@/lib/fetch.client';
```

### Types from Zod

Never define types manually — infer them from Zod schemas:

```ts
// schemas/<name>.schema.ts
import { z } from 'zod';

export const mySchema = z.object({ /* ... */ });

// types.ts
import type { z } from 'zod';
import type { mySchema } from './schemas';

export type MyType = z.infer<typeof mySchema>;
```

### API Functions

API functions in `client/api.ts` must:
- Use the shared Axios instance from `@/lib/fetch.client`
- Validate responses with Zod `.parse()` before returning
- Export error helpers (`isAuthError`, `getAuthErrorMessage` pattern) when applicable

### Feature-Level Context (optional)

For features needing shared state across components within the feature, create `<Name>Context.tsx` at the feature root with a Provider + `use<Name>()` hook. Wire into route layout (e.g., `app/(platform)/assistant/layout.tsx`).

```tsx
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface <Name>ContextValue {
  // state and setters
}

const <Name>Context = createContext<<Name>ContextValue | null>(null);

export function <Name>Provider({ children }: { children: ReactNode }) {
  // state setup
  return (
    <<Name>Context.Provider value={{ /* ... */ }}>
      {children}
    </<Name>Context.Provider>
  );
}

export function use<Name>() {
  const ctx = useContext(<Name>Context);
  if (!ctx) throw new Error('use<Name> must be used within <Name>Provider');
  return ctx;
}
```

Reference: `src/features/assistant/AssistantContext.tsx`

### Data Mappers (optional)

When the API returns a `Record` type with snake_case/raw DB values and the UI needs a formatted `Model` type, create `client/mappers.ts`.

**When to use:** API returns `VideoRecord` (snake_case, raw seconds, ISO dates) but the UI needs `Video` (formatted duration, date string, author name).

**Pattern:** The paginated React Query hook applies the mapper inside `queryFn`:

```ts
// client/hooks/useVideos.ts
export function useVideos(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['videos', { page, limit }],
    queryFn: async () => {
      const response = await fetchVideos({ page, limit });
      return {
        videos: response.data.map(mapVideoRecordToVideo),
        total: response.total,
        page: response.page,
        limit: response.limit,
      };
    },
  });
}
```

Query key pattern: `['resource', { page, limit }]`

Reference: `src/features/videos/client/mappers.ts` and `src/features/videos/client/hooks/useVideos.ts`

### Mock Data (optional)

During development, use `mockData.ts` at the feature root. Must be typed and match the shape real API responses will have. Remove when connecting to real APIs.

### Reference

See `src/features/auth/` for a complete example of the base structure.
See `src/features/assistant/` for an example with feature-level context.
