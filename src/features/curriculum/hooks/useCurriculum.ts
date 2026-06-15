import { useSuspenseQuery } from '@tanstack/react-query';
import { curriculumApi } from '../api/curriculumApi';
import type { Section } from '../types';

export function useCurriculumSections() {
  return useSuspenseQuery<Section[]>({
    queryKey: ['curriculum', 'sections'],
    queryFn: () => curriculumApi.getSections(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useCurriculumSection(id: string) {
  return useSuspenseQuery<Section | undefined>({
    queryKey: ['curriculum', 'section', id],
    queryFn: () => curriculumApi.getSection(id),
    staleTime: 1000 * 60 * 5,
  });
}
