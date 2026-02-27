// Form data and response types are inferred from Zod schemas
// Re-export them from schemas for convenience
export type { SignUpFormData, SignUpResponse, SignInFormData, SignInResponse } from './schemas';

export interface User {
  id: string;
  email: string;
  language_preference?: string;
  onboarding_completed?: boolean;
}

export interface AuthErrorResponse {
  error: {
    code:
      | 'EMAIL_ALREADY_EXISTS'
      | 'INVALID_CREDENTIALS'
      | 'ACCOUNT_NOT_FOUND'
      | 'TOKEN_INVALID'
      | 'PASSWORD_SAME_AS_OLD'
      | 'PASSWORD_RESET_REQUIRED'
      | 'RATE_LIMITED'
      | 'VALIDATION_ERROR'
      | 'UNKNOWN_ERROR';
    message: string;
    details?: { email?: string };
  };
}

export interface PasswordValidationState {
  length: boolean;
  case: boolean;
  number: boolean;
  symbol: boolean;
}

export type PasswordRuleId = keyof PasswordValidationState;
