'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingInfoLabel } from './OnboardingInfoLabel';
import { Button } from '@/components/ui';

interface AgeStepProps {
  value: number | null;
  onChange: (age: number | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AgeStep({ value, onChange, onNext, onBack }: AgeStepProps) {
  const t = useTranslations('onboarding.age');
  const tc = useTranslations('common');
  const [inputValue, setInputValue] = useState(value?.toString() ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setInputValue(raw);

    if (raw === '') {
      onChange(null);
      return;
    }

    const num = parseInt(raw, 10);

    if (num >= 5 && num <= 99) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title={t('heading')} size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={6} currentStep={1} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="w-full mt-(--space-lg)">
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleChange}
          placeholder={t('placeholder')}
          className="w-full h-12 px-(--space-base) rounded-(--radius-lg) border border-(--color-stroke-tertiary) bg-(--color-bg-secondary) text-(--color-text-primary) text-center text-2xl font-semibold focus:outline-none focus:border-(--color-action-primary) transition-colors"
          maxLength={2}
        />
      </div>

      <div className="flex justify-between items-center w-full mt-(--space-lg)">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 label-2 label-2-semibold text-(--color-text-secondary) hover:text-(--color-text-primary) cursor-pointer bg-transparent border-none p-0 h-8 transition-colors"
        >
          <span>&larr;</span> {tc('back')}
        </button>
        <Button onClick={onNext} className="h-8">
          {tc('next')}
        </Button>
      </div>

      <div className="mt-(--space-sm)">
        <OnboardingInfoLabel>{t('info')}</OnboardingInfoLabel>
      </div>
    </div>
  );
}
