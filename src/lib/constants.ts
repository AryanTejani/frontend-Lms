export const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password'] as const;
export const PROTECTED_ROUTES = ['/dashboard', '/checkout', '/payment'] as const;

export const SESSION_COOKIE_NAME = 'session_id' as const;

export const API_TIMEOUT = 10000;
