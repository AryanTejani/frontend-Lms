import { Logo } from './Logo';
import { logoutAction } from '@/features/auth/server';
import type { User } from '@/features/auth/types';

interface DashboardHeaderProps {
  user: (User & { name?: string }) | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-(--color-bg-tertiary) bg-(--color-bg-primary)">
      <div className="flex items-center justify-between h-full px-(--space-lg)">
        <Logo showText={false} />

        <div className="flex items-center gap-(--space-base)">
          {user && (
            <span className="label-2-regular text-(--color-text-secondary)">
              {user.name || user.email}
            </span>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="label-2-semibold flex items-center justify-center h-(--button-height-sm) px-(--space-base) bg-transparent border border-(--color-bg-tertiary) rounded-full text-(--color-text-primary) cursor-pointer transition-colors hover:bg-(--color-bg-secondary)"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
