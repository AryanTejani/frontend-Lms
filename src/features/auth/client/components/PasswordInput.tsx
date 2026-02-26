import { useState, useId } from 'react';
import { EyeIcon, EyeOffIcon } from '@/assets/icons';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function PasswordInput({
  value,
  onChange,
  label = 'Password',
  placeholder = 'Password',
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-(--space-xs)">
      <label htmlFor={inputId} className="label-1-regular text-(--color-text-primary)">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          suppressHydrationWarning
          className="body-3-regular w-full h-(--input-height) pr-(--space-4xl) pl-(--space-base) bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-lg text-(--color-text-primary) outline-none transition-[border-color] duration-200 focus:border-(--color-stroke-selection)"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          suppressHydrationWarning
          className="absolute right-(--space-base) flex items-center justify-center p-0 bg-transparent border-none disabled:cursor-not-allowed cursor-pointer"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOffIcon className="icon-md text-(--color-text-tertiary)" />
          ) : (
            <EyeIcon className="icon-md text-(--color-text-tertiary)" />
          )}
        </button>
      </div>
    </div>
  );
}
