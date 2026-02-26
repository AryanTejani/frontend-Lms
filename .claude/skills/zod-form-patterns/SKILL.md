---
description: Use when creating a new form, building form validation, or adding user input handling with submission logic
---

# New Form

When creating a form, follow the full pattern. Reference implementation: `src/features/auth/`.

## 1. Zod Schema (`schemas/`)

Create the validation schema and infer the type:

```ts
// features/<name>/schemas/<form>.schema.ts
import { z } from 'zod';

export const myFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(1, 'Name is required'),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

Export from `schemas/index.ts`:

```ts
export { myFormSchema, type MyFormData } from './<form>.schema';
```

## 2. Form Hook (`client/hooks/`)

Create a `use<Name>Form` hook that manages state, validation, and submission:

```ts
// features/<name>/client/hooks/use<Name>Form.ts
'use client';

import { useState } from 'react';
import { myFormSchema, type MyFormData } from '../../schemas';
import { submitForm } from '../api';
import { isAuthError, getAuthErrorMessage, isRateLimitError, getRetryAfterSeconds } from '../api';

export function useMyForm() {
  const [formData, setFormData] = useState<MyFormData>({ email: '', name: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof MyFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const validate = (): boolean => {
    const result = myFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof MyFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    setApiError(null);
    try {
      await submitForm(formData);
      // Handle success (redirect, toast, etc.)
    } catch (error) {
      if (isRateLimitError(error)) {
        const seconds = getRetryAfterSeconds(error);
        setRateLimitSeconds(seconds);
        // Start countdown timer
      }
      setApiError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, setFormData, errors, apiError, isLoading, rateLimitSeconds, handleSubmit };
}
```

Key patterns:
- **Validation**: `schema.safeParse()` — map errors to field-level messages
- **Error handling**: `isAuthError()` / `getAuthErrorMessage()` from `client/api.ts`
- **Rate limiting**: `isRateLimitError()` / `getRetryAfterSeconds()` with countdown

## 3. Form Component (`client/components/`)

Create a controlled form component:

```tsx
// features/<name>/client/components/MyForm.tsx
'use client';

import { useMyForm } from '../hooks/useMyForm';

export function MyForm() {
  const { formData, setFormData, errors, apiError, isLoading, handleSubmit } = useMyForm();

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {apiError && <div className="text-(--color-error)">{apiError}</div>}

      <input
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      />
      {errors.email && <span className="text-(--color-error)">{errors.email}</span>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## 4. View Component (`views/`)

Wrap in layout. Add `<Suspense>` if `useSearchParams()` is used:

```tsx
'use client';

import { MyForm } from '../client/components/MyForm';

export function MyFormView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-(--card-width-md)">
        <MyForm />
      </div>
    </div>
  );
}
```

## 5. Error Handling Pattern

API error helpers in `client/api.ts` (see `src/features/auth/client/api.ts` for reference):

- `isAuthError(error)` — type guard for structured API errors
- `getAuthErrorMessage(error)` — maps error codes to user-facing messages
- `isRateLimitError(error)` — checks for 429 status
- `getRetryAfterSeconds(error)` — extracts retry-after header, defaults to 60s

## Checklist

- [ ] Zod schema in `schemas/` with `z.infer<>` type export
- [ ] `use<Name>Form` hook in `client/hooks/` with validation, submission, error/loading state
- [ ] Form component in `client/components/` with controlled inputs and error display
- [ ] View component in `views/` with layout wrapper
- [ ] Error handling using `isAuthError` / `getAuthErrorMessage` pattern
- [ ] Rate limit handling with countdown if applicable
- [ ] Barrel exports in all `index.ts` files
