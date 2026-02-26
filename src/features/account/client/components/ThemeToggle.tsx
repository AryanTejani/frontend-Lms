'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const current = stored || document.documentElement.getAttribute('data-theme');
    setIsDark(current === 'dark');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="label-1 label-1-medium text-(--color-text-primary)">Dark Mode</span>
        <span className="label-2 label-2-regular text-(--color-text-tertiary)">
          Toggle between light and dark themes
        </span>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggle}
        className={cn(
          'relative w-[32px] h-[18px] rounded-full transition-colors cursor-pointer border-none',
          isDark ? 'bg-(--color-action-primary)' : 'bg-(--color-bg-tertiary)'
        )}
      >
        <span
          className={cn(
            'absolute top-px left-px size-(--size-lg) rounded-full bg-(--color-secondary-accent) transition-transform shadow-sm',
            isDark && 'translate-x-[14px]'
          )}
        />
      </button>
    </div>
  );
}
