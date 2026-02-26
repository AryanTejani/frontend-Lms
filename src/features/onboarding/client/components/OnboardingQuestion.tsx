import { cn } from '@/utils/cn';

interface OnboardingQuestionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function OnboardingQuestion({ title, subtitle, className }: OnboardingQuestionProps) {
  return (
    <div className={cn('flex flex-col gap-(--space-xs)', className)}>
      <h6 className="h6 h6-semibold text-(--color-text-primary)">{title}</h6>
      {subtitle && (
        <p className="label-1 label-1-regular text-(--color-text-secondary) m-0">{subtitle}</p>
      )}
    </div>
  );
}
