import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface OnboardingInfoLabelProps {
  children: ReactNode;
  className?: string;
}

export function OnboardingInfoLabel({ children, className }: OnboardingInfoLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-(--color-bg-opaque) px-(--space-base) py-(--space-xs)',
        className
      )}
    >
      {/* Info circle icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-(--color-action-primary)"
      >
        <path
          d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334ZM8.66667 11.3333H7.33333V7.33334H8.66667V11.3333ZM8.66667 6.00001H7.33333V4.66668H8.66667V6.00001Z"
          fill="currentColor"
        />
      </svg>
      <span className="label-2 label-2-medium text-(--color-action-primary)">{children}</span>
    </div>
  );
}
