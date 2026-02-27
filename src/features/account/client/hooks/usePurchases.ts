'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPurchases } from '../api';
import { mapPurchasesToCourses } from '../mappers';
import { accountKeys } from './useAccountProfile';

export function usePurchases() {
  return useQuery({
    queryKey: accountKeys.purchases,
    queryFn: fetchPurchases,
    select: mapPurchasesToCourses,
  });
}
