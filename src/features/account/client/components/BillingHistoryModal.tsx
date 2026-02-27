'use client';

import { useState } from 'react';
import { Button, Badge } from '@/components/ui';
import { useOrders } from '../hooks/useOrders';
import { RefundRequestModal } from './RefundRequestModal';
import type { OrderRecord } from '../../types';

interface BillingHistoryModalProps {
  onClose: () => void;
}

function formatAmount(cents: number, currency: string): string {
  const symbol = currency.toLowerCase() === 'usd' ? '$' : currency.toUpperCase();
  return `${symbol}${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const STATUS_VARIANT: Record<string, 'success' | 'neutral' | 'default'> = {
  PAID: 'success',
  REFUNDED: 'neutral',
  PARTIALLY_REFUNDED: 'neutral',
  FAILED: 'default',
  PENDING: 'neutral',
};

interface OrderRowProps {
  order: OrderRecord;
  onRequestRefund: (order: OrderRecord) => void;
}

function OrderRow({ order, onRequestRefund }: OrderRowProps) {
  return (
    <div className="flex items-center justify-between py-(--space-sm) border-b border-(--color-stroke-tertiary) last:border-0">
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-(--space-xs2)">
          <span className="label-1 label-1-medium text-(--color-text-primary) truncate">
            #{order.order_number}
          </span>
          <Badge
            variant={STATUS_VARIANT[order.status] ?? 'default'}
            label={order.status.charAt(0) + order.status.slice(1).toLowerCase().replace(/_/g, ' ')}
          />
        </div>
        <span className="label-2 label-2-regular text-(--color-text-secondary)">
          {order.paid_at ? formatDate(order.paid_at) : formatDate(order.created_at)} •{' '}
          {formatAmount(order.total_cents, order.currency)}
        </span>
      </div>

      {order.is_refundable && (
        <Button
          variant="stroke"
          className="h-[30px] shrink-0 ml-(--space-sm)"
          onClick={() => onRequestRefund(order)}
        >
          Refund
        </Button>
      )}
    </div>
  );
}

export function BillingHistoryModal({ onClose }: BillingHistoryModalProps) {
  const [page, setPage] = useState(1);
  const [refundOrder, setRefundOrder] = useState<OrderRecord | null>(null);

  const { data, isLoading } = useOrders(page);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  if (refundOrder) {
    return (
      <RefundRequestModal preselectedOrder={refundOrder} onClose={() => setRefundOrder(null)} />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-(--space-lg) w-full max-w-[560px] px-(--space-lg) py-(--space-lg) rounded-xl border border-(--color-stroke-tertiary) bg-(--color-bg-primary) shadow-[0_0_10px_rgba(0,0,0,0.25)] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="body-1 font-semibold text-(--color-text-primary)">Billing History</h3>

        <div className="flex flex-col overflow-y-auto flex-1">
          {isLoading ? (
            <p className="label-2 text-(--color-text-secondary) text-center py-(--space-lg)">
              Loading…
            </p>
          ) : !data || data.data.length === 0 ? (
            <p className="label-2 text-(--color-text-secondary) text-center py-(--space-lg)">
              No orders yet
            </p>
          ) : (
            <div className="flex flex-col">
              {data.data.map((order) => (
                <OrderRow key={order.id} order={order} onRequestRefund={setRefundOrder} />
              ))}
            </div>
          )}
        </div>

        {data && data.total > data.limit && (
          <div className="flex items-center justify-between pt-(--space-sm) border-t border-(--color-stroke-tertiary)">
            <Button
              variant="stroke"
              className="h-[32px]"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="label-2 text-(--color-text-secondary)">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="stroke"
              className="h-[32px]"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}

        <div className="flex justify-end pt-(--space-xs2)">
          <Button variant="stroke" onClick={onClose} className="rounded-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
