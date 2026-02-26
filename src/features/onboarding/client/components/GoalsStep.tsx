'use client';

import { useTranslations } from 'next-intl';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingOption } from './OnboardingOption';
import { Button } from '@/components/ui';
import { SUBJECT_OPTIONS } from '../../types';

interface SubjectsStepProps {
  selected: string[];
  onToggle: (subject: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SubjectsStep({ selected, onToggle, onNext, onBack }: SubjectsStepProps) {
  const t = useTranslations('onboarding.subjects');
  const tc = useTranslations('common');

  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title={t('heading')} size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={6} currentStep={3} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="grid grid-cols-2 gap-(--space-sm) w-full mt-(--space-lg)">
        {SUBJECT_OPTIONS.map((opt) => (
          <OnboardingOption
            key={opt.title}
            title={opt.title}
            subtitle={opt.subtitle}
            selected={selected.includes(opt.title)}
            onClick={() => onToggle(opt.title)}
            variant="default"
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
        <Button onClick={onNext} disabled={selected.length === 0} className="h-8">
          {tc('next')}
        </Button>
      </div>
    </div>
  );
}

/** @deprecated Use SubjectsStep instead */
export { SubjectsStep as GoalsStep };
