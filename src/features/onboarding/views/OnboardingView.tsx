'use client';

import { OnboardingContainer } from '../client/components/OnboardingContainer';
import { Button } from '@/components/ui';
import { logoutAction } from '@/features/auth/server/logout';
import { useOnboarding } from '../client/hooks/useOnboarding';
import {
  WelcomeStep,
  ExperienceStep,
  GoalsStep,
  StyleStep,
  TimeStep,
  SummaryStep,
  RecommendationsStep,
} from '../client/components';

export function OnboardingView() {
  const {
    currentStep,
    data,
    goNext,
    goBack,
    goToStep,
    setExperienceLevel,
    toggleLearningGoal,
    setTradingStyle,
    setTimeCommitment,
    handleComplete,
  } = useOnboarding();

  return (
    <OnboardingContainer>
      <div className="absolute top-4 right-4 z-10">
        <Button variant="stroke" onClick={() => logoutAction()}>
          Sign Out
        </Button>
      </div>

      {currentStep === 'welcome' && <WelcomeStep onContinue={goNext} />}

      {currentStep === 'experience' && (
        <ExperienceStep
          selected={data.experienceLevel}
          onSelect={setExperienceLevel}
          onNext={goNext}
        />
      )}

      {currentStep === 'goals' && (
        <GoalsStep
          selected={data.learningGoals}
          onToggle={toggleLearningGoal}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'style' && (
        <StyleStep
          selected={data.tradingStyle}
          onSelect={setTradingStyle}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'time' && (
        <TimeStep
          selected={data.timeCommitment}
          onSelect={setTimeCommitment}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'summary' && (
        <SummaryStep data={data} onContinue={goNext} onModify={() => goToStep('experience')} />
      )}

      {currentStep === 'recommendations' && <RecommendationsStep onComplete={handleComplete} />}
    </OnboardingContainer>
  );
}
