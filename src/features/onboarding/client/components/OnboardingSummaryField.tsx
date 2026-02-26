import { cn } from '@/utils/cn';

interface OnboardingSummaryFieldProps {
  label: string;
  value: string;
  variant?: 'default' | 'small';
  className?: string;
}

export function OnboardingSummaryField({
  label,
  value,
  variant = 'default',
  className,
}: OnboardingSummaryFieldProps) {
  if (variant === 'small') {
    return (
      <div className={cn('flex flex-col gap-0.5', className)}>
        <span className="label-3 label-3-regular text-(--color-text-tertiary)">{label}</span>
        <span className="label-2 label-2-medium text-(--color-text-primary)">{value}</span>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <span className="label-1 label-1-regular text-(--color-text-tertiary)">{label}</span>
      <span className="text-[18px] leading-[24px] font-medium text-(--color-text-primary)">
        {value}
      </span>
    </div>
  );
}
