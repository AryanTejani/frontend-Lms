export interface UserProfile {
  fullName: string;
  username: string;
  avatarUrl?: string;
}

export interface Subscription {
  planName: string;
  description: string;
  billingCycle: string;
  nextBillingDate: string;
  amount: string;
  status: 'active' | 'cancelled' | 'past_due';
}

export interface EnrolledCourse {
  id: string;
  title: string;
  thumbnailUrl?: string;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
  product_slug: string | null;
}

// API response types
export interface AccountProfileResponse {
  data: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    has_stripe_customer: boolean;
    active_subscriptions: number;
    total_orders: number;
  };
}

export interface AccountSubscriptionResponse {
  has_active_subscription: boolean;
  subscription: {
    status: string;
    plan_name: string | null;
    plan_description: string | null;
    unit_amount_cents: number;
    currency: string;
    recurring_interval: string;
    recurring_interval_count: number;
    current_period_end: string;
    cancel_at_period_end: boolean;
  } | null;
}

export interface OrderRecord {
  id: string;
  order_number: string;
  status: string;
  order_type: string;
  currency: string;
  total_cents: number;
  refund_amount_cents: number | null;
  is_refundable: boolean;
  paid_at: string | null;
  created_at: string;
}

export interface OrdersResponse {
  data: OrderRecord[];
  total: number;
  page: number;
  limit: number;
}

export interface PurchaseRecord {
  id: string;
  product_name: string;
  product_slug: string | null;
  content_type: string;
  is_lifetime: boolean;
  thumbnail_url: string | null;
  status: string;
  granted_at: string;
  created_at: string;
}

export type RefundReason =
  | 'not_as_described'
  | 'technical_issues'
  | 'accidental_purchase'
  | 'no_longer_needed'
  | 'other';
