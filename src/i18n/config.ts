export const locales = ['en', 'hi', 'ta', 'te', 'mr', 'kn', 'bn'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function getLocale(): Locale {
  if (typeof document === 'undefined') return defaultLocale;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE_NAME}=([^;]*)`));
  return (match?.[1] as Locale) ?? defaultLocale;
}
