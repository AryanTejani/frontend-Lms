'use client';

import { cn } from '@/utils';

interface SidebarSubTitleProps {
  name: string;
  avatarSrc?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SidebarSubTitle({
  name,
  avatarSrc,
  isSelected,
  onClick,
  className,
}: SidebarSubTitleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-(--space-xs) px-(--space-sm) py-(--space-xs) rounded-lg w-full border cursor-pointer',
        isSelected
          ? 'bg-(--color-bg-active) border-(--color-stroke-selection) shadow-sm'
          : 'border-transparent hover:bg-(--color-bg-secondary)',
        className
      )}
    >
      {avatarSrc && (
        <img
          src={avatarSrc}
          alt={name}
          className="size-[36px] rounded-full shadow-lg object-cover"
        />
      )}
      <span className="label-2 label-2-regular text-(--color-text-primary)">{name}</span>
    </button>
  );
}
