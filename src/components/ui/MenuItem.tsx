'use client';

import Link from 'next/link';
import type { IconProps } from '@/assets/icons';
import { cn } from '@/utils';

interface MenuItemProps {
  icon: React.ComponentType<IconProps>;
  label?: string;
  isSelected?: boolean;
  showLabel?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MenuItem({
  icon: Icon,
  label,
  isSelected = false,
  showLabel = true,
  href,
  onClick,
  className,
}: MenuItemProps) {
  const content = (
    <>
      <Icon className="icon-lg shrink-0 text-(--color-text-primary)" />
      {showLabel && label && (
        <span className="label-2 label-2-medium text-(--color-text-primary)">{label}</span>
      )}
    </>
  );

  const sharedClasses = cn(
    'flex items-center gap-(--space-sm) p-(--space-sm) rounded-[10px] no-underline transition-colors cursor-pointer',
    isSelected && 'bg-(--color-bg-secondary)',
    className
  );

  if (href) {
    return (
      <Link href={href} className={sharedClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={sharedClasses} onClick={onClick}>
      {content}
    </button>
  );
}
