'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { paths } from '@/config';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg-primary) px-(--space-lg)">
      <div className="text-center max-w-md">
        <h1 className="h3-bold text-(--color-text-primary) mb-(--space-base)">
          Something went wrong
        </h1>
        <p className="body-2-regular text-(--color-text-secondary) mb-(--space-lg)">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex items-center justify-center gap-(--space-sm)">
          <button
            onClick={reset}
            className="label-2-semibold px-(--space-lg) py-(--space-sm) bg-action-primary rounded-full text-(--color-text-inverse) border-none cursor-pointer transition-colors hover:bg-action-hover"
          >
            Try Again
          </button>
          <Link
            href={paths.dashboard}
            className="label-2-semibold px-(--space-lg) py-(--space-sm) bg-(--color-bg-secondary) rounded-full text-(--color-text-primary) no-underline transition-colors hover:bg-(--color-bg-tertiary)"
          >
            Go to Dashboard
          </Link>
        </div>
        {error.digest && (
          <p className="body-4-regular text-(--color-text-tertiary) mt-(--space-lg)">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
