'use client';

import { useTranslations } from 'next-intl';
import { OnboardingContainer } from '../client/components/OnboardingContainer';
import { Button } from '@/components/ui';
import { logoutAction } from '@/features/auth/server/logout';
import { useOnboarding } from '../client/hooks/useOnboarding';
import {
  WelcomeStep,
  LanguageStep,
  AgeStep,
  GradeStep,
  SubjectsStep,
  LearningGoalsStep,
  SummaryStep,
} from '../client/components';

export function OnboardingView() {
  const tc = useTranslations('common');
  const {
    currentStep,
    data,
    isSubmitting,
    goNext,
    goBack,
    goToStep,
    setLanguagePreference,
    setAge,
    setGrade,
    toggleSubject,
    toggleGoal,
    handleComplete,
  } = useOnboarding();

  return (
    <OnboardingContainer>
      <div className="absolute top-4 right-4 z-10">
        <Button variant="stroke" onClick={() => logoutAction()}>
          {tc('signOut')}
        </Button>
      </div>

      {currentStep === 'welcome' && <WelcomeStep onContinue={goNext} />}

      {currentStep === 'language' && (
        <LanguageStep
          selected={data.languagePreference}
          onSelect={setLanguagePreference}
          onNext={goNext}
        />
      )}

      {currentStep === 'age' && (
        <AgeStep
          value={data.age}
          onChange={setAge}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'grade' && (
        <GradeStep
          selected={data.grade}
          onSelect={setGrade}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'subjects' && (
        <SubjectsStep
          selected={data.subjects}
          onToggle={toggleSubject}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'goals' && (
        <LearningGoalsStep
          selected={data.learningGoals}
          onToggle={toggleGoal}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep === 'summary' && (
        <SummaryStep
          data={data}
          onContinue={handleComplete}
          onModify={() => goToStep('language')}
          isSubmitting={isSubmitting}
        />
      )}
    </OnboardingContainer>
  );
}
