export interface Plan {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  amount_cents: number;
  currency: string;
  recurring_interval: string;
  recurring_interval_count: number;
  stripe_price_id: string | null;
}

export interface CheckoutSessionResponse {
  checkout_url: string;
}

export interface PortalSessionResponse {
  portal_url: string;
}

export interface SubscriptionStatusResponse {
  has_active_subscription: boolean;
  subscription: {
    status: string;
    plan_name: string | null;
    current_period_end: string;
  } | null;
}
