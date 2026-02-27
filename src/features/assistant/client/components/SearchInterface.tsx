import { useTranslations } from 'next-intl';
import { cn } from '@/utils/cn';
import { SearchBar, Button } from '@/components/ui';
import { RecentChats } from './RecentChats';

interface ChatItem {
  id: string;
  title: string;
  subtitle: string;
  isBookmarked?: boolean;
}

interface SearchInterfaceProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  chats?: ChatItem[];
  onChatClick?: (id: string) => void;
  onSavedChatClick?: () => void;
  isSavedActive?: boolean;
  className?: string;
}

export function SearchInterface({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  chats = [],
  onChatClick,
  onSavedChatClick,
  isSavedActive,
  className,
}: SearchInterfaceProps) {
  const t = useTranslations('assistant');
  const resolvedPlaceholder = searchPlaceholder ?? t('searchChats');
  return (
    <div className={cn('flex flex-col gap-(--space-base) w-full', className)}>
      {/* Search bar */}
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={resolvedPlaceholder}
        onClear={() => onSearchChange('')}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="label-2 label-2-medium text-(--color-text-secondary)">{t('searchResults')}</span>
        <Button
          variant="stroke"
          className={cn(
            'rounded-full',
            isSavedActive
              ? 'bg-(--color-action-secondary) hover:bg-(--color-action-secondary) text-(--color-text-inverse) border-transparent'
              : 'border-solid hover:bg-transparent'
          )}
          onClick={onSavedChatClick}
        >
          {t('savedChat')}
        </Button>
      </div>

      {/* Chat list */}
      <div className="flex flex-col">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex flex-col gap-(--space-sm) border-b border-(--color-bg-secondary) p-(--space-base)"
          >
            <RecentChats
              title={chat.title}
              showBookmark={chat.isBookmarked}
              onClick={() => onChatClick?.(chat.id)}
            />
            <span className="label-3 label-3-regular text-(--color-text-tertiary) px-(--space-xs)">
              {chat.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
