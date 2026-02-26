# TraderLion Design System Rules

> Rules for integrating Figma designs with the TraderLion platform codebase using the Model Context Protocol.

---

## Project Overview

TraderLion is a **monorepo** containing three applications:
- `traderlion-platform-frontend/` - Customer-facing React application
- `traderlion-platform-admin/` - Admin dashboard React application
- `traderlion-platform-backend/` - Node.js/Express API

Both frontend applications share an identical tech stack and structure.

---

## 1. Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.18 | Styling (utility-first) |
| Vite | 7.2.4 | Build tool |
| Zustand | 5.0.10 | State management |

---

## 2. Token Definitions

### Location
Tokens are provided by **Tailwind CSS v4 defaults**. No custom token file exists yet.

### How to Add Custom Tokens
Create or extend tokens in `src/styles/globals.css`:

```css
@import 'tailwindcss';

@theme {
  /* Custom colors */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;

  /* Custom typography */
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Custom spacing */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
}
```

### Available Default Tokens

**Colors:** 23 palettes × 11 shades (50-950)
- Neutrals: `slate`, `gray`, `zinc`, `neutral`, `stone`
- Primaries: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

**Typography:**
- Font sizes: `text-xs` to `text-9xl`
- Font weights: `font-thin` (100) to `font-black` (900)
- Line heights: `leading-tight` (1.25) to `leading-loose` (2)

**Spacing:** Base unit `0.25rem` with scale `0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96`

**Breakpoints:**
- `sm`: 640px (40rem)
- `md`: 768px (48rem)
- `lg`: 1024px (64rem)
- `xl`: 1280px (80rem)
- `2xl`: 1536px (96rem)

---

## 3. Component Library

### Directory Structure
```
src/components/
├── ui/                    # Primitive UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   ├── Card/
│   └── ...
├── layout/                # Layout components
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
├── forms/                 # Form components
│   ├── TextField/
│   └── Select/
└── index.ts               # Barrel exports
```

### Component Template

```tsx
// src/components/ui/Button/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
        ghost: 'hover:bg-gray-100',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

### Component Export Pattern

```ts
// src/components/ui/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'

// src/components/index.ts
export * from './ui/Button'
export * from './ui/Input'
// ...
```

---

## 4. Asset Management

### Directory Structure
```
src/assets/
├── images/               # Raster images (png, jpg, webp)
├── icons/                # SVG icons
├── fonts/                # Custom fonts (if not using CDN)
└── videos/               # Video files

public/
├── favicon.ico
├── og-image.png         # Social media preview
└── robots.txt
```

### How to Import Assets

```tsx
// Import as URL (for img src)
import logoUrl from '@/assets/images/logo.png'

// Import as React component (SVGs only)
import { ReactComponent as Logo } from '@/assets/icons/logo.svg'

// Usage
<img src={logoUrl} alt="Logo" />
<Logo className="h-8 w-8" />
```

### Asset Naming Convention
- Use **kebab-case**: `user-avatar.png`, `arrow-right.svg`
- Include size for multiple versions: `logo-sm.png`, `logo-lg.png`
- Include state if applicable: `checkbox-checked.svg`, `checkbox-unchecked.svg`

---

## 5. Icon System

### Recommended Setup
Install an icon library:

```bash
npm install @heroicons/react
# or
npm install lucide-react
```

### Usage Pattern

```tsx
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon as ArrowRightSolid } from '@heroicons/react/24/solid'

// Usage
<ArrowRightIcon className="h-5 w-5 text-gray-500" />
```

### Custom Icons
Store custom SVG icons in `src/assets/icons/` and create an icon component:

```tsx
// src/components/ui/Icon/Icon.tsx
import { type SVGProps } from 'react'

