'use client';

import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { OnboardingOption } from './OnboardingOption';
import { OnboardingInfoLabel } from './OnboardingInfoLabel';
import { Button } from '@/components/ui';
import { EXPERIENCE_OPTIONS } from '../../types';

interface ExperienceStepProps {
  selected: string | null;
  onSelect: (level: string) => void;
  onNext: () => void;
}

export function ExperienceStep({ selected, onSelect, onNext }: ExperienceStepProps) {
  return (
    <div className="flex flex-col items-center max-w-[608px] mx-auto py-16 px-(--space-base)">
      <OnboardingWelcome title="Your Trading Experience" size="lg" />

      <div className="w-full mt-[72px]">
        <OnboardingProgressBar steps={4} currentStep={0} />
      </div>

      <div className="w-full mt-(--space-lg)">
        <OnboardingQuestion
          title="What's your trading experience level?"
          subtitle="Help us customize your learning path"
        />
      </div>

      <div className="flex flex-col gap-(--space-sm) w-full mt-(--space-lg)">
        {EXPERIENCE_OPTIONS.map((opt) => (
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

      <div className="flex justify-end w-full mt-(--space-lg)">
        <Button onClick={onNext} disabled={!selected} className="h-8">
          Next
        </Button>
      </div>

      <div className="mt-(--space-sm)">
        <OnboardingInfoLabel>You can always adjust your learning path later</OnboardingInfoLabel>
      </div>
    </div>
  );
}
