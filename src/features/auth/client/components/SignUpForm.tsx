'use client';

import clsx from 'clsx';
import { useId } from 'react';
import { useSignUpForm } from '../hooks';
import { AuthDivider } from './AuthDivider';
import { PasswordChecklist } from './PasswordChecklist';
import { PasswordInput } from './PasswordInput';
import { SocialAuthButtons } from './SocialAuthButtons';

export function SignUpForm() {
  const emailInputId = useId();
  const {
    email,
    password,
    isLoading,
    error,
    passwordValidation,
    isFormValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useSignUpForm();

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
          suppressHydrationWarning
          className="body-3-regular w-full h-(--input-height) px-(--space-base) bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-lg text-(--color-text-primary) outline-none transition-[border-color] duration-200 focus:border-(--color-stroke-selection)"
        />
      </div>

      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        placeholder="Create a password"
        disabled={isLoading}
      />

      <PasswordChecklist validation={passwordValidation} />

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={clsx(
          'label-2-semibold w-full h-(--button-height-lg) px-(--space-sm) rounded-full',
          'flex items-center justify-center gap-(--space-xs) text-(--color-text-inverse)',
          'border-none transition-colors',
          isFormValid && !isLoading
            ? 'bg-action-primary hover:bg-action-hover cursor-pointer'
            : 'bg-action-disabled cursor-not-allowed'
        )}
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>

      <AuthDivider text="Or Sign up with" />

      <SocialAuthButtons />
    </form>
  );
}
