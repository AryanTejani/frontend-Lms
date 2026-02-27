'use client';

import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { logoutAction } from '@/features/auth/server/logout';

export function PaymentHeader() {
  const t = useTranslations('common');
  return (
    <header className="flex items-center justify-between px-(--space-7xl) py-(--space-lg)">
      <Logo />
      <Button variant="stroke" className="rounded-full" onClick={() => void logoutAction()}>
        {t('signOut')}
      </Button>
    </header>
  );
}
