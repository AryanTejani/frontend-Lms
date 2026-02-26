import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { EnrolledCourse } from '../../types';

interface EnrolledCourseItemProps {
  course: EnrolledCourse;
}

export function EnrolledCourseItem({ course }: EnrolledCourseItemProps) {
  const isCompleted = course.percentComplete === 100;

  return (
    <div className="flex items-center justify-between min-h-[82px] py-(--space-sm) px-[17px] rounded-[10px] border border-(--color-stroke-tertiary)">
      <div className="flex flex-col gap-(--space-xs2) min-w-0">
        <span className="label-1 label-1-medium text-(--color-text-primary)">{course.title}</span>
        <span className="label-2 label-2-regular text-(--color-text-secondary)">
          {course.percentComplete}% Complete {'\u2022'} {course.completedLessons} of{' '}
          {course.totalLessons} lessons
        </span>
      </div>

      {isCompleted ? (
        <span
          className={cn(
            'px-(--space-xs) py-(--space-xxs) rounded-lg label-3 label-3-semibold shrink-0',
            'bg-(--color-lm-success-bg) text-(--color-text-success)'
          )}
        >
          Completed
        </span>
      ) : (
        <Button variant="no-border" className="text-(--color-action-primary) shrink-0">
          Continue
        </Button>
      )}
    </div>
  );
}
