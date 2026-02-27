'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestRefund } from '../api';

export function useRefundRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestRefund,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['account', 'orders'] });
    },
  });
}
