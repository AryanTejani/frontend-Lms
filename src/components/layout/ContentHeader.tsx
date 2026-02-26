'use client';

import { ChevronLeftIcon } from '@/assets/icons';
import type { IconProps } from '@/assets/icons';
import { cn } from '@/utils';

interface ContentHeaderAction {
  label: string;
  variant: 'primary' | 'outlined';
  icon?: React.ComponentType<IconProps>;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

interface ContentHeaderProps {
  title: string;
  onBack?: () => void;
  actions?: ContentHeaderAction[];
  className?: string;
}

export function ContentHeader({ title, onBack, actions, className }: ContentHeaderProps) {
  return (
    <header
      className={cn(
        'h-[69px] bg-(--color-bg-primary) border-b border-(--color-bg-tertiary) px-(--space-base) py-(--space-base) flex items-center justify-between',
        className
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-[12px]">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="size-[36px] rounded-lg flex items-center justify-center transition-colors hover:bg-(--color-bg-secondary)"
          >
            <ChevronLeftIcon className="icon-lg" />
          </button>
        )}
        <span className="font-semibold text-[18px] leading-[24px] text-(--color-text-primary)">
          {title}
        </span>
      </div>

      {/* Right side */}
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-(--space-sm)">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={cn(
                  'h-[32px] px-(--space-sm) label-2 label-2-semibold flex items-center gap-(--space-xs) transition-colors',
                  action.variant === 'primary' &&
                    'rounded-lg bg-(--color-action-primary) text-(--color-text-inverse) hover:bg-(--color-action-hover)',
                  action.variant === 'outlined' &&
                    'rounded-full border border-(--color-bg-tertiary) text-(--color-text-primary) hover:bg-(--color-bg-secondary)'
                )}
              >
                {Icon && action.iconPosition === 'left' && <Icon className="icon-lg" />}
                {action.label}
                {Icon && action.iconPosition !== 'left' && <Icon className="icon-lg" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
