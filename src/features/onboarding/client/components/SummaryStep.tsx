'use client';

import { useTranslations } from 'next-intl';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingSummaryField } from './OnboardingSummaryField';
import { Button } from '@/components/ui';
import { CheckIcon, AcademyIcon, SettingsIcon } from '@/assets/icons';
import { LANGUAGE_OPTIONS } from '../../types';
import type { OnboardingData } from '../../types';

interface SummaryStepProps {
  data: OnboardingData;
  onContinue: () => void;
  onModify: () => void;
  isSubmitting: boolean;
}

export function SummaryStep({ data, onContinue, onModify, isSubmitting }: SummaryStepProps) {
  const t = useTranslations('onboarding.summary');
  const tc = useTranslations('common');

  const languageLabel =
    LANGUAGE_OPTIONS.find((l) => l.code === data.languagePreference)?.nativeName ?? t('notSet');

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[580px] mx-auto px-(--space-base) gap-(--space-lg)">
      <OnboardingWelcome
        title={t('heading')}
        icon={<CheckIcon className="w-10 h-10 text-white" />}
        size="lg"
      />

      <p className="label-1 label-1-regular text-(--color-text-secondary) text-center">
        {t('subtitle')}
      </p>

      <div
        className="w-full rounded-[16px] border border-(--color-stroke-active) p-(--space-base)"
        style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.02)' }}
      >
        <div className="flex items-center justify-between mb-(--space-base)">
          <div className="flex items-center gap-3">
            <div className="size-9 bg-(--color-action-primary) rounded-(--radius-lg) flex items-center justify-center shrink-0">
              <AcademyIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[18px] leading-[24px] font-semibold text-(--color-text-primary)">
              {t('profileTitle')}
            </span>
          </div>
          <button
            type="button"
            onClick={onModify}
            className="inline-flex items-center gap-1.5 label-2 label-2-medium text-(--color-text-primary) bg-(--color-bg-opaque) rounded-[10px] px-3 py-1.5 cursor-pointer border-none hover:opacity-80 transition-opacity"
          >
            <SettingsIcon className="w-4 h-4" />
            {tc('modify')}
          </button>
        </div>
        <div className="flex gap-(--space-xs) flex-wrap">
          <OnboardingSummaryField
            label={t('language')}
            value={languageLabel}
            variant="default"
            className="flex-1 min-w-[120px]"
          />
          <OnboardingSummaryField
            label={t('age')}
            value={data.age?.toString() ?? t('notSet')}
            variant="default"
            className="flex-1 min-w-[120px]"
          />
          <OnboardingSummaryField
            label={t('grade')}
            value={data.grade ?? t('notSet')}
            variant="default"
            className="flex-1 min-w-[120px]"
          />
          <OnboardingSummaryField
            label={t('subjects')}
            value={data.subjects.length > 0 ? data.subjects.join(', ') : t('notSet')}
            variant="default"
            className="flex-1 min-w-[120px]"
          />
          <OnboardingSummaryField
            label={t('goals')}
            value={data.learningGoals.length > 0 ? data.learningGoals.join(', ') : t('notSet')}
            variant="default"
            className="flex-1 min-w-[120px]"
          />
        </div>
      </div>

      <Button onClick={onContinue} disabled={isSubmitting} className="w-full rounded-full h-11">
        {isSubmitting ? tc('loading') : `${tc('startLearning')} \u2192`}
      </Button>
    </div>
  );
}
