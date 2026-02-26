'use client';

import Image from 'next/image';
import { EastIcon, StarPurple500Icon } from '@/assets/icons';
import { cn } from '@/utils';
import { Badge } from '@/components/ui';

interface CourseCardProps {
  imageUrl: string;
  badgeLabel: string;
  rating?: string;
  title: string;
  author: string;
  description: string;
  price: string;
  category?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CourseCard({
  imageUrl,
  badgeLabel,
  rating,
  title,
  author,
  description,
  price,
  category = 'Investment',
  isSelected = false,
  onClick,
  className,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        'w-[445px] rounded-(--radius-card) border border-(--color-bg-tertiary) overflow-clip transition-all',
        isSelected && 'border-(--color-stroke-selection) shadow-(--shadow-md)',
        !isSelected && 'hover:border-(--color-stroke-selection) hover:shadow-(--shadow-md)',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-[180px] bg-gradient-to-b from-white to-[#f9fafb]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative flex h-full flex-col px-[20px] py-(--space-base)">
          <div className="flex items-center justify-between">
            <Badge label={badgeLabel} />
            {rating && (
              <span className="inline-flex items-center gap-(--space-xxs) h-[22px] px-(--space-xs) rounded-(--radius-lg) bg-(--color-bg-primary) border border-(--color-bg-tertiary) label-3 label-3-medium text-(--color-text-primary)">
                <StarPurple500Icon className="icon-sm text-[#F0B100]" />
                {rating}
              </span>
            )}
          </div>
          <div className="mt-auto flex flex-col gap-(--space-xs)">
            <h6 className="h6 h6-bold text-(--color-text-primary)">{title}</h6>
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">{author}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-(--space-2xl) p-(--space-base)">
        <p className="label-1 label-1-regular text-(--color-text-secondary)">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="label-3 label-3-regular text-(--color-text-tertiary)">{category}</span>
            <span className="h6 h6-bold text-(--color-text-primary)">{price}</span>
          </div>
          <EastIcon className="icon-lg text-(--color-action-primary)" />
        </div>
      </div>
    </div>
  );
}
