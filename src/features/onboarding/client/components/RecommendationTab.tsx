import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface RecommendationTabProps {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function RecommendationTab({
  label,
  icon,
  active,
  onClick,
  className,
}: RecommendationTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-(--space-base) py-(--space-sm) label-2 label-2-medium cursor-pointer transition-colors border',
        active
          ? 'bg-(--color-bg-opaque) border-(--color-bg-secondary) text-(--color-text-primary)'
          : 'bg-transparent border-transparent text-(--color-text-secondary) hover:bg-(--color-bg-secondary)',
        className
      )}
    >
      {icon && <span className="flex items-center justify-center w-4 h-4">{icon}</span>}
      {label}
    </button>
  );
}
