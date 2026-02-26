'use client';

import Image from 'next/image';
import { cn } from '@/utils';

interface MentorCardProps {
  avatarUrl: string;
  name: string;
  description: string;
  showButton?: boolean;
  onChat?: () => void;
  isSelected?: boolean;
  className?: string;
}

export function MentorCard({
  avatarUrl,
  name,
  description,
  showButton = false,
  onChat,
  isSelected = false,
  className,
}: MentorCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center p-(--space-base) gap-(--space-2xl) bg-(--color-bg-primary) rounded-(--radius-card) border border-(--color-stroke-tertiary) transition-all',
        isSelected && 'border-(--color-stroke-selection) shadow-(--shadow-md)',
        !isSelected && 'hover:border-(--color-stroke-selection) hover:shadow-(--shadow-md)',
        className
      )}
    >
      <div className="flex flex-col items-center gap-(--space-sm)">
        <Image
          src={avatarUrl}
          alt={name}
          width={48}
          height={48}
          className="size-[48px] rounded-full object-cover"
        />
        <div className="flex flex-col items-center gap-(--space-xs2)">
          <h6 className="h6 h6-bold text-(--color-text-primary) text-center">{name}</h6>
          <p className="label-1 label-1-medium text-(--color-text-secondary) text-center">
            {description}
          </p>
        </div>
      </div>

      {showButton && (
        <button
          type="button"
          onClick={onChat}
          className="h-(--button-height-sm) px-(--space-sm) rounded-full bg-(--color-action-primary) label-2 label-2-semibold text-(--color-text-inverse) transition-colors hover:bg-(--color-action-hover)"
        >
          Chat
        </button>
      )}
    </div>
  );
}
