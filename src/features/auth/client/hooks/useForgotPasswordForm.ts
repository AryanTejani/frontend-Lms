'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  requestPasswordReset,
  getAuthErrorMessage,
  getAuthErrorCode,
  isRateLimitError,
  getRetryAfterSeconds,
} from '../api';
import { forgotPasswordSchema } from '../../schemas';
import type { ZodType } from 'zod';

interface UseForgotPasswordFormReturn {
  email: string;
  isLoading: boolean;
  error: string | null;
  errorCode: string | null;
  isSuccess: boolean;
  retryAfter: number;
  isFormValid: boolean;
  handleEmailChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useForgotPasswordForm(): UseForgotPasswordFormReturn {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isCountingDown = retryAfter > 0;

  useEffect(() => {
    if (isCountingDown) {
      timerRef.current = setInterval(() => {
        setRetryAfter((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isCountingDown]);

  const validationResult = useMemo(() => {
    const schema = forgotPasswordSchema as ZodType<{ email: string }>;
    return schema.safeParse({ email });
  }, [email]);

  const isFormValid = validationResult.success;

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
    setErrorCode(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid || retryAfter > 0) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setErrorCode(null);

      void requestPasswordReset(email)
        .then(() => {
          setIsSuccess(true);
        })
        .catch((err: unknown) => {
          if (isRateLimitError(err)) {
            const seconds = getRetryAfterSeconds(err);
            setRetryAfter(seconds);
          }
          setErrorCode(getAuthErrorCode(err));
          setError(getAuthErrorMessage(err));
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [email, isFormValid, retryAfter]
  );

  return {
    email,
    isLoading,
    error,
    errorCode,
    isSuccess,
    retryAfter,
    isFormValid,
    handleEmailChange,
    handleSubmit,
  };
}
