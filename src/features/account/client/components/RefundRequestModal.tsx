'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { useOrders } from '../hooks/useOrders';
import { useRefundRequest } from '../hooks/useRefundRequest';
import { refundRequestSchema } from '../../schemas';
import type { OrderRecord } from '../../types';

interface RefundRequestModalProps {
  preselectedOrder?: OrderRecord;
  onClose: () => void;
}

const REASON_LABELS: Record<string, string> = {
  not_as_described: 'Not as described',
  technical_issues: 'Technical issues',
  accidental_purchase: 'Accidental purchase',
  no_longer_needed: 'No longer needed',
  other: 'Other',
};

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

export function RefundRequestModal({ preselectedOrder, onClose }: RefundRequestModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(preselectedOrder ? 2 : 1);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(preselectedOrder ?? null);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const { data: ordersData, isLoading } = useOrders(1);
  const refundMutation = useRefundRequest();

  const allOrders = ordersData?.data ?? [];

  const STATUS_LABELS: Record<string, string> = {
    refunded: 'Refunded',
    partially_refunded: 'Partial Refund',
    pending: 'Pending',
    void: 'Void',
  };

  const handleSelectOrder = (order: OrderRecord): void => {
    setSelectedOrder(order);
    setStep(2);
  };

  const handleSubmit = (): void => {
    if (!selectedOrder) {
      return;
    }

    const result = refundRequestSchema.safeParse({
      order_id: selectedOrder.id,
      reason,
      details: details || undefined,
    });

    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? 'Please fill in all required fields');
      return;
    }

    setFormError(null);

    refundMutation.mutate(
      { order_id: selectedOrder.id, reason: details ? `${reason}: ${details}` : reason },
      {
        onSuccess: () => setStep(3),
        onError: () => setFormError('Failed to process refund. Please try again.'),
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-(--space-lg) w-full max-w-[520px] px-(--space-lg) py-(--space-lg) rounded-xl border border-(--color-stroke-tertiary) bg-(--color-bg-primary) shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 && (
          <>
            <div className="flex flex-col gap-(--space-xs2)">
              <h3 className="body-1 font-semibold text-(--color-text-primary)">Request a Refund</h3>
              <p className="label-2 label-2-regular text-(--color-text-secondary)">
                Select the order you would like to refund
              </p>
            </div>

            {isLoading ? (
              <p className="label-2 text-(--color-text-secondary) text-center py-(--space-lg)">
                Loading orders…
              </p>
            ) : allOrders.length === 0 ? (
              <p className="label-2 text-(--color-text-secondary) text-center py-(--space-lg)">
                No orders found
              </p>
            ) : (
              <div className="flex flex-col gap-(--space-xs2) max-h-[320px] overflow-y-auto">
                {allOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`flex items-center justify-between p-(--space-sm) rounded-lg border border-(--color-stroke-tertiary) transition-colors ${order.is_refundable ? 'hover:bg-(--color-bg-secondary)' : 'opacity-60'}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span
                        className={`label-1 label-1-medium ${order.is_refundable ? 'text-(--color-text-primary)' : 'text-(--color-text-secondary)'}`}
                      >
                        #{order.order_number}
                      </span>
                      <span className="label-2 label-2-regular text-(--color-text-secondary)">
                        {order.paid_at ? formatDate(order.paid_at) : formatDate(order.created_at)} •{' '}
                        {formatAmount(order.total_cents, order.currency)}
                      </span>
                    </div>
                    {order.is_refundable ? (
                      <Button
                        variant="stroke"
                        className="h-[32px] shrink-0"
                        onClick={() => handleSelectOrder(order)}
                      >
                        Select
                      </Button>
                    ) : (
                      <span className="label-3 label-3-regular text-(--color-text-secondary) shrink-0 px-(--space-xs)">
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="stroke" onClick={onClose} className="rounded-full">
                Cancel
              </Button>
            </div>
          </>
        )}

        {step === 2 && selectedOrder && (
          <>
            <div className="flex flex-col gap-(--space-xs2)">
              <h3 className="body-1 font-semibold text-(--color-text-primary)">Confirm Refund</h3>
              <p className="label-2 label-2-regular text-(--color-text-secondary)">
                Order #{selectedOrder.order_number} •{' '}
                {formatAmount(selectedOrder.total_cents, selectedOrder.currency)}
              </p>
            </div>

            <div className="flex flex-col gap-(--space-base)">
              <div className="flex flex-col gap-(--space-xs2)">
                <label
                  className="label-2 label-2-medium text-(--color-text-primary)"
                  htmlFor="refund-reason"
                >
                  Reason for refund <span className="text-(--color-text-error)">*</span>
                </label>
                <select
                  id="refund-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-(--space-sm) py-(--space-xs) rounded-lg border border-(--color-stroke-tertiary) bg-(--color-bg-primary) text-(--color-text-primary) label-2 focus:outline-none focus:border-(--color-action-primary)"
                >
                  <option value="">Select a reason…</option>
                  {Object.entries(REASON_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-(--space-xs2)">
                <label
                  className="label-2 label-2-medium text-(--color-text-primary)"
                  htmlFor="refund-details"
                >
                  Additional details (optional)
                </label>
                <textarea
                  id="refund-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Tell us more about your reason…"
                  className="w-full px-(--space-sm) py-(--space-xs) rounded-lg border border-(--color-stroke-tertiary) bg-(--color-bg-primary) text-(--color-text-primary) label-2 resize-none focus:outline-none focus:border-(--color-action-primary)"
                />
              </div>

              {formError && <p className="label-2 text-(--color-text-error)">{formError}</p>}
            </div>

            <div className="flex justify-end gap-(--space-xs2)">
              <Button variant="stroke" onClick={() => setStep(1)} className="rounded-full">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={refundMutation.isPending || !reason}
                className="rounded-full"
              >
                {refundMutation.isPending ? 'Processing…' : 'Submit Refund'}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col items-center gap-(--space-base) py-(--space-lg) text-center">
              <div className="w-12 h-12 rounded-full bg-(--color-lm-success-bg) flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <div className="flex flex-col gap-(--space-xs2)">
                <h3 className="body-1 font-semibold text-(--color-text-primary)">
                  Refund Requested
                </h3>
                <p className="label-2 label-2-regular text-(--color-text-secondary)">
                  Your refund request has been submitted. You will receive a confirmation email
                  shortly.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={onClose} className="rounded-full">
                Done
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
