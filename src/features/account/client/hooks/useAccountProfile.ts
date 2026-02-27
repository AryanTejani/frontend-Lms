'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api';
import { mapProfile } from '../mappers';

export const accountKeys = {
  profile: ['account', 'profile'] as const,
  subscription: ['account', 'subscription'] as const,
  orders: (page: number) => ['account', 'orders', page] as const,
  purchases: ['account', 'purchases'] as const,
};

export function useAccountProfile() {
  return useQuery({
    queryKey: accountKeys.profile,
    queryFn: fetchProfile,
    select: (d) => mapProfile(d.data),
  });
}
