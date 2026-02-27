'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../api';

export function useCourses(language?: string) {
  return useQuery({
    queryKey: ['courses', language],
    queryFn: () => fetchCourses(language),
  });
}
