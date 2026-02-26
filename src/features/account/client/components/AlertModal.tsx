'use client';

import { cn } from '@/utils';

interface AlertModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function AlertModal({
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  className,
}: AlertModalProps) {
  return (
    <div
      className={cn(
        'flex flex-col w-full max-w-[480px] px-(--space-base) py-(--space-lg) rounded-[10px] border border-(--color-stroke-tertiary) shadow-[0_0_10px_rgba(0,0,0,0.25)]',
        className
      )}
    >
      <div className="flex flex-col gap-(--space-xs2)">
        <h3 className="body-1 font-semibold text-(--color-text-primary)">{title}</h3>
        <p className="label-2 label-2-regular text-(--color-text-tertiary)">{description}</p>
      </div>

      <div className="flex justify-end gap-(--space-xs2) mt-(--space-lg)">
        <button
          type="button"
          onClick={onCancel}
          className="h-[36px] px-(--space-base) rounded-full border border-(--color-stroke-tertiary) label-2 label-2-semibold text-(--color-text-primary) transition-colors hover:bg-(--color-bg-tertiary)"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={cn(
            'h-[36px] px-(--space-base) rounded-full label-2 label-2-semibold text-(--color-text-inverse) transition-colors',
            variant === 'destructive'
              ? 'bg-(--color-text-error) hover:opacity-90'
              : 'bg-(--color-action-primary) hover:bg-(--color-action-hover)'
          )}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
