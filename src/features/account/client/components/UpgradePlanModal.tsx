'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import { getPlans, createPortalSession } from '@/features/payment/api';
import type { Subscription } from '../../types';

interface UpgradePlanModalProps {
  currentSubscription: Subscription | null;
  onClose: () => void;
}

function formatPlanAmount(cents: number, currency: string, interval: string): string {
  const symbol = currency.toLowerCase() === 'usd' ? '$' : currency.toUpperCase();
  const amount = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  const intervalLabel = interval === 'year' ? 'yr' : interval === 'month' ? 'mo' : interval;

  return `${symbol}${amount}/${intervalLabel}`;
}

export function UpgradePlanModal({ currentSubscription, onClose }: UpgradePlanModalProps) {
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    select: (data) => data.filter((p) => p.stripe_price_id !== null),
  });

  const handleManageSubscription = useCallback(async (): Promise<void> => {
    try {
      const { portal_url } = await createPortalSession();
      window.location.href = portal_url;
    } catch {
      // Portal unavailable
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-(--space-lg) w-full max-w-[640px] px-(--space-lg) py-(--space-lg) rounded-xl border border-(--color-stroke-tertiary) bg-(--color-bg-primary) shadow-[0_0_10px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-(--space-xs2)">
          <h3 className="body-1 font-semibold text-(--color-text-primary)">Choose a Plan</h3>
          <p className="label-2 label-2-regular text-(--color-text-secondary)">
            Manage your subscription through the Stripe customer portal
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-(--space-xl)">
            <p className="label-2 text-(--color-text-secondary)">Loading plans…</p>
          </div>
        ) : (
          <div className="flex flex-col gap-(--space-sm)">
            {plans.map((plan) => {
              const isCurrent =
                currentSubscription !== null &&
                currentSubscription.planName.toLowerCase() === plan.name.toLowerCase();

              return (
                <div
                  key={plan.id}
                  className={cn(
                    'flex items-start justify-between p-(--space-base) rounded-lg border transition-colors',
                    isCurrent
                      ? 'border-(--color-action-primary) bg-(--color-bg-secondary)'
                      : 'border-(--color-stroke-tertiary)'
                  )}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-(--space-xs2)">
                      <span className="label-1 label-1-medium text-(--color-text-primary)">
                        {plan.name}
                      </span>
                      {isCurrent && (
                        <span className="px-(--space-xs) py-0.5 rounded label-3 label-3-medium bg-(--color-action-primary) text-(--color-text-inverse)">
                          Current
                        </span>
                      )}
                    </div>
                    {plan.description && (
                      <p className="label-2 label-2-regular text-(--color-text-secondary)">
                        {plan.description}
                      </p>
                    )}
                  </div>
                  <span className="label-1 label-1-medium text-(--color-text-primary) shrink-0 ml-(--space-base)">
                    {formatPlanAmount(plan.amount_cents, plan.currency, plan.recurring_interval)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end gap-(--space-xs2)">
          <Button variant="stroke" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button onClick={() => void handleManageSubscription()} className="rounded-full">
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
