'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { signUp, getAuthErrorMessage } from '../api';
import { signUpSchema, passwordRules } from '../../schemas';
import type { SignUpFormData, PasswordValidationState } from '../../types';

interface UseSignUpFormReturn {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  passwordValidation: PasswordValidationState;
  isPasswordValid: boolean;
  isFormValid: boolean;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useSignUpForm(): UseSignUpFormReturn {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordValidation = useMemo<PasswordValidationState>(() => {
    return {
      length: passwordRules[0]?.test(password) ?? false,
      case: passwordRules[1]?.test(password) ?? false,
      number: passwordRules[2]?.test(password) ?? false,
      symbol: passwordRules[3]?.test(password) ?? false,
    };
  }, [password]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidation).every(Boolean);
  }, [passwordValidation]);

  const validationResult = useMemo(() => {
    return signUpSchema.safeParse({ email, password });
  }, [email, password]);

  const isFormValid = validationResult.success;

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid) {
        return;
      }

      setIsLoading(true);
      setError(null);

      const data: SignUpFormData = { email, password };
      void signUp(data)
        .then(() => {
          // Cookie is set by the API response, just redirect
          router.push('/payment');
        })
        .catch((err: unknown) => {
          setError(getAuthErrorMessage(err));
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [email, password, isFormValid, router]
  );

  return {
    email,
    password,
    isLoading,
    error,
    passwordValidation,
    isPasswordValid,
    isFormValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
