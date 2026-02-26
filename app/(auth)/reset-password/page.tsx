import type { Metadata } from 'next';
import { ResetPasswordView } from '@/features/auth/views';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your VidyaSetu account.',
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
