'use client';

import { Suspense } from 'react';
import { AuthHeader } from '../client/components/AuthHeader';
import { ResetPasswordForm } from '../client/components/ResetPasswordForm';

function ResetPasswordContent() {
  return (
    <>
      <AuthHeader showSignIn />
      <div className="flex-1 flex flex-col items-center justify-center px-(--size-6xl) py-(--space-lg)">
        <div className="w-full max-w-(--card-width-md) flex flex-col items-center gap-(--space-lg)">
          <div className="w-full bg-(--color-bg-primary) rounded-card shadow-md p-(--space-2xl)">
            <div className="flex flex-col items-center mb-(--space-lg)">
              <h5 className="h5-semibold text-(--color-text-primary) text-center">
                Create new password
              </h5>
              <p className="body-3-regular text-(--color-text-secondary) text-center mt-(--space-xs)">
                Enter your new password below.
              </p>
            </div>

            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}

export function ResetPasswordView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
