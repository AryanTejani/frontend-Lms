import { cn } from '@/utils/cn';
import { SearchIcon, CloseIcon } from '@/assets/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  focused?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  focused,
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        'flex items-center h-12 rounded-full border px-(--space-sm) gap-(--space-xs) transition-[border-color,box-shadow] duration-200',
        focused
          ? 'border-(--color-stroke-selection) shadow-sm'
          : 'border-(--color-stroke-tertiary)',
        className
      )}
    >
      <SearchIcon className="icon-md text-(--color-text-tertiary) shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none label-2 label-2-regular text-(--color-text-primary) placeholder:text-(--color-text-tertiary)"
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer"
          aria-label="Clear search"
        >
          <CloseIcon className="icon-sm text-(--color-text-tertiary)" />
        </button>
      )}
    </div>
  );
}
