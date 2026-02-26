'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/assets/icons';
import { cn } from '@/utils';

interface SidebarSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SidebarSection({
  title,
  defaultOpen = true,
  children,
  className,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-(--space-xs2) h-[32px] rounded-[10px] transition-colors cursor-pointer',
          'hover:bg-(--color-bg-secondary)'
        )}
      >
        <span className="label-3 label-3-regular text-(--color-text-secondary)">{title}</span>
        <ChevronDownIcon className={cn('icon-lg transition-transform', !isOpen && '-rotate-90')} />
      </button>
      {isOpen && <div className="mt-(--space-sm)">{children}</div>}
    </div>
  );
}
