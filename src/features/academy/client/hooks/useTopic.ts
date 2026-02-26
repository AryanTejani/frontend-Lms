'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTopic } from '../api';

export function useTopic(courseSlug: string, topicId: string) {
  return useQuery({
    queryKey: ['courses', courseSlug, 'topics', topicId],
    queryFn: () => fetchTopic(courseSlug, topicId),
    enabled: !!courseSlug && !!topicId,
  });
}
