import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/constants';

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}
