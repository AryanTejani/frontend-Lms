'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthHeader } from '../client/components/AuthHeader';
import { paths } from '@/config';

export function ResetPasswordRequiredView() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const forgotPasswordUrl = email
    ? `${paths.auth.forgotPassword}?email=${encodeURIComponent(email)}`
    : paths.auth.forgotPassword;

  return (
    <>
      <AuthHeader showSignIn />
      <div className="flex-1 flex flex-col items-center justify-center px-(--size-6xl) py-(--space-lg)">
        <div className="w-full max-w-(--card-width-md) flex flex-col items-center gap-(--space-lg)">
          <div className="w-full bg-(--color-bg-primary) rounded-card shadow-md p-(--space-2xl)">
            <div className="flex flex-col items-center mb-(--space-lg)">
              <h5 className="h5-semibold text-(--color-text-primary) text-center">
                Password Reset Required
              </h5>
              <p className="body-3-regular text-(--color-text-secondary) text-center mt-(--space-xs)">
                Your account has been migrated and requires a password reset before you can sign in.
                Please reset your password to continue.
              </p>
            </div>

            <Link
              href={forgotPasswordUrl}
              className="label-2-semibold flex items-center justify-center w-full h-(--button-height-md) bg-action-primary cursor-pointer rounded-full text-(--color-text-inverse) no-underline transition-colors hover:bg-action-hover"
            >
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
