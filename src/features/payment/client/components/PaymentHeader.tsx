'use client';

import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui';
import { logoutAction } from '@/features/auth/server/logout';

export function PaymentHeader() {
  return (
    <header className="flex items-center justify-between px-(--space-7xl) py-(--space-lg)">
      <Logo />
      <Button variant="stroke" className="rounded-full" onClick={() => void logoutAction()}>
        Sign out
      </Button>
    </header>
  );
}
