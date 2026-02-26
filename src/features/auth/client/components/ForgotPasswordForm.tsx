'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useId } from 'react';
import { useForgotPasswordForm } from '../hooks';
import { paths } from '@/config';

export function ForgotPasswordForm() {
  const emailInputId = useId();
  const {
    email,
    isLoading,
    error,
    errorCode,
    isSuccess,
    retryAfter,
    isFormValid,
    handleEmailChange,
    handleSubmit,
  } = useForgotPasswordForm();

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-(--space-base) w-full">
        <div className="body-3-regular p-(--space-base) bg-(--color-bg-success) border border-(--color-stroke-success) rounded-lg text-(--color-text-success)">
          Check your email for a link to reset your password. If it doesn&apos;t appear within a few
          minutes, check your spam folder.
        </div>

        <Link
          href={paths.auth.signIn}
          className="label-2-medium text-(--color-text-link) no-underline text-center"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  const isDisabled = !isFormValid || isLoading || retryAfter > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-(--space-base) w-full">
      {error && (
        <div className="body-3-regular p-(--space-sm) bg-(--color-bg-error) border border-(--color-stroke-error) rounded-lg text-(--color-text-error)">
          {error}
          {errorCode === 'ACCOUNT_NOT_FOUND' && (
            <Link
              href={paths.auth.signUp}
              className="label-2-medium text-(--color-text-link) no-underline block mt-(--space-xs)"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}

      <div className="flex flex-col gap-(--space-xs)">
        <label htmlFor={emailInputId} className="label-1-regular text-(--color-text-primary)">
          Email address
        </label>
        <input
          id={emailInputId}
          type="email"
          value={email}
          onChange={(e) => {
            handleEmailChange(e.target.value);
          }}
          placeholder="you@example.com"
          disabled={isLoading}
          className="body-3-regular w-full h-(--input-height) px-(--space-base) bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-lg text-(--color-text-primary) outline-none transition-[border-color] duration-200 focus:border-(--color-stroke-selection)"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className={clsx(
          'label-2-semibold w-full h-(--button-height-lg) px-(--space-sm) rounded-full flex items-center justify-center gap-(--space-xs) text-(--color-text-inverse) border-none transition-colors',
          !isDisabled
            ? 'bg-action-primary hover:bg-action-hover cursor-pointer'
            : 'bg-action-disabled cursor-not-allowed'
        )}
      >
        {isLoading
          ? 'Sending...'
          : retryAfter > 0
            ? `Try again in ${String(retryAfter)}s`
            : 'Send Reset Link'}
      </button>

      <Link
        href={paths.auth.signIn}
        className="label-2-medium text-(--color-text-link) no-underline text-center"
      >
        Back to Sign In
      </Link>
    </form>
  );
}
