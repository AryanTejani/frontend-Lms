'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../api';
import { mapVideoRecordToVideo } from '../mappers';
import type { Video } from '../../types';

interface UseVideosResult {
  videos: Video[];
  total: number;
  page: number;
  limit: number;
}

export function useVideos(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['videos', { page, limit }],
    queryFn: async (): Promise<UseVideosResult> => {
      const response = await fetchVideos({ page, limit });
      return {
        videos: response.data.map(mapVideoRecordToVideo),
        total: response.total,
        page: response.page,
        limit: response.limit,
      };
    },
  });
}
