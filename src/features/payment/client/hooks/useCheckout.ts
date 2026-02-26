'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlans, createCheckoutSession } from '../../api';
import type { Plan } from '../../types';

export function useCheckout() {
  const {
    data: plans = [],
    isLoading: isLoadingPlans,
    error: plansError,
  } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  });

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (plans.length > 0 && !selectedPlan) {
      setSelectedPlan(plans[0] ?? null);
    }
  }, [plans, selectedPlan]);

  const handleSubscribe = useCallback(async () => {
    if (!selectedPlan?.stripe_price_id) {
      setError('Please select a plan.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { checkout_url } = await createCheckoutSession(
        selectedPlan.stripe_price_id,
        promoCode || undefined
      );
      window.location.href = checkout_url;
    } catch {
      setError('Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  }, [selectedPlan, promoCode]);

  return {
    plans,
    selectedPlan,
    setSelectedPlan,
    promoCode,
    setPromoCode,
    isLoading,
    isLoadingPlans,
    error: error ?? (plansError ? 'Failed to load plans. Please refresh the page.' : null),
    handleSubscribe,
  };
}
