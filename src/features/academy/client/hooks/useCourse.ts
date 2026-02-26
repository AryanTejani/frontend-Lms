'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCourse } from '../api';

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ['courses', slug],
    queryFn: () => fetchCourse(slug),
    enabled: !!slug,
  });
}
