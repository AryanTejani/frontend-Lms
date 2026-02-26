'use client';

import { cn } from '@/utils';

interface CourseProgressProps {
  currentLesson: string;
  totalLessons: string;
  percentage: number;
  className?: string;
}

export function CourseProgress({
  currentLesson,
  totalLessons,
  percentage,
  className,
}: CourseProgressProps) {
  return (
    <div className={cn('flex flex-col gap-(--space-base)', className)}>
      <div className="flex items-center gap-(--space-xs2)">
        <span className="label-1 label-1-medium text-(--color-text-secondary)">
          Current lesson:
        </span>
        <span className="label-1 label-1-medium text-(--color-text-link)">{currentLesson}</span>
      </div>

      <div className="h-[8px] w-full rounded-full bg-(--color-bg-tertiary)/50">
        <div
          className="h-full rounded-full bg-(--color-primary-accent) transition-all"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="label-3 label-3-regular text-(--color-text-secondary)">
          {totalLessons}
        </span>
        <span className="label-3 label-3-regular text-(--color-text-secondary)">
          {percentage}% complete
        </span>
      </div>
    </div>
  );
}
