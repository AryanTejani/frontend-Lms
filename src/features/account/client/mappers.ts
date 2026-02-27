import type {
  AccountProfileResponse,
  AccountSubscriptionResponse,
  PurchaseRecord,
  UserProfile,
  Subscription,
  EnrolledCourse,
} from '../types';

function formatAmount(
  cents: number,
  currency: string,
  interval: string,
  intervalCount: number
): string {
  const symbol = currency.toLowerCase() === 'usd' ? '$' : currency.toUpperCase();
  const amount = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  const label = intervalLabel(interval, intervalCount);

  return `${symbol}${amount}/${label.toLowerCase()}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function intervalLabel(interval: string, count: number): string {
  if (count === 1) {
    const map: Record<string, string> = {
      month: 'Monthly',
      year: 'Annually',
      week: 'Weekly',
      day: 'Daily',
    };

    return map[interval] ?? interval;
  }

  if (interval === 'month' && count === 3) {
    return 'Quarterly';
  }

  return `Every ${count} ${interval}s`;
}

export function mapSubscription(
  sub: NonNullable<AccountSubscriptionResponse['subscription']>
): Subscription {
  return {
    planName: sub.plan_name ?? 'Subscription',
    description: sub.plan_description ?? '',
    billingCycle: intervalLabel(sub.recurring_interval, sub.recurring_interval_count),
    nextBillingDate: formatDate(sub.current_period_end),
    amount: formatAmount(
      sub.unit_amount_cents,
      sub.currency,
      sub.recurring_interval,
      sub.recurring_interval_count
    ),
    status: normalizeStatus(sub.status),
  };
}

function normalizeStatus(status: string): Subscription['status'] {
  if (status === 'ACTIVE' || status === 'TRIALING') {
    return 'active';
  }

  if (status === 'CANCELED' || status === 'CANCELLED' || status === 'ENDED') {
    return 'cancelled';
  }

  if (status === 'PAST_DUE' || status === 'UNPAID' || status === 'INCOMPLETE') {
    return 'past_due';
  }

  return 'active';
}

export function mapProfile(data: AccountProfileResponse['data']): UserProfile {
  const parts = [data.first_name, data.last_name].filter(Boolean);
  const fullName = parts.length > 0 ? parts.join(' ') : data.email;

  return {
    fullName,
    username: data.email,
    avatarUrl: data.avatar_url ?? undefined,
  };
}

export function mapPurchasesToCourses(purchases: PurchaseRecord[]): EnrolledCourse[] {
  return purchases.map((p) => ({
    id: p.id,
    title: p.product_name,
    thumbnailUrl: p.thumbnail_url ?? undefined,
    completedLessons: 0,
    totalLessons: 0,
    percentComplete: 0,
    product_slug: p.product_slug,
  }));
}
