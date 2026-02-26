'use client';

import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingOption } from './OnboardingOption';
import { Button } from '@/components/ui';
import { GOAL_OPTIONS } from '../../types';

interface GoalsStepProps {
  selected: string[];
  onToggle: (goal: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GoalsStep({ selected, onToggle, onNext, onBack }: GoalsStepProps) {
  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title="Your Learning Goals" size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={4} currentStep={1} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title="What are your primary learning goals?"
          subtitle="Select all that apply"
        />
      </div>

      <div className="grid grid-cols-2 gap-(--space-sm) w-full mt-(--space-lg)">
        {GOAL_OPTIONS.map((opt) => (
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
          <span>←</span> Back
        </button>
        <Button onClick={onNext} disabled={selected.length === 0} className="h-8">
          Next
        </Button>
      </div>
    </div>
  );
}
