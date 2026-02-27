'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useResetPasswordForm } from '../hooks';
import { PasswordInput } from './PasswordInput';
import { PasswordChecklist } from './PasswordChecklist';
import { paths } from '@/config';

export function ResetPasswordForm() {
  const t = useTranslations('auth');
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
          {t('requestNewResetLink')}
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-(--space-base) w-full">
        <div className="body-3-regular p-(--space-base) bg-(--color-bg-success) border border-(--color-stroke-success) rounded-lg text-(--color-text-success)">
          {t('passwordResetSuccess')}
        </div>

        <Link
          href={paths.auth.signIn}
          className="label-2-medium text-(--color-text-link) no-underline text-center"
        >
          {t('goToSignIn')}
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
        label={t('newPassword')}
        placeholder={t('enterNewPassword')}
        disabled={isLoading}
      />

      <PasswordChecklist validation={passwordValidation} />

      <PasswordInput
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        label={t('confirmPassword')}
        placeholder={t('confirmNewPassword')}
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
          ? t('resetting')
          : retryAfter > 0
            ? t('tryAgainIn', { seconds: retryAfter })
            : t('resetPassword')}
      </button>

      <Link
        href={paths.auth.signIn}
        className="label-2-medium text-(--color-text-link) no-underline text-center"
      >
        {t('backToSignIn')}
      </Link>
    </form>
  );
}
