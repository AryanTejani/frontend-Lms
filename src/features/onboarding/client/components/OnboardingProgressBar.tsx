import { cn } from '@/utils/cn';
import { OnboardingStepIcon } from './OnboardingStepIcon';

interface OnboardingProgressBarProps {
  steps: number;
  currentStep: number;
  className?: string;
}

export function OnboardingProgressBar({
  steps,
  currentStep,
  className,
}: OnboardingProgressBarProps) {
  return (
    <div className={cn('flex items-center justify-between w-full relative', className)}>
      {/* Connecting lines behind icons */}
      <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 flex">
        {Array.from({ length: steps - 1 }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-0.5 flex-1',
              i < currentStep ? 'bg-(--color-action-primary)' : 'bg-(--color-stroke-tertiary)'
            )}
          />
        ))}
      </div>

      {/* Step icons */}
      {Array.from({ length: steps }, (_, i) => {
        let variant: 'check' | 'progressing' | 'empty';
        if (i < currentStep) variant = 'check';
        else if (i === currentStep) variant = 'progressing';
        else variant = 'empty';

        return (
          <OnboardingStepIcon
            key={i}
            variant={variant}
            className="relative z-10 bg-(--color-bg-primary)"
          />
        );
      })}
    </div>
  );
}
