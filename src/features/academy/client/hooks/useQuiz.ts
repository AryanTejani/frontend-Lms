'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchQuiz } from '../api';

export function useQuiz(courseSlug: string, quizId: string) {
  return useQuery({
    queryKey: ['courses', courseSlug, 'quizzes', quizId],
    queryFn: () => fetchQuiz(courseSlug, quizId),
    enabled: !!courseSlug && !!quizId,
  });
}
