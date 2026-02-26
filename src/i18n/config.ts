export const locales = ['en', 'hi', 'ta', 'te', 'mr', 'kn', 'bn'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
