import { cookies } from 'next/headers';
import { Sidebar } from '@/components/layout';
import { LOCALE_COOKIE_NAME, defaultLocale, locales } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sidebarExpanded = cookieStore.get('sidebar-expanded')?.value === 'true';
  const rawLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const initialLocale: Locale =
    rawLocale && (locales as readonly string[]).includes(rawLocale)
      ? (rawLocale as Locale)
      : defaultLocale;

  return (
    <div className="min-h-screen flex">
      <Sidebar defaultExpanded={sidebarExpanded} initialLocale={initialLocale} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
