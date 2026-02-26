import { z } from 'zod';

export const promoCodeSchema = z.object({
  promoCode: z.string().optional(),
});

export type PromoCodeFormData = z.infer<typeof promoCodeSchema>;
