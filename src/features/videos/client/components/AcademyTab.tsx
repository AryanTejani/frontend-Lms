'use client';

import { cn } from '@/utils';

interface AcademyTabProps {
  label: string;
  variant?: 'default' | 'selected' | 'sub-tab';
  onClick?: () => void;
  className?: string;
}

export function AcademyTab({ label, variant = 'default', onClick, className }: AcademyTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full h-[32px] px-(--space-base) py-(--space-xs2) label-2 label-2-medium transition-colors',
        variant === 'default' && 'text-(--color-text-secondary)',
        variant === 'selected' && 'bg-(--color-action-primary) text-(--color-text-inverse)',
        variant === 'sub-tab' && 'bg-(--color-bg-primary) text-(--color-text-secondary)',
        className
      )}
    >
      {label}
    </button>
  );
}
