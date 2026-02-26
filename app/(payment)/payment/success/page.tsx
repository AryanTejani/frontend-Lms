import type { Metadata } from 'next';
import { PaymentWelcomeView } from '@/features/payment';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Welcome to VidyaSetu!',
};

export default function PaymentSuccessPage() {
  return <PaymentWelcomeView />;
}
