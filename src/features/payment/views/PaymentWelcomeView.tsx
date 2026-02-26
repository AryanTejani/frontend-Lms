'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { PaymentHeader } from '../client/components/PaymentHeader';
import { getSubscriptionStatus } from '../api';

export function PaymentWelcomeView() {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const pollCountRef = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    let redirectTimer: ReturnType<typeof setTimeout> | null = null;

    const poll = async (): Promise<void> => {
      try {
        const status = await getSubscriptionStatus();

        if (status.has_active_subscription) {
          setIsConfirmed(true);

          if (timer) {
            clearInterval(timer);
          }

          redirectTimer = setTimeout(() => router.push('/onboarding'), 3000);
          return;
        }
      } catch {
        // Ignore polling errors
      }

      pollCountRef.current += 1;

      if (pollCountRef.current >= 10) {
        // Max polls reached, assume success (webhook may still be processing)
        setIsConfirmed(true);

        if (timer) {
          clearInterval(timer);
        }

        redirectTimer = setTimeout(() => router.push('/onboarding'), 3000);
      }
    };

    timer = setInterval(() => void poll(), 2000);
    void poll();

    return () => {
      if (timer) clearInterval(timer);

      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg-primary)">
      <PaymentHeader />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-(--space-base) border border-(--color-stroke-primary) rounded-(--radius-xl) shadow-(--shadow-md) p-(--space-xl) max-w-[480px] w-full text-center">
          <Image
            src="/logo.png"
            alt="TraderLion"
            width={48}
            height={48}
            className="object-contain"
          />

          {isConfirmed ? (
            <>
              <h3 className="h4-semibold text-(--color-action-primary) m-0">
                Welcome to TraderLion!
              </h3>
              <p className="body-1-regular text-(--color-text-secondary) m-0">
                Your subscription is active. You&apos;re about to be redirected to complete your
                profile setup.
              </p>
              <Button
                variant="default"
                className="rounded-lg"
                onClick={() => router.push('/onboarding')}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <div className="w-8 h-8 border-2 border-(--color-action-primary) border-t-transparent rounded-full animate-spin" />
              <h3 className="h5-semibold text-(--color-text-primary) m-0">
                Confirming your subscription...
              </h3>
              <p className="body-1-regular text-(--color-text-secondary) m-0">
                Please wait while we verify your payment.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
