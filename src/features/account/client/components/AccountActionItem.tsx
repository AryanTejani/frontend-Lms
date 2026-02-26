import type { IconProps } from '@/assets/icons';
import { cn } from '@/utils/cn';

interface AccountActionItemProps {
  icon: React.ComponentType<IconProps>;
  title: string;
  subtitle: string;
  destructive?: boolean;
  onClick?: () => void;
}

export function AccountActionItem({
  icon: Icon,
  title,
  subtitle,
  destructive = false,
  onClick,
}: AccountActionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-(--space-sm) w-full h-[68px] pl-(--space-sm) rounded-[10px] bg-transparent border-none cursor-pointer hover:bg-(--color-bg-secondary) transition-colors text-left"
    >
      <Icon
        className={cn(
          'icon-md shrink-0',
          destructive ? 'text-(--color-text-destructive)' : 'text-(--color-text-tertiary)'
        )}
      />
      <div className="flex flex-col">
        <span
          className={cn(
            'label-1 label-1-medium',
            destructive ? 'text-(--color-text-destructive)' : 'text-(--color-text-primary)'
          )}
        >
          {title}
        </span>
        <span className="label-2 label-2-regular text-(--color-text-tertiary)">{subtitle}</span>
      </div>
    </button>
  );
}
