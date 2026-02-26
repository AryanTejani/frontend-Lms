import type { Metadata } from 'next';
import { ForgotPasswordView } from '@/features/auth/views';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your VidyaSetu account password.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
