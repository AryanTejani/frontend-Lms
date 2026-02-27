'use client';

import { useTranslations } from 'next-intl';
import { AuthHeader } from '../client/components/AuthHeader';
import { ForgotPasswordForm } from '../client/components/ForgotPasswordForm';

export function ForgotPasswordView() {
  const t = useTranslations('auth');
  return (
    <>
      <AuthHeader showSignIn />
      <div className="flex-1 flex flex-col items-center justify-center px-(--size-6xl) py-(--space-lg)">
        <div className="w-full max-w-(--card-width-md) flex flex-col items-center gap-(--space-lg)">
          <div className="w-full bg-(--color-bg-primary) rounded-card shadow-md p-(--space-2xl)">
            <div className="flex flex-col items-center mb-(--space-lg)">
              <h5 className="h5-semibold text-(--color-text-primary) text-center">
                {t('resetYourPassword')}
              </h5>
              <p className="body-3-regular text-(--color-text-secondary) text-center mt-(--space-xs)">
                {t('enterResetEmailDesc')}
              </p>
            </div>

            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
