import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { AIIcon } from '@/assets/icons';

type OnboardingWelcomeSize = 'sm' | 'lg';

interface OnboardingWelcomeProps {
  title?: string;
  icon?: ReactNode;
  size?: OnboardingWelcomeSize;
  className?: string;
}

export function OnboardingWelcome({
  title = 'Welcome to VidyaSetu',
  icon,
  size = 'sm',
  className,
}: OnboardingWelcomeProps) {
  return (
    <div className={cn('flex flex-col items-center gap-(--space-sm)', className)}>
      {size === 'sm' ? (
        <div className="w-27 h-27 flex items-center justify-center">
          {icon ?? <AIIcon className="w-12 h-12 text-(--color-action-primary)" />}
        </div>
      ) : (
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Glow behind icon */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-(--color-action-primary) to-(--color-action-secondary) blur-[24px] opacity-[0.31]" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-(--color-action-primary) to-(--color-action-secondary) flex items-center justify-center shadow-lg">
            {icon ?? <AIIcon className="w-10 h-10 text-white dark:text-[#111827]" />}
          </div>
        </div>
      )}
      <h2 className="h2 h2-semibold text-(--color-text-primary) text-center">{title}</h2>
    </div>
  );
}
