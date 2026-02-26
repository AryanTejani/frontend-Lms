import type { Metadata } from 'next';
import { SignUpView } from '@/features/auth/views';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your VidyaSetu account and start learning in your language.',
};

export default function SignUpPage() {
  return <SignUpView />;
}
