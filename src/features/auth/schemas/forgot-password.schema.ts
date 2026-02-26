import { z } from 'zod';
import { passwordRules } from './auth.schema';

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
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
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Re-export passwordRules for convenience in reset password form
export { passwordRules };
