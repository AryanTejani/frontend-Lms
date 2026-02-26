'use client';

import { cn } from '@/utils';

interface SectionTitleProps {
  title: string;
  titleExtra?: React.ReactNode;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionTitle({
  title,
  titleExtra,
  subtitle,
  actionLabel,
  onAction,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('flex items-start gap-(--space-base)', className)}>
      <div className="flex-1">
        <div className="flex items-center gap-(--space-sm)">
          <h4 className="h4 h4-bold text-(--color-text-primary)">{title}</h4>
          {titleExtra}
        </div>
        {subtitle && (
          <p className="label-1 label-1-medium text-(--color-text-secondary) mt-(--space-base)">
            {subtitle}
          </p>
        )}
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="label-2  text-(--color-action-tertiary) h-[32px] px-(--space-sm) rounded-(--radius-lg) border-none cursor-pointer transition-opacity hover:opacity-90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
