---
description: Use when creating a new shared UI component in src/components/ui/, building a reusable component with variants, or adding to the component library
---

# Shared UI Component

When creating a new shared UI component, follow the variant-based pattern used across the codebase.

## File Location

`src/components/ui/<Name>.tsx`

## Component Template

```tsx
import { cn } from '@/utils/cn';

type <Name>Variant = 'default' | 'secondary';

interface <Name>Props {
  variant?: <Name>Variant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<<Name>Variant, string> = {
  default: 'bg-(--color-action-primary) text-(--color-text-inverse)',
  secondary: 'bg-(--color-bg-secondary) text-(--color-text-primary)',
};

export function <Name>({ variant = 'default', children, className }: <Name>Props) {
  return (
    <div className={cn('base-classes-here', variantClasses[variant], className)}>
      {children}
    </div>
  );
}
```

Only add `'use client'` if the component uses hooks or browser APIs.

## Rules

### CSS Variable Design Tokens Only

Never hardcode hex colors, font sizes, spacing, or border-radius. Use Tailwind utilities with CSS variables from `src/styles/globals.css`:

```tsx
// Good
'bg-(--color-bg-primary) px-(--space-base) rounded-(--radius-lg)'

// Bad
'bg-white px-4 rounded-lg'
```

### `cn()` Utility

Always use `cn()` from `@/utils/cn` (clsx + tailwind-merge) for class merging:

```tsx
import { cn } from '@/utils/cn';

// Merge base + variant + consumer override
className={cn('base-classes', variantClasses[variant], className)}
```

### `className` Prop

Every component must accept an optional `className` prop for consumer overrides, merged last via `cn()`.

### Conditional Variant Pattern

For boolean-based conditional styling (instead of a Record), use logical AND:

```tsx
className={cn(
  'base-classes',
  variant === 'success' && 'bg-(--color-text-success)/10 text-(--color-text-success)',
  variant === 'neutral' && 'bg-(--color-bg-secondary) text-(--color-text-secondary)',
  className
)}
```

Reference: `src/components/ui/Badge.tsx`

### Link/Button Dual Rendering

If a component should render as `<Link>` when `href` is provided and `<button>` otherwise:

```tsx
if (href) {
  return <Link href={href} className={sharedClasses}>{content}</Link>;
}
return <button type="button" className={sharedClasses}>{content}</button>;
```

Reference: `src/components/ui/MenuItem.tsx`

### Size Variants

Use a separate `size` prop with conditional classes:

```tsx
size === 'sm'
  ? 'h-[36px] px-(--space-sm) label-2 label-2-regular'
  : 'h-(--input-height) px-(--space-base) label-1 label-1-regular'
```

Reference: `src/components/ui/TextField.tsx`

## Barrel Export

Export from `src/components/ui/index.ts`:

```ts
export { <Name> } from './<Name>';
```

## References

- Variant pattern: `src/components/ui/Button.tsx`
- Variant + error states: `src/components/ui/TextField.tsx`
- Conditional variant: `src/components/ui/Badge.tsx`
- Link/button dual: `src/components/ui/MenuItem.tsx`

## Specialized Component Patterns

### CDN Video Embed (VideoPlayer)

For BunnyCDN (or any iframe-based video CDN), build a wrapper that handles aspect ratio and
embed parameters. Does NOT need `forwardRef` since it wraps an `<iframe>`, not a DOM element.

```tsx
interface VideoPlayerProps {
  src: string;           // BunnyCDN embed URL
  className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const embedUrl = `${src}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;

  return (
    <div className={className}>
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
```

- `aspect-video` + absolute fill = responsive 16:9 container
- No `"use client"` needed (no hooks/state)
- Append CDN-specific query params to `src` for playback control
- Reference: `src/components/ui/VideoPlayer.tsx`

### Controlled/Uncontrolled Hybrid (Chatbox)

When a component should work both as a controlled input (parent manages value) and as a
standalone (internal state), use optional `value`/`onChange` props with an internal fallback:

```tsx
interface ChatboxProps {
  value?: string;              // controlled: parent manages
  onChange?: (v: string) => void;
  onSubmit?: (v: string) => void;
  placeholder?: string;
}

export function Chatbox({ value: controlledValue, onChange, onSubmit, placeholder }: ChatboxProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;
  const setValue = useCallback(
    (v: string) => { if (onChange) onChange(v); else setInternalValue(v); },
    [onChange],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setValue('');
  };
  // ...
}
```

Use when: a text input component should be embeddable in forms (controlled) AND usable standalone.
Reference: `src/components/ui/Chatbox.tsx`

## Checklist

- [ ] Component in `src/components/ui/<Name>.tsx`
- [ ] Uses `cn()` from `@/utils/cn`
- [ ] Accepts `className` prop
- [ ] CSS variable tokens only (no hardcoded colors/spacing)
- [ ] Exported from `src/components/ui/index.ts`
