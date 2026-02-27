'use client';

import { useState, useRef, useEffect } from 'react';
import { defaultLocale } from '@/i18n/config';
import { setLocale } from '@/i18n/set-locale';
import { updateLanguagePreference } from '@/features/onboarding/client/api';
import type { Locale } from '@/i18n/config';
import { cn } from '@/utils/cn';

const LANGUAGES: { code: Locale; native: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'hi', native: 'हिंदी' },
  { code: 'ta', native: 'தமிழ்' },
  { code: 'te', native: 'తెలుగు' },
  { code: 'mr', native: 'मराठी' },
  { code: 'kn', native: 'ಕನ್ನಡ' },
  { code: 'bn', native: 'বাংলা' },
];

interface LanguageSwitcherProps {
  isExpanded: boolean;
  initialLocale?: Locale;
}

export function LanguageSwitcher({ isExpanded, initialLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<Locale>(initialLocale ?? defaultLocale);
  const currentLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0]!;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Locale): void => {
    if (code === current) {
      setIsOpen(false);

      return;
    }

    setIsOpen(false);
    setCurrent(code);
    updateLanguagePreference(code).catch(() => {});
    setLocale(code);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-(--space-sm) w-full rounded-(--radius-lg) px-(--space-sm) py-(--space-xs) cursor-pointer border-none bg-transparent transition-colors hover:bg-(--color-bg-tertiary)',
          isExpanded ? 'justify-start' : 'justify-center'
        )}
      >
        <span className="text-base leading-none">🌐</span>
        {isExpanded && (
          <span className="label-2 label-2-medium text-(--color-text-secondary) truncate">
            {currentLang.native}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1 w-[180px] rounded-(--radius-lg) border border-(--color-stroke-tertiary) bg-(--color-bg-primary) shadow-lg z-50 py-1 max-h-[280px] overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'w-full text-left px-3 py-2 label-2 label-2-medium cursor-pointer border-none transition-colors',
                lang.code === current
                  ? 'bg-(--color-bg-tertiary) text-(--color-text-primary)'
                  : 'bg-transparent text-(--color-text-secondary) hover:bg-(--color-bg-secondary) hover:text-(--color-text-primary)'
              )}
            >
              {lang.native}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
