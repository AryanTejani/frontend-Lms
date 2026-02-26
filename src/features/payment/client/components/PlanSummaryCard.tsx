'use client';

import type { Plan } from '../../types';

interface PlanSummaryCardProps {
  plan: Plan;
}

function formatPrice(amountCents: number): string {
  return `$${(amountCents / 100).toFixed(2)}`;
}

function getIntervalLabel(plan: Plan): string {
  if (plan.recurring_interval === 'year') return '/yr';

  if (plan.recurring_interval_count === 3) return '/3 months';

  return '/mo';
}

function getNextPaymentDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function PlanSummaryCard({ plan }: PlanSummaryCardProps) {
  return (
    <div className="border border-(--color-stroke-primary) rounded-(--radius-card) p-(--space-lg) flex flex-col gap-(--space-sm)">
      <span className="label-1 label-1-semibold text-(--color-text-primary)">Your Plan</span>

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="label-1 label-1-semibold text-(--color-text-secondary)">
            {plan.name}
          </span>
          <span className="label-2 label-2-regular text-(--color-text-tertiary)">
            Next payment: {getNextPaymentDate()}
          </span>
        </div>
        <span className="label-1 label-1-semibold text-(--color-text-primary)">
          {formatPrice(plan.amount_cents)}
          {getIntervalLabel(plan)}
        </span>
      </div>

      <hr className="border-0 border-t border-(--color-stroke-primary) m-0" />

      <div className="flex items-center justify-between">
        <span className="label-2 label-2-regular text-(--color-text-secondary)">
          {plan.description ?? plan.name}
        </span>
        <span className="label-2 label-2-regular text-(--color-text-primary)">
          {formatPrice(plan.amount_cents)}
        </span>
      </div>

      <hr className="border-0 border-t border-(--color-stroke-primary) m-0" />

      <div className="flex items-center justify-between">
        <span className="label-1 label-1-semibold text-(--color-text-primary)">Total</span>
        <span className="label-1 label-1-semibold text-(--color-text-primary)">
          {formatPrice(plan.amount_cents)}
          {getIntervalLabel(plan)}
        </span>
      </div>
    </div>
  );
}
