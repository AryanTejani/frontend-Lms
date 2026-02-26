import { LOCALE_COOKIE_NAME } from './config';
import type { Locale } from './config';

export function setLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  window.location.reload();
}
