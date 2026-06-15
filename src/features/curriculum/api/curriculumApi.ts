import { SECTIONS_DATA } from '@/data/sectionsData';
import type { Section } from '../types';

// Simulate network latency (e.g., 400ms) for realistic Suspense testing
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const curriculumApi = {
  async getSections(): Promise<Section[]> {
    await delay(350);
    return Object.values(SECTIONS_DATA);
  },

  async getSection(id: string): Promise<Section | undefined> {
    await delay(250);
    return SECTIONS_DATA[id];
  }
};
