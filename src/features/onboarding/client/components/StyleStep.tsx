'use client';

import { useTranslations } from 'next-intl';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingOption } from './OnboardingOption';
import { OnboardingInfoLabel } from './OnboardingInfoLabel';
import { Button } from '@/components/ui';
import { GRADE_OPTIONS } from '../../types';

interface GradeStepProps {
  selected: string | null;
  onSelect: (grade: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GradeStep({ selected, onSelect, onNext, onBack }: GradeStepProps) {
  const t = useTranslations('onboarding.grade');
  const tc = useTranslations('common');

  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title={t('heading')} size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={6} currentStep={2} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="flex flex-col gap-(--space-sm) w-full mt-(--space-lg)">
        {GRADE_OPTIONS.map((opt) => (
          <OnboardingOption
            key={opt.title}
            title={opt.title}
            subtitle={opt.subtitle}
            selected={selected === opt.title}
            onClick={() => onSelect(opt.title)}
            variant="radio"
          />
        ))}
      </div>

      <div className="flex justify-between items-center w-full mt-(--space-lg)">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 label-2 label-2-semibold text-(--color-text-secondary) hover:text-(--color-text-primary) cursor-pointer bg-transparent border-none p-0 h-8 transition-colors"
        >
          <span>&larr;</span> {tc('back')}
        </button>
        <Button onClick={onNext} disabled={!selected} className="h-8">
          {tc('next')}
        </Button>
      </div>

      <div className="mt-(--space-sm)">
        <OnboardingInfoLabel>{t('info')}</OnboardingInfoLabel>
      </div>
    </div>
  );
}

/** @deprecated Use GradeStep instead */
export { GradeStep as StyleStep };
