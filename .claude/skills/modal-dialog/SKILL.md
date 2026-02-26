---
description: Use when creating a modal or dialog, including confirmation modals, delete confirmations, or form modals with validation
---

# Modal Dialog

When creating a modal, follow the overlay pattern and choose the appropriate type.

## Overlay Pattern

Every modal uses this overlay wrapper for backdrop + centering:

```tsx
<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
  onClick={onClose}
>
  <div onClick={(e) => e.stopPropagation()}>
    {/* Modal content */}
  </div>
</div>
```

- Outer div: fixed overlay, closes on backdrop click
- Inner div: stops propagation so clicking modal content doesn't close it

## Type 1: Confirmation Modal (wraps AlertModal)

For yes/no actions (delete, cancel, discard). Wraps the shared `AlertModal` component.

```tsx
'use client';

import { AlertModal } from './AlertModal';

interface MyConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function MyConfirmModal({ onConfirm, onCancel }: MyConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onCancel}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <AlertModal
          variant="destructive"
          title="Confirm Action"
          description="Are you sure? This action cannot be undone."
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
          className="bg-(--color-bg-primary)"
        />
      </div>
    </div>
  );
}
```

- `variant`: `'default'` (primary action color) or `'destructive'` (error color)
- Reference: `src/features/account/client/components/DeleteAccountModal.tsx`
- AlertModal source: `src/features/account/client/components/AlertModal.tsx`

## Type 2: Form Modal (Zod-validated)

For modals with input fields (change password, edit profile). Uses `TextField` and `Button` from `@/components/ui` with Zod schema validation.

```tsx
'use client';

import { useState } from 'react';
import { TextField, Button } from '@/components/ui';
import { myFormSchema } from '../../schemas';

interface MyFormModalProps {
  onClose: () => void;
}

export function MyFormModal({ onClose }: MyFormModalProps) {
  const [fieldValue, setFieldValue] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const result = myFormSchema.safeParse({ fieldValue });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string') {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    // Submit logic here
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-(--space-lg) w-full max-w-[480px] px-(--space-lg) py-(--space-lg) rounded-xl border border-(--color-stroke-tertiary) bg-(--color-bg-primary) shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="body-1 font-semibold text-(--color-text-primary)">Modal Title</h3>

        <div className="flex flex-col gap-(--space-base)">
          <TextField
            label="Field Label"
            value={fieldValue}
            onChange={setFieldValue}
            error={errors.fieldValue}
          />
        </div>

        <div className="flex justify-end gap-(--space-xs2)">
          <Button variant="stroke" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-full">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- Zod schema lives in `features/<feature>/schemas/`
- Reference: `src/features/account/client/components/ChangePasswordModal.tsx`

## Wiring in Parent

Toggle via `useState<boolean>` and conditionally render:

```tsx
const [showModal, setShowModal] = useState(false);

// In JSX:
{showModal && <MyModal onClose={() => setShowModal(false)} />}
```

## Checklist

- [ ] Modal component in `features/<feature>/client/components/`
- [ ] Zod schema in `features/<feature>/schemas/` (form modals only)
- [ ] Overlay pattern with backdrop dismissal
- [ ] Uses shared UI components (Button, TextField)
- [ ] Barrel export in `client/components/index.ts`
