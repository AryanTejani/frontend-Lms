'use client';

import Image from 'next/image';
import { OnboardingFeatureCard } from './OnboardingFeatureCard';
import { Button } from '@/components/ui';
import { AcademyIcon, AIIcon, VideosIcon } from '@/assets/icons';
import logo from '@/assets/logo.png';

interface WelcomeStepProps {
  onContinue: () => void;
}

export function WelcomeStep({ onContinue }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center gap-12 max-w-[895px] mx-auto flex-1 justify-center px-(--space-base)">
      {/* Header group */}
      <div className="flex flex-col items-center gap-[11px]">
        <Image src={logo} alt="VidyaSetu" width={108} height={108} className="object-contain" />
        <h2 className="h2 h2-semibold text-(--color-text-primary) text-center">
          Welcome to VidyaSetu
        </h2>
        <p className="text-[18px] leading-7 text-(--color-text-secondary) text-center max-w-[400px]">
          Learn any subject in your mother tongue, at your own pace
        </p>
      </div>

      {/* Feature cards */}
      <div
        className="rounded-[24px] border border-(--color-stroke-selection) shadow-xl h-[160px] flex items-center px-[32px] w-[672px]"
        style={{
          background:
            'linear-gradient(166.6deg, rgba(var(--color-primary-rgb), 0.1) 0%, rgba(112,148,215,0.1) 50%, rgba(55,57,61,0.1) 100%)',
        }}
      >
        <div className="flex gap-(--space-sm) w-full">
          <OnboardingFeatureCard
            icon={<AcademyIcon className="w-5 h-5 text-(--color-text-secondary)" />}
            label="Personalized learning path"
            className="flex-1"
          />
          <OnboardingFeatureCard
            icon={<VideosIcon className="w-5 h-5 text-(--color-text-secondary)" />}
            label="Learn in your language"
            className="flex-1"
          />
          <OnboardingFeatureCard
            icon={<AIIcon className="w-5 h-5 text-(--color-text-secondary)" />}
            label="Voice-first AI tutor"
            className="flex-1"
          />
        </div>
      </div>

      <Button onClick={onContinue} className="w-full mt-(--space-sm) h-10">
        Get Started
      </Button>
    </div>
  );
}
