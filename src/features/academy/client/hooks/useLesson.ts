'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLesson } from '../api';

export function useLesson(courseSlug: string, lessonId: string) {
  return useQuery({
    queryKey: ['courses', courseSlug, 'lessons', lessonId],
    queryFn: () => fetchLesson(courseSlug, lessonId),
    enabled: !!courseSlug && !!lessonId,
  });
}
