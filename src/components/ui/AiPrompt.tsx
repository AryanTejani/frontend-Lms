import { cn } from '@/utils/cn';

interface AiPromptProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function AiPrompt({ text, onClick, className }: AiPromptProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full bg-(--color-bg-primary) border border-(--color-bg-tertiary) px-(--space-base) py-(--space-xs) label-2 label-2-regular text-(--color-text-secondary) cursor-pointer transition-colors hover:bg-(--color-bg-secondary)',
        className
      )}
    >
      {text}
    </button>
  );
}
