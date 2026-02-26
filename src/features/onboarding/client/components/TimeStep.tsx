'use client';

import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingOption } from './OnboardingOption';
import { OnboardingInfoLabel } from './OnboardingInfoLabel';
import { Button } from '@/components/ui';
import { TIME_OPTIONS } from '../../types';

interface TimeStepProps {
  selected: string | null;
  onSelect: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TimeStep({ selected, onSelect, onNext, onBack }: TimeStepProps) {
  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title="Your Time Commitment" size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={4} currentStep={3} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title="How much time can you commit?"
          subtitle="We'll design a schedule that fits your lifestyle"
        />
      </div>

      <div className="flex flex-col gap-(--space-sm) w-full mt-(--space-lg)">
        {TIME_OPTIONS.map((opt) => (
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
          <span>←</span> Back
        </button>
        <Button onClick={onNext} disabled={!selected} className="h-8">
          Next
        </Button>
      </div>

      <div className="mt-(--space-sm)">
        <OnboardingInfoLabel>You can adjust your schedule anytime</OnboardingInfoLabel>
      </div>
    </div>
  );
}
