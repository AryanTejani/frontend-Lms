import { cn } from '@/utils/cn';
import { AIIcon, ChevronRightIcon } from '@/assets/icons';

interface RecommendationCardProps {
  title: string;
  instructor: string;
  lessonCount: number;
  duration: string;
  description?: string;
  thumbnailSrc?: string;
  onClick?: () => void;
  className?: string;
}

export function RecommendationCard({
  title,
  instructor,
  lessonCount,
  duration,
  description,
  thumbnailSrc,
  onClick,
  className,
}: RecommendationCardProps) {
  const metadata = [instructor, `${lessonCount} lessons`, duration].join(' \u2022 ');

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-(--space-base) w-full rounded-[14px] border border-(--color-stroke-tertiary) p-(--space-base) bg-transparent cursor-pointer transition-colors hover:bg-(--color-bg-secondary) text-left',
        className
      )}
    >
      {thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt={title}
          className="w-[128px] h-[80px] rounded-[10px] object-cover shrink-0"
        />
      )}

      <div className="flex flex-col gap-(--space-sm) min-w-0 flex-1">
        <div className="flex flex-col gap-1">
          <span className="text-[18px] leading-[24px] font-medium text-(--color-text-primary) truncate">
            {title}
          </span>
          <span className="label-2 label-2-regular text-(--color-text-tertiary)">{metadata}</span>
        </div>
        {description && (
          <div className="flex items-center gap-(--space-xs)">
            <AIIcon className="w-4 h-4 shrink-0" />
            <span className="label-2 label-2-regular text-(--color-text-secondary)">
              {description}
            </span>
          </div>
        )}
      </div>

      <ChevronRightIcon className="w-6 h-6 text-(--color-text-tertiary) shrink-0" />
    </button>
  );
}
