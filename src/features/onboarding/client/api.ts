'use client';

import api from '@/lib/fetch.client';
import type { OnboardingData } from '../types';

export async function saveOnboarding(data: OnboardingData): Promise<void> {
  await api.post('/customers/me/onboarding', {
    languagePreference: data.languagePreference,
    age: data.age,
    grade: data.grade,
    subjects: data.subjects,
    learningGoals: data.learningGoals,
  });
}

export async function updateLanguagePreference(languagePreference: string): Promise<void> {
  await api.patch('/customers/me/preferences', { languagePreference });
}
