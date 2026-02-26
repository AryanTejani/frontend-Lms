---
description: Use when implementing a Stripe subscription checkout flow, plan selector, or customer portal
---

# Stripe Checkout Integration

## Overview

Stripe checkout follows a two-phase flow:
1. **Plan selection** — fetch available plans, let user pick one (+ optional promo code)
2. **Session creation** — POST to backend → receive `checkout_url` → `window.location.href` redirect

For managing existing subscriptions, use the **portal session** flow.

## API Layer (`client/api.ts`)

```typescript
import api from "@/lib/fetch.client";
import type { PlanRecord, SubscriptionStatusRecord } from "@/types/api";

export async function getPlans(): Promise<PlanRecord[]> {
  const response = await api.get<PlanRecord[]>("/plans");
  return response.data;
}

export async function createCheckoutSession(params: {
  planId: string;
  promotionCode?: string;
}): Promise<{ checkout_url: string }> {
  const response = await api.post<{ checkout_url: string }>("/checkout/session", params);
  return response.data;
}

export async function createPortalSession(): Promise<{ portal_url: string }> {
  const response = await api.post<{ portal_url: string }>("/checkout/portal");
  return response.data;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatusRecord> {
  const response = await api.get<SubscriptionStatusRecord>("/subscriptions/status");
  return response.data;
}
```

## Hook (`client/hooks/useCheckout.ts`)

```typescript
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlans, createCheckoutSession } from '../api';
import type { PlanRecord } from '@/types/api';

export function useCheckout() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [promotionCode, setPromotionCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plansQuery = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    // Filter out plans without Stripe IDs (not yet synced)
    select: (data) => data.filter((p) => p.stripe_price_id !== null),
  });

  // Auto-select first plan when loaded
  if (plansQuery.data && !selectedPlanId && plansQuery.data[0]) {
    setSelectedPlanId(plansQuery.data[0].id);
  }

  async function handleCheckout() {
    if (!selectedPlanId) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const { checkout_url } = await createCheckoutSession({
        planId: selectedPlanId,
        ...(promotionCode && { promotion_code: promotionCode }),
      });
      window.location.href = checkout_url;   // redirect to Stripe-hosted checkout
    } catch {
      setError('Failed to start checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    plans: plansQuery.data ?? [],
    isLoadingPlans: plansQuery.isLoading,
    selectedPlanId,
    setSelectedPlanId,
    promotionCode,
    setPromotionCode,
    handleCheckout,
    isSubmitting,
    error,
  };
}
```

## Portal Session (manage existing subscription)

```typescript
async function handleManageSubscription() {
  const { portal_url } = await createPortalSession();
  window.location.href = portal_url;
}
```

## Key Rules

- Redirect via `window.location.href = url` (not `router.push`) — Stripe checkout is an
  external domain, Next.js router only works for same-origin navigation
- Filter plans with `select` in `useQuery` — only show plans that have a Stripe price ID
- The promo code is optional: spread it into the request body only when non-empty
- After redirect, Stripe calls your backend webhook (`checkout.session.completed`)

## Reference

`src/features/payment/client/api.ts` — API functions
`src/features/payment/client/hooks/useCheckout.ts` — Hook
`src/features/payment/views/PaymentView.tsx` — Full view example
