import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/config';

interface AuthHeaderProps {
  showSignIn?: boolean;
  showSignUp?: boolean;
}

export function AuthHeader({ showSignIn = false, showSignUp = false }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full px-(--size-6xl) py-(--space-lg)">
      <Link href={paths.auth.signUp} className="flex items-center gap-(--space-xs) no-underline">
        <Image
          src="/logo.png"
          alt="TraderLion"
          width={48}
          height={48}
          className="size-logo object-contain"
          priority
        />
        <span className="h6-semibold text-(--color-text-primary)">TraderLion</span>
      </Link>

      {showSignIn && (
        <Link
          href={paths.auth.signIn}
          className="label-2-semibold flex items-center justify-center h-(--button-height-sm) px-(--space-sm) bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-full text-(--color-text-primary) no-underline transition-colors hover:bg-(--color-bg-secondary)"
        >
          Sign In
        </Link>
      )}

      {showSignUp && (
        <Link
          href={paths.auth.signUp}
          className="label-2-semibold flex items-center justify-center h-(--button-height-sm) px-(--space-sm) bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-full text-(--color-text-primary) no-underline transition-colors hover:bg-(--color-bg-secondary)"
        >
          Sign Up
        </Link>
      )}
    </header>
  );
}
