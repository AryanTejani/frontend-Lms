'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { signIn, getAuthErrorMessage, getAuthErrorCode, getAuthErrorEmail } from '../api';
import { signInSchema } from '../../schemas';
import type { SignInFormData } from '../../types';
import { paths } from '@/config';

interface UseSignInFormReturn {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  error: string | null;
  isFormValid: boolean;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleRememberMeChange: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useSignInForm(): UseSignInFormReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationResult = useMemo(() => {
    return signInSchema.safeParse({ email, password, rememberMe });
  }, [email, password, rememberMe]);

  const isFormValid = validationResult.success;

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setError(null);
  }, []);

  const handleRememberMeChange = useCallback((value: boolean) => {
    setRememberMe(value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid) {
        return;
      }

      setIsLoading(true);
      setError(null);

      const data: SignInFormData = { email, password, rememberMe };
      void signIn(data)
        .then(() => {
          // Cookie is set by the API response, just redirect
          const redirectTo = searchParams.get('redirect') ?? paths.dashboard;
          router.push(redirectTo);
        })
        .catch((err: unknown) => {
          if (getAuthErrorCode(err) === 'PASSWORD_RESET_REQUIRED') {
            const errorEmail = getAuthErrorEmail(err) ?? email;
            router.push(
              `${paths.auth.resetPasswordRequired}?email=${encodeURIComponent(String(errorEmail))}`
            );
            return;
          }
          setError(getAuthErrorMessage(err));
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [email, password, rememberMe, isFormValid, router, searchParams]
  );

  return {
    email,
    password,
    rememberMe,
    isLoading,
    error,
    isFormValid,
    handleEmailChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  };
}
