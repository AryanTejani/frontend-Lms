import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface MessageBoxProps {
  variant: 'user' | 'ai';
  children: ReactNode;
  className?: string;
}

export function MessageBox({ variant, children, className }: MessageBoxProps) {
  return (
    <div
      className={cn(
        'rounded-xl px-(--space-base) py-(--space-sm) label-1 label-1-regular shadow-sm',
        variant === 'user'
          ? 'bg-(--color-bg-active) border border-(--color-stroke-active) text-(--color-text-primary)'
          : 'bg-(--color-bg-primary) border border-(--color-bg-tertiary) text-(--color-text-primary)',
        className
      )}
    >
      {children}
    </div>
  );
}
