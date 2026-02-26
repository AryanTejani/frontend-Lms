'use client';

import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingSummaryField } from './OnboardingSummaryField';
import { Button } from '@/components/ui';
import { CheckIcon, AcademyIcon, SettingsIcon } from '@/assets/icons';
import type { OnboardingData } from '../../types';

interface SummaryStepProps {
  data: OnboardingData;
  onContinue: () => void;
  onModify: () => void;
}

export function SummaryStep({ data, onContinue, onModify }: SummaryStepProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[580px] mx-auto px-(--space-base) gap-(--space-lg)">
      <OnboardingWelcome
        title="You're All Set!"
        icon={<CheckIcon className="w-10 h-10 text-white" />}
        size="lg"
      />

      <p className="label-1 label-1-regular text-(--color-text-secondary) text-center">
        We&apos;ve personalized your learning path based on your preferences.
      </p>

      {/* Profile summary card */}
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
              Your Learning Profile
            </span>
          </div>
          <button
            type="button"
            onClick={onModify}
            className="inline-flex items-center gap-1.5 label-2 label-2-medium text-(--color-text-primary) bg-(--color-bg-opaque) rounded-[10px] px-3 py-1.5 cursor-pointer border-none hover:opacity-80 transition-opacity"
          >
            <SettingsIcon className="w-4 h-4" />
            Modify
          </button>
        </div>
        <div className="flex gap-(--space-xs)">
          <OnboardingSummaryField
            label="Language"
            value={data.experienceLevel ?? 'Not set'}
            variant="default"
            className="flex-1"
          />
          <OnboardingSummaryField
            label="Subject"
            value={data.learningGoals[0] ?? 'Not set'}
            variant="default"
            className="flex-1"
          />
          <OnboardingSummaryField
            label="Time Commitment"
            value={data.timeCommitment ?? 'Not set'}
            variant="default"
            className="flex-1"
          />
          <OnboardingSummaryField
            label="Grade"
            value={data.tradingStyle ?? 'Not set'}
            variant="default"
            className="flex-1"
          />
        </div>
      </div>

      <Button onClick={onContinue} className="w-full rounded-full h-11">
        Start Learning &rarr;
      </Button>
    </div>
  );
}
