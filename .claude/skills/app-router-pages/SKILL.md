---
description: Use when creating a new page, route, or view in the Next.js App Router, or when adding entries to the app/ directory
---

# New Page / Route

When creating a new page in the Next.js App Router, follow all of these steps.

## 1. Choose the Route Group

Place the page in the correct route group:

- `(auth)` — auth pages, no sidebar (sign-in, sign-up, forgot/reset password)
- `(platform)` — authenticated pages with sidebar layout
- `(onboarding)` — onboarding wizard (fullscreen, no sidebar)
- `(payment)` — payment flow (fullscreen, no sidebar)

## 2. Create the App Router Page

Create `app/(group)/route/page.tsx` with a `Metadata` export and a View component import:

```tsx
import type { Metadata } from 'next';
import { MyView } from '@/features/<name>/views';

export const metadata: Metadata = {
  title: 'Page Title',
};

export default function MyPage() {
  return <MyView />;
}
```

- The page file is thin — all UI lives in the View component
- For server-rendered pages with no client state, data and JSX can live directly in `page.tsx`. For pages with client interactivity (tabs, modals, forms), always delegate to a View.

## 2b. Dynamic Route Params (Next.js 16 / React 19)

In Next.js 16, `params` is a `Promise<{...}>` — it must be unwrapped with `use()` at the top of the component. This is required even in `'use client'` pages.

```tsx
'use client';

import { use } from 'react';

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <CourseView slug={slug} />;
}
```

Reference: `app/(platform)/academy/[slug]/page.tsx`

## 3. Create Route Group Layout (if new group)

If the route group doesn't have a `layout.tsx` yet, create one:

```tsx
// app/(group)/layout.tsx
export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col bg-(--color-bg-primary)">{children}</div>;
}
```

## 4. Create the View Component

Create the view in `src/features/<name>/views/MyView.tsx`:

```tsx
'use client';

export function MyView() {
  return (
    // Page layout and content here
  );
}
```

**If the view uses `useSearchParams()`**, wrap the content in `<Suspense>`:

```tsx
'use client';

import { Suspense } from 'react';

function MyViewContent() {
  const searchParams = useSearchParams();
  // ... component using search params
}

export function MyView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyViewContent />
    </Suspense>
  );
}
```

Reference: `src/features/auth/views/ResetPasswordView.tsx`

## 5. Add Barrel Export

Export the view from `src/features/<name>/views/index.ts`:

```ts
export { MyView } from './MyView';
```

## 6. Register the Route in `src/config/paths.ts`

Add the route constant:

```ts
export const paths = {
  // ...existing routes
  myFeature: {
    myPage: '/my-page',
  },
} as const;
```

## 7. Classify the Route in `middleware.ts`

Add the path to the appropriate array:

- **`protectedRoutes`** — requires authentication (redirects to `/sign-in` if no session)
- **`authRoutes`** — auth pages only (redirects to `/dashboard` if already authenticated)

## 8. Auth Route Sync (if auth-related)

If the route is auth-related, also add it to the `authPaths` array in `src/lib/fetch.client.ts` so the 401 interceptor doesn't redirect when the user is already on an auth page.

## Checklist

- [ ] Route group layout exists (create if new group)
- [ ] `app/(group)/route/page.tsx` created with `Metadata` export
- [ ] View component in `src/features/<name>/views/`
- [ ] `<Suspense>` boundary if `useSearchParams()` is used
- [ ] Barrel export in `views/index.ts`
- [ ] Route added to `src/config/paths.ts`
- [ ] Route classified in `middleware.ts`
- [ ] Auth paths synced in `src/lib/fetch.client.ts` (if auth-related)
