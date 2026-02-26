'use client';

import { ChevronRightIcon } from '@/assets/icons';
import { cn } from '@/utils';

interface OngoingCourseTitleProps {
  avatarUrl: string;
  heading: string;
  subHeading?: string;
  showChevron?: boolean;
  onClick?: () => void;
  className?: string;
}

export function OngoingCourseTitle({
  avatarUrl,
  heading,
  subHeading,
  showChevron = false,
  onClick,
  className,
}: OngoingCourseTitleProps) {
  return (
    <div
      className={cn('flex items-center gap-(--space-xs)', onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      <img
        src={avatarUrl}
        alt={heading}
        className="size-[48px] rounded-full object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h6 className="h6 h6-bold text-(--color-text-primary) truncate">{heading}</h6>
        {subHeading && (
          <p className="label-2 label-2-medium text-(--color-text-secondary) truncate">
            {subHeading}
          </p>
        )}
      </div>

      {showChevron && (
        <ChevronRightIcon className="icon-md shrink-0 text-(--color-text-tertiary)" />
      )}
    </div>
  );
}
