import { z } from 'zod';

const refundReasonEnum = z.enum([
  'not_as_described',
  'technical_issues',
  'accidental_purchase',
  'no_longer_needed',
  'other',
]);

export const refundRequestSchema = z.object({
  order_id: z.string().uuid(),
  reason: refundReasonEnum,
  details: z.string().max(500).optional(),
});

export type RefundRequestFormData = z.infer<typeof refundRequestSchema>;
