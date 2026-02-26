import { cn } from '@/utils/cn';

type OnboardingOptionVariant = 'default' | 'radio' | 'checkbox';

interface OnboardingOptionProps {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: OnboardingOptionVariant;
  className?: string;
}

export function OnboardingOption({
  title,
  subtitle,
  selected,
  onClick,
  variant = 'default',
  className,
}: OnboardingOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-[14px] border p-(--space-md) cursor-pointer transition-all flex items-center justify-between',
        selected
          ? 'bg-(--color-bg-opaque) border-(--color-stroke-selection) border-2'
          : 'bg-transparent border-(--color-stroke-active) hover:bg-(--color-bg-opaque)',
        className
      )}
    >
      <div>
        <span className="label-1 label-1-medium text-(--color-text-primary)">{title}</span>
        {subtitle && (
          <span className="label-1 label-1-regular text-(--color-text-secondary) ml-1">
            {subtitle}
          </span>
        )}
      </div>

      {variant === 'radio' && (
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-3',
            selected ? 'border-(--color-action-primary)' : 'border-(--color-stroke-tertiary)'
          )}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-(--color-action-primary)" />}
        </div>
      )}

      {variant === 'checkbox' && (
        <div
          className={cn(
            'w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 ml-3',
            selected
              ? 'bg-(--color-action-primary) border-(--color-action-primary)'
              : 'border-(--color-stroke-tertiary) bg-transparent'
          )}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      )}
    </button>
  );
}
