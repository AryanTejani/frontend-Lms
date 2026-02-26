import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface OnboardingFeatureCardProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export function OnboardingFeatureCard({ icon, label, className }: OnboardingFeatureCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-(--space-sm) rounded-[14px] bg-(--color-bg-secondary) p-(--space-sm)',
        className
      )}
    >
      <div className="w-8 h-8 rounded-[10px] bg-(--color-bg-opaque) flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="label-2 label-2-medium text-(--color-text-secondary)">{label}</span>
    </div>
  );
}
