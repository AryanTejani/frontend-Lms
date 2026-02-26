'use client';

import { cn } from '@/utils/cn';
import type { Plan } from '../../types';

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: Plan | null;
  onSelect: (plan: Plan) => void;
}

function formatPrice(amountCents: number): string {
  return `$${(amountCents / 100).toFixed(0)}`;
}

function getIntervalLabel(plan: Plan): string {
  if (plan.recurring_interval === 'year') return '/yr';

  if (plan.recurring_interval_count === 3) return '/3 mo';

  return '/mo';
}

export function PlanSelector({ plans, selectedPlan, onSelect }: PlanSelectorProps) {
  return (
    <div className="flex flex-col gap-(--space-xs)">
      {plans.map((plan) => {
        const isSelected = selectedPlan?.id === plan.id;

        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan)}
            className={cn(
              'flex items-center gap-(--space-sm) p-(--space-sm) rounded-(--radius-lg) border cursor-pointer transition-colors text-left bg-transparent',
              isSelected
                ? 'border-(--color-action-primary) bg-(--color-action-primary)/5'
                : 'border-(--color-stroke-primary) hover:bg-(--color-bg-secondary)'
            )}
          >
            <div
              className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                isSelected ? 'border-(--color-action-primary)' : 'border-(--color-stroke-tertiary)'
              )}
            >
              {isSelected && <div className="w-2 h-2 rounded-full bg-(--color-action-primary)" />}
            </div>
            <div className="flex flex-col flex-1">
              <span className="label-1 label-1-semibold text-(--color-text-primary)">
                {plan.name}
              </span>
              {plan.description && (
                <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                  {plan.description}
                </span>
              )}
            </div>
            <span className="label-1 label-1-semibold text-(--color-text-primary)">
              {formatPrice(plan.amount_cents)}
              {getIntervalLabel(plan)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
