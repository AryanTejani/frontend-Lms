import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Please enter a valid email address')),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signInResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    name: z.string().optional(),
    language_preference: z.string().optional(),
    onboarding_completed: z.boolean().optional(),
  }),
});

export type SignInResponse = z.infer<typeof signInResponseSchema>;
