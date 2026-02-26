import type { Metadata } from 'next';
import { ResetPasswordRequiredView } from '@/features/auth/views';

export const metadata: Metadata = {
  title: 'Password Reset Required',
  description: 'Your account requires a password reset.',
};

export default function ResetPasswordRequiredPage() {
  return <ResetPasswordRequiredView />;
}
