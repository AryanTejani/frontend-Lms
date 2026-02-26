'use client';

import { useState, useId } from 'react';
import { cn } from '@/utils/cn';
import { EyeIcon, EyeOffIcon } from '@/assets/icons';

interface TextFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  size?: 'default' | 'sm';
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  className,
  disabled,
  size = 'default',
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={cn('flex flex-col gap-(--space-xs)', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            size === 'sm'
              ? 'label-2 label-2-medium text-(--color-gray-700)'
              : 'label-1 label-1-regular text-(--color-text-primary)'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full bg-(--color-bg-primary) border rounded-lg text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-(--color-text-placeholder)',
            size === 'sm'
              ? 'h-[36px] px-(--space-sm) label-2 label-2-regular'
              : 'h-(--input-height) px-(--space-base) label-1 label-1-regular',
            isPassword && 'pr-(--space-4xl)',
            error
              ? 'border-(--color-stroke-error)'
              : 'border-(--color-bg-tertiary) hover:border-(--color-stroke-primary) focus:border-(--color-stroke-selection)',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            className="absolute right-(--space-base) flex items-center justify-center p-0 bg-transparent border-none cursor-pointer disabled:cursor-not-allowed"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOffIcon className="icon-md text-(--color-text-tertiary)" />
            ) : (
              <EyeIcon className="icon-md text-(--color-text-tertiary)" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-(--color-text-error)">{error}</span>}
    </div>
  );
}
