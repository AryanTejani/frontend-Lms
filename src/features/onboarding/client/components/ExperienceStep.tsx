'use client';

import { useTranslations } from 'next-intl';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingOption } from './OnboardingOption';
import { OnboardingInfoLabel } from './OnboardingInfoLabel';
import { Button } from '@/components/ui';
import { LANGUAGE_OPTIONS } from '../../types';

interface LanguageStepProps {
  selected: string | null;
  onSelect: (code: string) => void;
  onNext: () => void;
}

export function LanguageStep({ selected, onSelect, onNext }: LanguageStepProps) {
  const t = useTranslations('onboarding.language');
  const tc = useTranslations('common');

  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title={t('heading')} size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={6} currentStep={0} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="flex flex-col gap-(--space-sm) w-full mt-(--space-lg)">
        {LANGUAGE_OPTIONS.map((opt) => (
          <OnboardingOption
            key={opt.code}
            title={`${opt.nativeName} (${opt.title})`}
            subtitle={opt.subtitle}
            selected={selected === opt.code}
            onClick={() => onSelect(opt.code)}
            variant="radio"
          />
        ))}
      </div>

      <div className="flex justify-end w-full mt-(--space-lg)">
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

/** @deprecated Use LanguageStep instead */
export { LanguageStep as ExperienceStep };
