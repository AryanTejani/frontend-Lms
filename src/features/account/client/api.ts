import api from '@/lib/fetch.client';
import type {
  AccountProfileResponse,
  AccountSubscriptionResponse,
  OrdersResponse,
  PurchaseRecord,
} from '../types';

export const fetchProfile = (): Promise<AccountProfileResponse> =>
  api.get<AccountProfileResponse>('/account/profile').then((r) => r.data);

export const updateProfile = (data: {
  first_name?: string;
  last_name?: string;
}): Promise<{ success: boolean }> =>
  api.patch<{ success: boolean }>('/account/profile', data).then((r) => r.data);

export const fetchSubscription = (): Promise<AccountSubscriptionResponse> =>
  api.get<AccountSubscriptionResponse>('/account/subscription').then((r) => r.data);

export const fetchOrders = (page = 1): Promise<OrdersResponse> =>
  api.get<OrdersResponse>('/account/orders', { params: { page, limit: 20 } }).then((r) => r.data);

export const fetchPurchases = (): Promise<PurchaseRecord[]> =>
  api.get<{ data: PurchaseRecord[] }>('/account/purchases').then((r) => r.data.data);

export const requestRefund = (payload: {
  order_id: string;
  reason?: string;
}): Promise<{ success: boolean }> =>
  api.post<{ success: boolean }>('/account/refund', payload).then((r) => r.data);

export const changePassword = (data: {
  current_password: string;
  new_password: string;
}): Promise<{ success: boolean }> =>
  api.post<{ success: boolean }>('/account/change-password', data).then((r) => r.data);

export const uploadAvatar = (file: File): Promise<{ avatar_url: string }> => {
  const form = new FormData();
  form.append('file', file);

  return api
    .post<{
      avatar_url: string;
    }>('/account/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);
};

export const removeAvatar = (): Promise<{ success: boolean }> =>
  api.delete<{ success: boolean }>('/account/avatar').then((r) => r.data);
