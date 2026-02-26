import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'default' | 'disabled' | 'rounded' | 'stroke' | 'hover' | 'no-border';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-(--color-action-primary) text-(--color-text-inverse) rounded-lg hover:bg-(--color-action-hover)',
  disabled:
    'bg-(--color-action-disabled) text-(--color-text-inverse) rounded-lg cursor-not-allowed',
  rounded:
    'bg-(--color-action-primary) text-(--color-text-inverse) rounded-full hover:bg-(--color-action-hover)',
  stroke:
    'bg-transparent border border-solid border-(--color-stroke-tertiary) text-(--color-text-primary) rounded-lg hover:bg-(--color-bg-secondary)',
  hover: 'bg-(--color-bg-tertiary) text-(--color-text-primary) rounded-full',
  'no-border':
    'bg-transparent border-none text-(--color-text-primary) hover:text-(--color-text-secondary)',
};

export function Button({
  variant = 'default',
  children,
  icon,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const effectiveVariant = disabled ? 'disabled' : variant;

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'h-8 px-(--space-sm) label-2 label-2-semibold inline-flex items-center justify-center gap-(--space-xs2) cursor-pointer transition-colors border-none',
        variantClasses[effectiveVariant],
        className
      )}
      {...rest}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}
