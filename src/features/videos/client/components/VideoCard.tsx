'use client';

import Image from 'next/image';
import { CalendarTodayIcon, DotsThreeVerticalBoldIcon } from '@/assets/icons';
import { cn } from '@/utils';
import { Badge } from '@/components/ui';

interface VideoCardProps {
  thumbnailUrl: string;
  duration: string;
  title: string;
  author: string;
  date: string;
  isSelected?: boolean;
  onClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function VideoCard({
  thumbnailUrl,
  duration,
  title,
  author,
  date,
  isSelected = false,
  onClick,
  onMenuClick,
  className,
}: VideoCardProps) {
  return (
    <div
      className={cn(
        'rounded-(--radius-2xl) overflow-clip bg-(--color-bg-primary) transition-all',
        isSelected && 'shadow-(--shadow-md) ring-1 ring-(--color-stroke-selection)',
        !isSelected &&
          'hover:ring-1 hover:ring-(--color-stroke-selection) hover:shadow-(--shadow-md)',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-[200px]">
        <Image src={thumbnailUrl} alt={title} fill className="size-full object-cover" />
        <div className="absolute bottom-(--space-xs) right-(--space-xs)">
          <Badge label={duration} variant="overlay" />
        </div>
      </div>

      <div className="flex flex-col gap-(--space-lg) p-(--space-sm) border border-(--color-stroke-tertiary) rounded-b-(--radius-2xl)">
        <div className="flex flex-col gap-(--space-xs)">
          <div className="flex items-start justify-between gap-(--space-xs)">
            <h6 className="h6 h6-semibold text-(--color-text-primary) flex-1">{title}</h6>
            <button
              type="button"
              onClick={onMenuClick}
              className="shrink-0 text-(--color-text-tertiary) hover:text-(--color-text-secondary)"
            >
              <DotsThreeVerticalBoldIcon className="icon-md" />
            </button>
          </div>
          <span className="label-1 label-1-medium text-(--color-text-tertiary)">{author}</span>
        </div>

        <div className="flex items-center gap-(--space-base)">
          <div className="flex items-center gap-(--space-xs2)">
            <CalendarTodayIcon className="icon-sm text-(--color-text-tertiary)" />
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