const icons = {
  'custom-logo': (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      {/* SVG paths */}
    </svg>
  ),
} as const

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof icons
  size?: number
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const IconComponent = icons[name]
  return <IconComponent width={size} height={size} className={className} {...props} />
}
```

---

## 6. Styling Approach

### Methodology
**Utility-first CSS with Tailwind CSS 4**

### Class Organization
Order Tailwind classes consistently:

1. Layout (display, position, overflow)
2. Box model (width, height, padding, margin)
3. Typography (font, text, leading)
4. Visual (background, border, shadow)
5. Interactive (hover, focus, transition)

```tsx
// Good
<div className="flex items-center gap-4 p-4 text-sm text-gray-700 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">

// Avoid - unorganized
<div className="hover:shadow-md text-sm shadow-sm p-4 flex bg-white rounded-lg gap-4 items-center text-gray-700 transition-shadow">
```

### Responsive Design Pattern

```tsx
// Mobile-first approach
<div className="
  flex flex-col gap-4
  md:flex-row md:gap-6
  lg:gap-8
">
```

### Extracting Repeated Patterns
Use `@apply` sparingly for truly repeated patterns:

```css
/* src/styles/globals.css */
@import 'tailwindcss';

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }
}
```

### Conditional Classes
Use `clsx` or `classnames` for conditional styling:

```tsx
import clsx from 'clsx'

<button
  className={clsx(
    'rounded-md px-4 py-2 font-medium',
    isActive ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700',
    isDisabled && 'cursor-not-allowed opacity-50'
  )}
>
```

---

## 7. Project Structure

### Feature-Based Organization

```
src/
├── app/                      # Route definitions
│   ├── (auth)/              # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Dashboard route group
│   │   ├── overview/
│   │   └── settings/
│   └── layout.tsx
│
├── components/              # Shared UI components
│   ├── ui/                  # Primitive components
│   ├── layout/              # Layout components
│   └── forms/               # Form components
│
├── features/                # Feature modules
│   ├── auth/
│   │   ├── components/      # Feature-specific components
│   │   ├── hooks/           # Feature-specific hooks
│   │   ├── api/             # API calls
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Public API
│   ├── trading/
│   └── portfolio/
│
├── lib/                     # Utilities and configurations
│   ├── axios.ts             # HTTP client
│   ├── utils.ts             # Helper functions
│   └── constants.ts         # App constants
│
├── store/                   # Global state
│   ├── useAuthStore.ts
│   └── useUIStore.ts
│
├── styles/                  # Global styles
│   └── globals.css
│
├── types/                   # Shared TypeScript types
│   └── index.ts
│
└── assets/                  # Static assets
    ├── images/
    └── icons/
```

---

## 8. Figma Integration Guidelines

### Mapping Figma to Tailwind

| Figma Property | Tailwind Utility |
|----------------|------------------|
| Auto Layout (horizontal) | `flex flex-row` |
| Auto Layout (vertical) | `flex flex-col` |
| Gap: 16px | `gap-4` |
| Padding: 24px | `p-6` |
| Border radius: 8px | `rounded-lg` |
| Fill: #3B82F6 | `bg-blue-500` |
| Stroke: 1px #E5E7EB | `border border-gray-200` |
| Drop shadow | `shadow-md` |
| Font: Inter 16px Medium | `font-medium text-base` |

### Figma Spacing to Tailwind

| Figma (px) | Tailwind | Rem |
|------------|----------|-----|
| 4 | `1` | 0.25rem |
| 8 | `2` | 0.5rem |
| 12 | `3` | 0.75rem |
| 16 | `4` | 1rem |
| 20 | `5` | 1.25rem |
| 24 | `6` | 1.5rem |
| 32 | `8` | 2rem |
| 40 | `10` | 2.5rem |
| 48 | `12` | 3rem |
| 64 | `16` | 4rem |

### Figma Font Sizes to Tailwind

| Figma (px) | Tailwind |
|------------|----------|
| 12 | `text-xs` |
| 14 | `text-sm` |
| 16 | `text-base` |
| 18 | `text-lg` |
| 20 | `text-xl` |
| 24 | `text-2xl` |
| 30 | `text-3xl` |
| 36 | `text-4xl` |
| 48 | `text-5xl` |

### Color Mapping Guidelines

When mapping Figma colors:

1. **Find the closest Tailwind color**: Use the [Tailwind color palette](https://tailwindcss.com/docs/customizing-colors)
2. **If exact match needed**: Add custom color token in `globals.css`
3. **Semantic naming**: Prefer semantic names (`primary`, `success`, `error`) over literal colors

```css
@theme {
  /* Map Figma brand colors */
  --color-brand: #your-brand-color;
  --color-brand-light: #lighter-variant;
  --color-brand-dark: #darker-variant;
}
```

---

## 9. Code Style Standards

### TypeScript
- Use explicit types for component props
- Prefer `interface` over `type` for object shapes
- Export types alongside components

### File Naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `PascalCase.types.ts` (e.g., `Button.types.ts`)
- Constants: `SCREAMING_SNAKE_CASE` values in `camelCase.ts` files

### Imports Order (enforced by ESLint)
1. Built-in modules
2. External packages
3. Internal modules (`@/`)
4. Parent imports (`../`)
5. Sibling imports (`./`)
6. Type imports

```tsx
import { useState, useEffect } from 'react'

