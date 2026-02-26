'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useId } from 'react';
import { useSignInForm } from '../hooks';
import { AuthDivider } from './AuthDivider';
import { PasswordInput } from './PasswordInput';
import { SocialAuthButtons } from './SocialAuthButtons';
import { paths } from '@/config';

export function SignInForm() {
  const emailInputId = useId();
  const rememberMeId = useId();
  const {
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
  } = useSignInForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-(--space-base) w-full">
      {error && (
        <div className="body-3-regular p-(--space-sm) bg-(--color-bg-error) border border-(--color-stroke-error) rounded-lg text-(--color-text-error)">
          {error}
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
          className="label-1-regular w-full h-(--input-height) px-(--space-base) bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-lg text-(--color-text-primary) placeholder-default outline-none transition-[border-color] duration-200 focus:border-(--color-stroke-selection)"
        />
      </div>

      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        disabled={isLoading}
      />

      <div className="flex items-center justify-between py-(--space-xs2)">
        <label htmlFor={rememberMeId} className="flex items-center gap-(--space-xs) cursor-pointer">
          <input
            id={rememberMeId}
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => {
              handleRememberMeChange(e.target.checked);
            }}
            disabled={isLoading}
            className="size-[14px] rounded-md border border-(--color-stroke-primary) bg-(--color-bg-primary) cursor-pointer accent-(--color-action-primary)"
          />
          <span className="label-1-regular text-(--color-text-secondary)">Remember me</span>
        </label>

        <Link
          href={paths.auth.forgotPassword}
          className="label-1-regular text-(--color-text-link) no-underline hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={clsx(
          'label-2-semibold w-full h-(--button-height-lg) px-(--space-sm) rounded-full flex items-center justify-center gap-(--space-xs) text-(--color-text-inverse) border-none transition-colors',
          isFormValid && !isLoading
            ? 'bg-action-primary hover:bg-action-hover cursor-pointer'
            : 'bg-action-disabled cursor-not-allowed'
        )}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <AuthDivider text="Or Sign in with" />

      <SocialAuthButtons />
    </form>
  );
}
