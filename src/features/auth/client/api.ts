import { signUpResponseSchema, signInResponseSchema } from '../schemas';
import type {
  SignUpFormData,
  SignUpResponse,
  SignInFormData,
  SignInResponse,
  AuthErrorResponse,
} from '../types';
import api from '@/lib/fetch.client';

interface PasswordResetResponse {
  success: true;
  message: string;
}

export async function signUp(data: SignUpFormData): Promise<SignUpResponse> {
  const response = await api.post<SignUpResponse>('/auth/signup', data);
  return signUpResponseSchema.parse(response.data);
}

export async function signIn(data: SignInFormData): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/auth/login', data);
  return signInResponseSchema.parse(response.data);
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function requestPasswordReset(email: string): Promise<PasswordResetResponse> {
  const response = await api.post<PasswordResetResponse>('/auth/forgot-password', { email });
  return response.data;
}

export async function resetPassword(
  token: string,
  password: string
): Promise<PasswordResetResponse> {
  const response = await api.post<PasswordResetResponse>('/auth/forgot-password/reset', {
    token,
    password,
  });
  return response.data;
}

interface GoogleAuthUrlResponse {
  url: string;
  state: string;
}

export async function getGoogleAuthUrl(): Promise<GoogleAuthUrlResponse> {
  const response = await api.get<GoogleAuthUrlResponse>('/auth/google');
  return response.data;
}

export async function getCurrentUser(): Promise<SignInResponse> {
  const response = await api.get<SignInResponse>('/auth/me');
  return signInResponseSchema.parse(response.data);
}

interface ErrorWithResponse {
  response?: {
    status?: number;
    headers?: {
      get?: (name: string) => string | null;
    };
    data?: unknown;
  };
}

function hasResponse(
  error: ErrorWithResponse
): error is ErrorWithResponse & { response: NonNullable<ErrorWithResponse['response']> } {
  return error.response !== undefined;
}

function hasData(
  response: NonNullable<ErrorWithResponse['response']>
): response is NonNullable<ErrorWithResponse['response']> & { data: unknown } {
  return response.data !== undefined && response.data !== null;
}

export function isAuthError(error: unknown): error is ErrorWithResponse & {
  response: { data: AuthErrorResponse };
} {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const err = error as ErrorWithResponse;
  if (!hasResponse(err)) {
    return false;
  }
  if (!hasData(err.response)) {
    return false;
  }
  return (
    typeof err.response.data === 'object' &&
    err.response.data !== null &&
    'error' in err.response.data
  );
}

export function isRateLimitError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const err = error as ErrorWithResponse;
  return hasResponse(err) && err.response.status === 429;
}

export function getRetryAfterSeconds(error: unknown): number {
  if (typeof error !== 'object' || error === null) {
    return 60;
  }
  const err = error as ErrorWithResponse;
  if (!hasResponse(err)) {
    return 60;
  }
  const retryAfter = err.response.headers?.get?.('retry-after');
  if (retryAfter) {
    const seconds = parseInt(retryAfter, 10);
    if (!isNaN(seconds)) {
      return seconds;
    }
  }
  return 60;
}

export function getAuthErrorEmail(error: unknown): string | null {
  if (!isAuthError(error)) {
    return null;
  }
  return error.response.data.error.details?.email ?? null;
}

export function getAuthErrorCode(error: unknown): string | null {
  if (!isAuthError(error)) {
    return null;
  }
  return error.response.data.error.code;
}

export function getAuthErrorMessage(error: unknown): string {
  if (isRateLimitError(error)) {
    return 'Too many requests. Please wait before trying again.';
  }
  if (isAuthError(error)) {
    const { code, message } = error.response.data.error;
    switch (code) {
      case 'EMAIL_ALREADY_EXISTS':
        return 'An account with this email already exists';
      case 'INVALID_CREDENTIALS':
        return 'Invalid email or password';
      case 'ACCOUNT_NOT_FOUND':
        return 'No account found with this email. Please create an account.';
      case 'TOKEN_INVALID':
        return 'This reset link is invalid or has expired';
      case 'PASSWORD_SAME_AS_OLD':
        return 'New password cannot be the same as your current password';
      case 'PASSWORD_RESET_REQUIRED':
        return 'Your account requires a password reset. Please reset your password to continue.';
      case 'RATE_LIMITED':
        return 'Too many requests. Please wait before trying again.';
      case 'VALIDATION_ERROR':
        return message || 'Please check your input and try again';
      default:
        return message || 'Something went wrong. Please try again.';
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}
