'use client';

import { cn } from '@/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'neutral' | 'overlay';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-[20px] px-(--space-xs) py-(--space-xxs) rounded-(--radius-lg) label-3 label-3-semibold',
        variant === 'default' && 'bg-(--color-action-primary)/10 text-(--color-text-link)',
        variant === 'success' && 'bg-(--color-text-success)/10 text-(--color-text-success)',
        variant === 'neutral' && 'bg-(--color-bg-secondary) text-(--color-text-secondary)',
        variant === 'overlay' && 'bg-(--color-alpha-light-900) text-(--color-text-inverse)',
        className
      )}
    >
      {label}
    </span>
  );
}
