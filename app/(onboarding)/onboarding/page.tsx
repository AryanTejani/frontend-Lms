import type { Metadata } from 'next';
import { OnboardingView } from '@/features/onboarding/views/OnboardingView';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Set up your TraderLion learning profile.',
};

export default function OnboardingPage() {
  return <OnboardingView />;
}
