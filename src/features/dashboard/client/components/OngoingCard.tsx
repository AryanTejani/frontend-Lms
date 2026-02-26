'use client';

import { cn } from '@/utils';
import { OngoingCourseTitle } from './OngoingCourseTitle';
import { CourseProgress } from './CourseProgress';

interface OngoingCardProps {
  avatarUrl: string;
  heading: string;
  subHeading?: string;
  currentLesson: string;
  totalLessons: string;
  percentage: number;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function OngoingCard({
  avatarUrl,
  heading,
  subHeading,
  currentLesson,
  totalLessons,
  percentage,
  isSelected = false,
  onClick,
  className,
}: OngoingCardProps) {
  return (
    <div
      className={cn(
        'rounded-(--radius-card) bg-(--color-bg-primary) border border-(--color-stroke-tertiary) overflow-clip transition-all',
        isSelected && 'border-(--color-stroke-selection) shadow-(--shadow-md)',
        !isSelected && 'hover:border-(--color-stroke-selection) hover:shadow-(--shadow-md)',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-(--space-lg) p-(--space-base)">
        <OngoingCourseTitle
          avatarUrl={avatarUrl}
          heading={heading}
          subHeading={subHeading}
          showChevron
        />
        <CourseProgress
          currentLesson={currentLesson}
          totalLessons={totalLessons}
          percentage={percentage}
        />
      </div>
    </div>
  );
}
