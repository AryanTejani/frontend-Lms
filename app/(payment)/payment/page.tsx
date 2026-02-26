import type { Metadata } from 'next';
import { PaymentView } from '@/features/payment';

export const metadata: Metadata = {
  title: 'Payment',
  description: 'Complete your TraderLion subscription.',
};

export default function PaymentPage() {
  return <PaymentView />;
}
