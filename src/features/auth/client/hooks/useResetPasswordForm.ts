'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resetPassword, getAuthErrorMessage, isRateLimitError, getRetryAfterSeconds } from '../api';
import { resetPasswordSchema, passwordRules } from '../../schemas';
import { paths } from '@/config';
import type { PasswordValidationState, PasswordRuleId } from '../../types';

interface UseResetPasswordFormReturn {
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  retryAfter: number;
  isFormValid: boolean;
  tokenError: string | null;
  passwordValidation: PasswordValidationState;
  handlePasswordChange: (value: string) => void;
  handleConfirmPasswordChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useResetPasswordForm(): UseResetPasswordFormReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  const tokenError = token
    ? null
    : 'Invalid or missing reset token. Please request a new password reset link.';

  useEffect(() => {
    if (retryAfter <= 0) return;

    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [retryAfter]);

  const passwordValidation = useMemo<PasswordValidationState>(() => {
    const result: PasswordValidationState = {
      length: false,
      case: false,
      number: false,
      symbol: false,
    };

    for (const rule of passwordRules) {
      result[rule.id as PasswordRuleId] = rule.test(password);
    }

    return result;
  }, [password]);

  const validationResult = useMemo(() => {
    return resetPasswordSchema.safeParse({
      token: token ?? '',
      password,
      confirmPassword,
    });
  }, [token, password, confirmPassword]);

  const isFormValid = validationResult.success && !tokenError;

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setError(null);
  }, []);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid || retryAfter > 0 || !token) {
        return;
      }

      setIsLoading(true);
      setError(null);

      void resetPassword(token, password)
        .then(() => {
          setIsSuccess(true);
          setTimeout(() => {
            router.push(paths.auth.signIn);
          }, 2000);
        })
        .catch((err: unknown) => {
          if (isRateLimitError(err)) {
            const seconds = getRetryAfterSeconds(err);
            setRetryAfter(seconds);
          }
          setError(getAuthErrorMessage(err));
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [token, password, isFormValid, retryAfter, router]
  );

  return {
    password,
    confirmPassword,
    isLoading,
    error,
    isSuccess,
    retryAfter,
    isFormValid,
    tokenError,
    passwordValidation,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
}
