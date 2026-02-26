'use client';

import { useState, useCallback } from 'react';
import { createCourseCheckoutSession } from '../api';

export function useCourseCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = useCallback(async (productId: string, promotionCode?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { checkout_url } = await createCourseCheckoutSession(productId, promotionCode);
      window.location.href = checkout_url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start checkout';
      setError(message);
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, handlePurchase };
}
