'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchQuizzes } from '../api';

export function useQuizzes(courseSlug: string) {
  return useQuery({
    queryKey: ['courses', courseSlug, 'quizzes'],
    queryFn: () => fetchQuizzes(courseSlug),
    enabled: !!courseSlug,
  });
}
