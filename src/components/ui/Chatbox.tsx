'use client';

import { useState, useRef, useCallback, type KeyboardEvent } from 'react';
import { cn } from '@/utils/cn';
import { SendIcon } from '@/assets/icons';
import { Button } from './Button';

interface ChatboxProps {
  variant?: 'default' | 'compact';
  placeholder?: string;
  onSubmit?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Chatbox({
  variant = 'default',
  placeholder = 'Type a message...',
  onSubmit,
  value: controlledValue,
  onChange,
  className,
}: ChatboxProps) {
  const [internalValue, setInternalValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const value = controlledValue ?? internalValue;
  const setValue = useCallback(
    (v: string) => {
      if (onChange) onChange(v);
      else setInternalValue(v);
    },
    [onChange]
  );

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'flex bg-(--color-bg-inactive) border border-(--color-bg-tertiary) rounded-[14px] transition-[border-color,box-shadow] duration-200 focus-within:border-(--color-stroke-selection) focus-within:shadow-sm',
        isCompact ? 'items-center' : 'items-end',
        isCompact ? 'py-2 px-(--space-sm)' : 'p-(--space-base)',
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={isCompact ? 1 : 3}
        className={cn(
          'flex-1 bg-transparent border-none outline-none resize-none label-2 label-2-regular text-(--color-text-tertiary) placeholder:text-(--color-text-placeholder)',
          isCompact ? 'py-0' : ''
        )}
      />
      <Button
        variant="default"
        onClick={handleSubmit}
        className="shrink-0 h-7! w-7! min-w-0! p-0! rounded-lg"
        aria-label="Send message"
        icon={<SendIcon className="icon-sm text-(--color-text-inverse)" />}
      >
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}
