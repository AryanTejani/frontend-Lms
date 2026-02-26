'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { OnboardingStep, OnboardingData } from '../../types';

const STEPS: OnboardingStep[] = [
  'welcome',
  'experience',
  'goals',
  'style',
  'time',
  'summary',
  'recommendations',
];

export function useOnboarding() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    experienceLevel: null,
    learningGoals: [],
    tradingStyle: null,
    timeCommitment: null,
  });

  const currentStep = STEPS[currentStepIndex];

  const goNext = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: OnboardingStep) => {
    const index = STEPS.indexOf(step);
    if (index !== -1) setCurrentStepIndex(index);
  }, []);

  const setExperienceLevel = useCallback((level: string) => {
    setData((prev) => ({ ...prev, experienceLevel: level }));
  }, []);

  const toggleLearningGoal = useCallback((goal: string) => {
    setData((prev) => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter((g) => g !== goal)
        : [...prev.learningGoals, goal],
    }));
  }, []);

  const setTradingStyle = useCallback((style: string) => {
    setData((prev) => ({ ...prev, tradingStyle: style }));
  }, []);

  const setTimeCommitment = useCallback((time: string) => {
    setData((prev) => ({ ...prev, timeCommitment: time }));
  }, []);

  const handleComplete = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return {
    currentStep,
    currentStepIndex,
    data,
    goNext,
    goBack,
    goToStep,
    setExperienceLevel,
    toggleLearningGoal,
    setTradingStyle,
    setTimeCommitment,
    handleComplete,
  };
}
