import api from '@/lib/fetch.client';
import type {
  Plan,
  CheckoutSessionResponse,
  PortalSessionResponse,
  SubscriptionStatusResponse,
} from '../types';

export async function getPlans(): Promise<Plan[]> {
  const response = await api.get<{ data: Plan[] }>('/plans');
  return response.data.data;
}

export async function createCheckoutSession(
  priceId: string,
  promotionCode?: string
): Promise<CheckoutSessionResponse> {
  const response = await api.post<CheckoutSessionResponse>('/checkout/session', {
    price_id: priceId,
    ...(promotionCode && { promotion_code: promotionCode }),
  });
  return response.data;
}

export async function createPortalSession(): Promise<PortalSessionResponse> {
  const response = await api.post<PortalSessionResponse>('/checkout/portal');
  return response.data;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
  const response = await api.get<SubscriptionStatusResponse>('/checkout/subscription-status');
  return response.data;
}
