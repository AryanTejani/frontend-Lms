---
description: Use when an API endpoint returns a Record type (snake_case, raw DB values) and the UI needs a formatted Model type with display-friendly fields
---

# Data Mappers

When the API response shape doesn't match the UI display shape, create a mapper file at
`src/features/<name>/client/mappers.ts`.

## When to Use

- API returns `VideoRecord` (snake_case, raw seconds, ISO dates) but UI needs `Video` (formatted duration, date string, author name)
- You want to keep API types and UI types separate so changes to either don't bleed through

## Pattern

One exported function per entity, named `map<Name>RecordTo<Model>`:

```ts
// src/features/<name>/client/mappers.ts
import type { <Name>Record, <Name> } from '../types';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(dateStr));
}

export function map<Name>RecordTo<Name>(record: <Name>Record): <Name> {
  return {
    id: record.id,
    title: record.title,
    duration: formatDuration(record.duration),
    date: formatDate(record.created_at),
    // ...
  };
}
```

## Using in React Query Hooks

Import and apply in the `queryFn`:

```ts
import { map<Name>RecordTo<Name> } from '../mappers';

queryFn: async () => {
  const response = await fetch<Name>s({ page, limit });
  return {
    items: response.data.map(map<Name>RecordTo<Name>),
    total: response.total,
  };
},
```

Query key includes pagination: `['<name>s', { page, limit }]`

## Reference

`src/features/videos/client/mappers.ts` — complete working example with `formatDuration`,
`formatDate`, `getInstructorName` helpers.
`src/features/videos/client/hooks/useVideos.ts` — shows mapper used inside `queryFn`.
