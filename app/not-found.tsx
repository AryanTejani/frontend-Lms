import Link from 'next/link';
import { paths } from '@/config';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg-primary) px-(--space-lg)">
      <div className="text-center max-w-md">
        <h1 className="title-1-bold text-(--color-text-primary) mb-(--space-base)">404</h1>
        <h2 className="h4-semibold text-(--color-text-primary) mb-(--space-sm)">Page Not Found</h2>
        <p className="body-2-regular text-(--color-text-secondary) mb-(--space-lg)">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
          doesn&apos;t exist.
        </p>
        <div className="flex items-center justify-center gap-(--space-sm)">
          <Link
            href={paths.dashboard}
            className="label-2-semibold px-(--space-lg) py-(--space-sm) bg-action-primary rounded-full text-(--color-text-inverse) no-underline transition-colors hover:bg-action-hover"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
