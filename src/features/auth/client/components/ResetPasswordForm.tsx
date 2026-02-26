'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useResetPasswordForm } from '../hooks';
import { PasswordInput } from './PasswordInput';
import { PasswordChecklist } from './PasswordChecklist';
import { paths } from '@/config';

export function ResetPasswordForm() {
  const {
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
  } = useResetPasswordForm();

  if (tokenError) {
    return (
      <div className="flex flex-col gap-(--space-base) w-full">
        <div className="body-3-regular p-(--space-base) bg-(--color-bg-error) border border-(--color-stroke-error) rounded-lg text-(--color-text-error)">
          {tokenError}
        </div>

        <Link
          href={paths.auth.forgotPassword}
          className="label-2-medium text-(--color-text-link) no-underline text-center"
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-(--space-base) w-full">
        <div className="body-3-regular p-(--space-base) bg-(--color-bg-success) border border-(--color-stroke-success) rounded-lg text-(--color-text-success)">
          Your password has been reset successfully. Redirecting to sign in...
        </div>

        <Link
          href={paths.auth.signIn}
          className="label-2-medium text-(--color-text-link) no-underline text-center"
        >
          Go to Sign In
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
        </div>
      )}

      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        label="New Password"
        placeholder="Enter new password"
        disabled={isLoading}
      />

      <PasswordChecklist validation={passwordValidation} />

      <PasswordInput
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        label="Confirm Password"
        placeholder="Confirm new password"
        disabled={isLoading}
      />

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
          ? 'Resetting...'
          : retryAfter > 0
            ? `Try again in ${String(retryAfter)}s`
            : 'Reset Password'}
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
