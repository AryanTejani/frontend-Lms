import { cookies } from 'next/headers';
import { env } from '@/config';

interface FetchOptions {
  tags?: string[];
  revalidate?: number | false;
  cache?: RequestCache;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function serverFetch<T>(
  endpoint: string,
  options?: FetchOptions & RequestInit
): Promise<T> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  const { tags, revalidate, cache, ...fetchOptions } = options ?? {};

  const response = await fetch(`${env.API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
      ...fetchOptions.headers,
    },
    next: {
      ...(tags && { tags }),
      ...(revalidate !== undefined && { revalidate }),
    },
    ...(cache && { cache }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      error?: { message?: string; code?: string };
    };
    throw new ApiError(
      errorData.error?.message ?? 'An error occurred',
      response.status,
      errorData.error?.code
    );
  }

  return response.json() as Promise<T>;
}

export async function serverPost<T, D = unknown>(
  endpoint: string,
  data: D,
  options?: FetchOptions
): Promise<T> {
  return serverFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}

export async function serverPut<T, D = unknown>(
  endpoint: string,
  data: D,
  options?: FetchOptions
): Promise<T> {
  return serverFetch<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
}

export async function serverDelete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return serverFetch<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
}
