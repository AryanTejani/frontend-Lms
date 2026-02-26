import api from '@/lib/fetch.client';
import type { PaginatedVideoResponse, VideosQueryParams } from '../../videos/types';

export async function fetchVideos(params: VideosQueryParams = {}): Promise<PaginatedVideoResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.category_id) searchParams.set('category_id', params.category_id);

  const query = searchParams.toString();
  const response = await api.get<PaginatedVideoResponse>(`/videos${query ? `?${query}` : ''}`);
  return response.data;
}
