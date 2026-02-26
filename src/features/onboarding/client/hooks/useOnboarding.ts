'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/i18n/set-locale';
import type { Locale } from '@/i18n/config';
import { saveOnboarding } from '../api';
import type { OnboardingStep, OnboardingData } from '../../types';

const STEPS: OnboardingStep[] = [
  'welcome',
  'language',
  'age',
  'grade',
  'subjects',
  'goals',
  'summary',
];

const STORAGE_KEY = 'vidyasetu_onboarding';

function loadFromSession(): { stepIndex: number; data: OnboardingData } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as { stepIndex: number; data: OnboardingData };
  } catch {
    return null;
  }
}

function saveToSession(stepIndex: number, data: OnboardingData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ stepIndex, data }));
  } catch {
    // sessionStorage unavailable
  }
}

export function useOnboarding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saved = typeof window !== 'undefined' ? loadFromSession() : null;

  const [currentStepIndex, setCurrentStepIndex] = useState(saved?.stepIndex ?? 0);
  const [data, setData] = useState<OnboardingData>(
    saved?.data ?? {
      languagePreference: null,
      age: null,
      grade: null,
      subjects: [],
      learningGoals: [],
    },
  );

  useEffect(() => {
    saveToSession(currentStepIndex, data);
  }, [currentStepIndex, data]);

  const currentStep = STEPS[currentStepIndex];

  const goNext = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: OnboardingStep) => {
    const index = STEPS.indexOf(step);

    if (index !== -1) {
      setCurrentStepIndex(index);
    }
  }, []);

  const setLanguagePreference = useCallback((code: string) => {
    setData((prev) => ({ ...prev, languagePreference: code }));
    setLocale(code as Locale);
  }, []);

  const setAge = useCallback((age: number | null) => {
    setData((prev) => ({ ...prev, age }));
  }, []);

  const setGrade = useCallback((grade: string) => {
    setData((prev) => ({ ...prev, grade }));
  }, []);

  const toggleSubject = useCallback((subject: string) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  }, []);

  const toggleGoal = useCallback((goal: string) => {
    setData((prev) => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter((g) => g !== goal)
        : [...prev.learningGoals, goal],
    }));
  }, []);

  const handleComplete = useCallback(async () => {
    setIsSubmitting(true);

    try {
      await saveOnboarding(data);
      sessionStorage.removeItem(STORAGE_KEY);
      router.push('/dashboard');
    } catch {
      // API error — user stays on summary
    } finally {
      setIsSubmitting(false);
    }
  }, [data, router]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: STEPS.length,
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
  };
}
