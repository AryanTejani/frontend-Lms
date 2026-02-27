'use client';

import { Button, TextField } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { useCheckout } from '../client/hooks';
import { PaymentHeader } from '../client/components/PaymentHeader';
import { PlanSelector } from '../client/components/PlanSelector';
import { PlanSummaryCard } from '../client/components/PlanSummaryCard';
import { TestimonialCard } from '../client/components/TestimonialCard';

export function PaymentView() {
  const t = useTranslations('payment');
  const checkout = useCheckout();

  if (checkout.isLoadingPlans) {
    return (
      <div className="min-h-screen flex flex-col bg-(--color-bg-primary)">
        <PaymentHeader />
        <div className="flex-1 flex flex-col items-center justify-center gap-(--space-base)">
          <div className="w-8 h-8 border-2 border-(--color-action-primary) border-t-transparent rounded-full animate-spin" />
          <p className="label-1 label-1-regular text-(--color-text-secondary)">{t('loadingPlans')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg-primary)">
      <PaymentHeader />
      <div className="flex-1 flex gap-(--space-lg) px-(--space-7xl) py-(--space-7xl) max-w-[1200px] mx-auto w-full">
        <div className="flex-1 flex flex-col gap-(--space-lg)">
          <div className="flex flex-col gap-(--space-xs)">
            <h2 className="h5 h5-bold text-(--color-text-primary)">{t('choosePlan')}</h2>
            <p className="label-1 label-1-regular text-(--color-text-secondary)">
              {t('selectPlanSubtitle')}
            </p>
          </div>

          <PlanSelector
            plans={checkout.plans}
            selectedPlan={checkout.selectedPlan}
            onSelect={checkout.setSelectedPlan}
          />

          <div className="flex flex-col gap-(--space-sm)">
            <TextField
              label={t('promoCode')}
              value={checkout.promoCode}
              onChange={checkout.setPromoCode}
              placeholder={t('enterPromoCode')}
              size="sm"
            />
          </div>

          {checkout.error && <p className="text-xs text-(--color-text-error)">{checkout.error}</p>}

          <Button
            variant={checkout.selectedPlan && !checkout.isLoading ? 'default' : 'disabled'}
            disabled={!checkout.selectedPlan || checkout.isLoading}
            className="w-full rounded-lg"
            onClick={() => void checkout.handleSubscribe()}
          >
            {checkout.isLoading ? t('redirectingToCheckout') : t('subscribe')}
          </Button>

          <p className="label-2 label-2-regular text-(--color-text-tertiary) text-center">
            {t('stripeRedirectNote')}
          </p>
        </div>

        {checkout.selectedPlan && (
          <div className="w-[400px] flex flex-col gap-(--space-lg) shrink-0">
            <PlanSummaryCard plan={checkout.selectedPlan} />
            <TestimonialCard />
          </div>
        )}
      </div>
    </div>
  );
}
