'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api';
import { accountKeys } from './useAccountProfile';

export function useOrders(page = 1) {
  return useQuery({
    queryKey: accountKeys.orders(page),
    queryFn: () => fetchOrders(page),
  });
}