import { clsx } from 'clsx'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth'

import { formatPrice } from '../utils'

import { type CardProps } from './Card.types'
```

---

## 10. Best Practices for Figma-to-Code

### DO
- Use semantic HTML elements (`button`, `nav`, `main`, `section`)
- Implement responsive designs mobile-first
- Use Tailwind's built-in colors when possible
- Extract repeated patterns into components
- Add proper accessibility attributes (`aria-*`, `role`)

### DON'T
- Use arbitrary values (`w-[123px]`) unless absolutely necessary
- Create components for one-off designs
- Hardcode colors - use Tailwind tokens
- Ignore Figma's Auto Layout - it maps directly to Flexbox
- Skip hover/focus states shown in Figma

### Accessibility Checklist
- [ ] Interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Focus states are visible
- [ ] Semantic headings hierarchy (h1 → h2 → h3)

---

## 11. Path Aliases

Use the `@` alias for clean imports:

```tsx
// Good
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth'

// Avoid
import { Button } from '../../../components/ui/Button'
```

Configured in `tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 12. Recommended Dependencies

For implementing Figma designs, consider adding:

```bash
# Variant management
npm install class-variance-authority

# Conditional classes
npm install clsx

# Icons
npm install @heroicons/react
# or
npm install lucide-react

# Headless UI (for accessible components)
npm install @headlessui/react

# Animations
npm install framer-motion
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│ FIGMA TO TAILWIND QUICK REFERENCE                           │
├─────────────────────────────────────────────────────────────┤
│ Auto Layout Horizontal → flex flex-row                      │
│ Auto Layout Vertical   → flex flex-col                      │
│ Gap 16px               → gap-4                              │
│ Padding 24px           → p-6                                │
│ Margin 16px            → m-4                                │
│ Width Fill             → w-full                             │
│ Width Hug              → w-fit                              │
│ Width Fixed 200px      → w-[200px] (avoid if possible)      │
│ Border Radius 8px      → rounded-lg                         │
│ Shadow (small)         → shadow-sm                          │
│ Shadow (medium)        → shadow-md                          │
│ Font 14px              → text-sm                            │
│ Font 16px              → text-base                          │
│ Font Medium            → font-medium                        │
│ Font Bold              → font-bold                          │
│ Text Gray 500          → text-gray-500                      │
│ BG White               → bg-white                           │
│ Border Gray 200        → border border-gray-200             │
└─────────────────────────────────────────────────────────────┘
```

---

*Last updated: January 2026*
*Stack: React 19 + TypeScript 5.9 + Tailwind CSS 4 + Vite 7*
