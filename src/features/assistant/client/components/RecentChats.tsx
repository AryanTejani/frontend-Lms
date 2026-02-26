import { cn } from '@/utils/cn';
import { BookmarkedIcon } from '@/assets/icons';

interface RecentChatsProps {
  title: string;
  isSelected?: boolean;
  showBookmark?: boolean;
  onClick?: () => void;
  className?: string;
}

export function RecentChats({
  title,
  isSelected,
  showBookmark,
  onClick,
  className,
}: RecentChatsProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-(--space-xs) w-full rounded-lg px-(--space-xs) py-2.5 label-2 label-2-regular text-left cursor-pointer border-none transition-colors',
        isSelected
          ? 'bg-(--color-bg-tertiary) shadow-sm text-(--color-text-primary)'
          : 'bg-transparent text-(--color-text-secondary) hover:bg-(--color-bg-secondary)',
        className
      )}
    >
      <span className="flex-1 truncate">{title}</span>
      {showBookmark && (
        <BookmarkedIcon className="icon-sm text-(--color-primary-accent) shrink-0" />
      )}
    </button>
  );
}
