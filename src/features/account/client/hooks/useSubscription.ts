'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSubscription } from '../api';
import { mapSubscription } from '../mappers';
import { accountKeys } from './useAccountProfile';

export function useSubscription() {
  return useQuery({
    queryKey: accountKeys.subscription,
    queryFn: fetchSubscription,
    select: (d) => {
      if (!d.subscription) {
        return null;
      }

      return { ...mapSubscription(d.subscription), has_active: d.has_active_subscription };
    },
  });
}
