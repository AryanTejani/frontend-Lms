import type { Metadata } from 'next';
import { SignUpView } from '@/features/auth/views';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create your TraderLion account and start learning stock trading from professional traders.',
};

export default function SignUpPage() {
  return <SignUpView />;
}
