import { cn } from '@/utils/cn';

interface TranscriptParagraphProps {
  timestamp: string;
  text: string;
  className?: string;
}

export function TranscriptParagraph({ timestamp, text, className }: TranscriptParagraphProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-xs font-normal text-(--color-text-tertiary)">{timestamp}</span>
      <p className="label-2 label-2-regular text-(--color-text-primary) m-0">{text}</p>
    </div>
  );
}
