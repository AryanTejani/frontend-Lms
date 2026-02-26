'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@/config';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const success = searchParams.get('success') === 'true';
    const isNewUser = searchParams.get('isNewUser') === 'true';
    const errorMessage = searchParams.get('error');

    if (!success) {
      setError(errorMessage ?? 'Authentication failed');
      setTimeout(() => router.push(paths.auth.signIn), 3000);
      return;
    }

    // Cookie is already set by the backend, just redirect
    if (isNewUser) {
      router.push('/payment');
    } else {
      router.push(paths.dashboard);
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-gray-500">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-gray-600">Completing authentication...</p>
    </div>
  );
}
