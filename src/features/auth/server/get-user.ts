'use server';

import { getSession } from './get-session';
import { serverFetch } from '@/lib/fetch.server';
import type { User } from '../types';

interface GetUserResponse {
  user: User & { name?: string };
}

export async function getUser(): Promise<(User & { name?: string }) | null> {
  const session = await getSession();
  if (!session) return null;

  try {
    const response = await serverFetch<GetUserResponse>('/auth/me');
    return response.user;
  } catch {
    return null;
  }
}
