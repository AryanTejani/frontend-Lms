import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Subscription } from '../../types';

interface SubscriptionCardProps {
  subscription: Subscription;
  onManageSubscription?: () => void;
  onBillingHistory?: () => void;
  onRequestRefund?: () => void;
  onUpgradePlan?: () => void;
}

const statusStyles: Record<Subscription['status'], string> = {
  active: 'bg-(--color-action-primary) text-(--color-text-inverse)',
  cancelled: 'bg-(--color-bg-tertiary) text-(--color-text-primary)',
  past_due: 'bg-(--color-text-error) text-(--color-text-inverse)',
};

export function SubscriptionCard({
  subscription,
  onManageSubscription,
  onBillingHistory,
  onRequestRefund,
  onUpgradePlan,
}: SubscriptionCardProps) {
  const t = useTranslations('account');

  const statusLabels: Record<Subscription['status'], string> = {
    active: t('statusActive'),
    cancelled: t('statusCancelled'),
    past_due: t('statusPastDue'),
  };

  return (
    <div className="flex flex-col gap-(--space-lg)">
      <h3 className="h6 h6-bold text-(--color-text-primary)">{t('subscription')}</h3>

      <div className="flex flex-col gap-(--space-base) p-(--space-base) sm:p-[25px] rounded-(--radius-card) border border-(--color-stroke-tertiary)">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-(--space-xs2)">
            <span className="body-1 font-semibold text-(--color-text-primary)">
              {subscription.planName}
            </span>
            <p className="label-2 label-2-regular text-(--color-text-secondary)">
              {subscription.description}
            </p>
          </div>
          <span
            className={cn(
              'px-(--space-xs) py-(--space-xxs) rounded-lg label-3 label-3-medium shrink-0',
              statusStyles[subscription.status]
            )}
          >
            {statusLabels[subscription.status]}
          </span>
        </div>

        <div className="flex flex-col gap-(--space-xs)">
          <p className="label-2 label-2-regular">
            <span className="label-2-medium text-(--color-text-primary)">{t('billingCycle')} </span>
            <span className="text-(--color-text-secondary)">{subscription.billingCycle}</span>
          </p>
          <p className="label-2 label-2-regular">
            <span className="label-2-medium text-(--color-text-primary)">{t('nextBillingDate')} </span>
            <span className="text-(--color-text-secondary)">{subscription.nextBillingDate}</span>
          </p>
          <p className="label-2 label-2-regular">
            <span className="label-2-medium text-(--color-text-primary)">{t('amount')} </span>
            <span className="text-(--color-text-secondary)">{subscription.amount}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-(--space-sm)">
          <Button variant="stroke" className="h-[36px]" onClick={onManageSubscription}>
            {t('manageSubscription')}
          </Button>
          <Button variant="stroke" className="h-[36px]" onClick={onBillingHistory}>
            {t('billingHistory')}
          </Button>
          {subscription.status === 'active' && (
            <>
              <Button variant="stroke" className="h-[36px]" onClick={onUpgradePlan}>
                {t('upgradePlan')}
              </Button>
              <Button variant="stroke" className="h-[36px]" onClick={onRequestRefund}>
                {t('requestRefund')}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
