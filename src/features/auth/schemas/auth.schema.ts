import { z } from 'zod';

export const passwordRules = [
  {
    id: 'length',
    label: 'contains at least 12 characters',
    test: (p: string) => p.length >= 12,
  },
  {
    id: 'case',
    label: 'contains both lower and uppercase letters',
    test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p),
  },
  {
    id: 'number',
    label: 'contains a number',
    test: (p: string) => /[0-9]/.test(p),
  },
  {
    id: 'symbol',
    label: 'contains a symbol (@, #, $, !, %)',
    test: (p: string) => /[@#$!%]/.test(p),
  },
] as const;

export const signUpSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(12, 'Password must be at least 12 characters')
    .max(128, 'Password must be less than 128 characters')
    .refine(
      (p) => /[A-Z]/.test(p) && /[a-z]/.test(p),
      'Password must contain both upper and lowercase letters'
    )
    .refine((p) => /[0-9]/.test(p), 'Password must contain a number')
    .refine((p) => /[@#$!%]/.test(p), 'Password must contain a symbol (@, #, $, !, %)'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signUpResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    language_preference: z.string().optional(),
    onboarding_completed: z.boolean().optional(),
  }),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
