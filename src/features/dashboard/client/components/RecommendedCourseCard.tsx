'use client';

import { cn } from '@/utils';
import { StarPurple500Icon, EastIcon } from '@/assets/icons';
import { Badge } from '@/components/ui';

interface RecommendedCourseCardProps {
  category: string;
  rating: string;
  title: string;
  author: string;
  description: string;
  priceLabel?: string;
  price: string;
  onClick?: () => void;
  className?: string;
}

export function RecommendedCourseCard({
  category,
  rating,
  title,
  author,
  description,
  priceLabel = 'Investment',
  price,
  onClick,
  className,
}: RecommendedCourseCardProps) {
  return (
    <div
      className={cn(
        'flex-1 bg-(--color-bg-primary) rounded-(--radius-card) border border-(--color-stroke-tertiary) overflow-clip transition-all hover:border-(--color-stroke-selection) hover:shadow-(--shadow-md)',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Top section */}
      <div className="bg-(--color-bg-secondary) h-[179px] px-[20px] py-(--space-base) flex flex-col gap-[10px]">
        <div className="flex justify-between items-center">
          <Badge label={category} />
          <span className="inline-flex items-center gap-(--space-xs2) bg-(--color-bg-primary) border border-(--color-stroke-tertiary) rounded-(--radius-lg) px-(--space-xs) py-(--space-xxs)">
            <StarPurple500Icon className="size-[12px] text-amber-400" />
            <span className="label-3 label-3-medium text-(--color-text-primary)">{rating}</span>
          </span>
        </div>

        <div className="pt-(--space-5xl) flex flex-col gap-(--space-xs)">
          <h6 className="h6 h6-bold text-(--color-text-primary)">{title}</h6>
          <span className="label-2 label-2-regular text-(--color-text-secondary)">{author}</span>
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-(--space-base) flex flex-col gap-(--space-2xl)">
        <p className="label-1 label-1-regular text-(--color-text-secondary)">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-(--space-xs2)">
            <span className="label-3 label-3-regular text-(--color-text-tertiary)">
              {priceLabel}
            </span>
            <span className="h6 h6-bold text-(--color-text-primary)">{price}</span>
          </div>
          <div className="pt-[8px] px-[8px]">
            <EastIcon className="icon-lg text-(--color-action-primary)" />
          </div>
        </div>
      </div>
    </div>
  );
}
