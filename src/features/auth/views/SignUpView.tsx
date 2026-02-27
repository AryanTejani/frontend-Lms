'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { paths } from '@/config';
import { AuthHeader } from '../client/components/AuthHeader';
import { SignUpForm } from '../client/components/SignUpForm';

export function SignUpView() {
  const t = useTranslations('auth');
  return (
    <>
      <AuthHeader showSignIn />
      <div className="flex-1 flex flex-col items-center justify-center px-(--size-6xl) py-(--space-lg)">
        <div className="w-full max-w-(--card-width-md) flex flex-col items-center gap-(--space-lg)">
          <div className="w-full bg-(--color-bg-primary) rounded-card shadow-md p-(--space-2xl)">
            <div className="flex flex-col items-center mb-(--space-lg)">
              <h4 className="font-semibold text-(--color-text-primary) text-center">
                {t('createAccount')}
              </h4>
            </div>

            <SignUpForm />
          </div>

          <p className="body-3-regular text-(--color-text-secondary) text-center m-0">
            {t('alreadyHaveAccount')}{' '}
            <Link
              href={paths.auth.signIn}
              className="label-2-medium text-(--color-text-link) no-underline"
            >
              {t('signIn')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
