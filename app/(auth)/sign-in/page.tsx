import type { Metadata } from 'next';
import { SignInView } from '@/features/auth/views';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your VidyaSetu account to access your courses and dashboard.',
};

export default function SignInPage() {
  return <SignInView />;
}
