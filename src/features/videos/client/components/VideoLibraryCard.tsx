'use client';

import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface VideoLibraryCardProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export function VideoLibraryCard({ icon, label, className }: VideoLibraryCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-[216px] h-[160px] gap-(--space-md) rounded-(--radius-2xl) border border-(--color-bg-tertiary)',
        className
      )}
    >
      <div className="flex size-[40px] items-center justify-center rounded-full bg-(--color-bg-opaque)">
        {icon}
      </div>
      <span className="label-2 label-2-medium text-(--color-text-primary) text-center">
        {label}
      </span>
    </div>
  );
}
