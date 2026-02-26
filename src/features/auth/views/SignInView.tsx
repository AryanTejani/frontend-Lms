import Link from 'next/link';
import { paths } from '@/config';
import { AuthHeader } from '../client/components/AuthHeader';
import { SignInForm } from '../client/components/SignInForm';

export function SignInView() {
  return (
    <>
      <AuthHeader showSignUp />
      <div className="flex-1 flex flex-col items-center justify-center px-(--size-6xl) py-(--space-lg)">
        <div className="w-full max-w-(--card-width-md) flex flex-col items-center gap-(--space-lg)">
          <div className="w-full bg-(--color-bg-primary) rounded-card shadow-md p-(--space-2xl)">
            <div className="flex flex-col items-center mb-(--space-lg)">
              <h5 className="h5-semibold text-(--color-text-primary) text-center">
                Sign in to TraderLion
              </h5>
            </div>

            <SignInForm />
          </div>

          <p className="label-1-regular text-(--color-text-secondary) text-center m-0">
            Don&apos;t have an account?{' '}
            <Link
              href={paths.auth.signUp}
              className="label-1-medium text-(--color-text-link) no-underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
