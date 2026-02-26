import { cn } from '@/utils/cn';
import { CheckIcon, ErrorIcon, WarningIcon } from '@/assets/icons';

type StepIconVariant = 'check' | 'error' | 'warning' | 'progressing' | 'empty' | 'disabled';

interface OnboardingStepIconProps {
  variant: StepIconVariant;
  className?: string;
}

export function OnboardingStepIcon({ variant, className }: OnboardingStepIconProps) {
  const base = 'flex items-center justify-center w-6 h-6 rounded-full shrink-0';

  if (variant === 'check') {
    return (
      <div className={cn(base, 'bg-(--color-action-primary)', className)}>
        <CheckIcon className="w-3.5 h-3.5 text-white" />
      </div>
    );
  }

  if (variant === 'error') {
    return (
      <div className={cn(base, 'bg-(--color-stroke-error)', className)}>
        <ErrorIcon className="w-3.5 h-3.5 text-white" />
      </div>
    );
  }

  if (variant === 'warning') {
    return (
      <div className={cn(base, 'bg-amber-400', className)}>
        <WarningIcon className="w-3.5 h-3.5 text-white" />
      </div>
    );
  }

  if (variant === 'progressing') {
    return (
      <div
        className={cn(base, 'border-2 border-(--color-action-primary) bg-transparent', className)}
      >
        <div className="w-2 h-2 rounded-full bg-(--color-action-primary) animate-pulse" />
      </div>
    );
  }

  if (variant === 'disabled') {
    return (
      <div
        className={cn(
          base,
          'border-2 border-(--color-stroke-tertiary) bg-transparent opacity-50',
          className
        )}
      />
    );
  }

  // empty
  return (
    <div
      className={cn(base, 'border-2 border-(--color-stroke-tertiary) bg-transparent', className)}
    />
  );
}
