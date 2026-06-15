import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProgressState {
  completedSections: string[];
  quizScores: Record<string, number>;
  exerciseSubmissions: Record<string, string>;
  currentSection: string;
  isCourseFinished: boolean;
}

export interface CourseProgressContextType {
  progress: ProgressState;
  unlockAll: boolean;
  isSectionUnlocked: (sectionId: string) => boolean;
  completeSection: (sectionId: string) => void;
  submitQuizScore: (sectionId: string, score: number) => void;
  submitExerciseResponse: (sectionId: string, response: string) => void;
  markCourseFinished: () => void;
  resetProgress: () => void;
  toggleUnlockAll: () => void;
}

const CourseProgressContext = createContext<CourseProgressContextType | null>(null);

export const SECTIONS_ORDER = [
  'section-1',
  'section-2',
  'section-3',
  'section-4',
  'section-5'
];

const defaultState: ProgressState = {
  completedSections: [],
  quizScores: {},
  exerciseSubmissions: {},
  currentSection: 'section-1',
  isCourseFinished: false
};

const storage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }
};

interface CourseProgressProviderProps {
  children: ReactNode;
}

export function CourseProgressProvider({ children }: CourseProgressProviderProps) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const data = storage.getItem('dm_ai_progress');
    if (!data) return defaultState;
    try {
      return JSON.parse(data) as ProgressState;
    } catch (e) {
      return defaultState;
    }
  });

  const [unlockAll, setUnlockAll] = useState<boolean>(() => {
    return storage.getItem('dm_ai_unlock_all') === 'true';
  });

  const saveProgress = (newProgress: ProgressState) => {
    setProgress(newProgress);
    storage.setItem('dm_ai_progress', JSON.stringify(newProgress));
  };

  const isSectionUnlocked = (sectionId: string): boolean => {
    if (unlockAll) return true;
    
    const index = SECTIONS_ORDER.indexOf(sectionId);
    if (index === 0) return true;

    const prevSectionId = SECTIONS_ORDER[index - 1];
    return progress.completedSections.includes(prevSectionId);
  };

  const completeSection = (sectionId: string) => {
    const newCompleted = [...progress.completedSections];
    if (!newCompleted.includes(sectionId)) {
      newCompleted.push(sectionId);
    }

    const currentIndex = SECTIONS_ORDER.indexOf(sectionId);
    let nextSection = progress.currentSection;
    if (currentIndex < SECTIONS_ORDER.length - 1) {
      nextSection = SECTIONS_ORDER[currentIndex + 1];
    }

    saveProgress({
      ...progress,
      completedSections: newCompleted,
      currentSection: nextSection
    });
  };

  const submitQuizScore = (sectionId: string, score: number) => {
    const newScores = { ...progress.quizScores, [sectionId]: score };
    saveProgress({
      ...progress,
      quizScores: newScores
    });
  };

  const submitExerciseResponse = (sectionId: string, response: string) => {
    const newSubmissions = { ...progress.exerciseSubmissions, [sectionId]: response };
    saveProgress({
      ...progress,
      exerciseSubmissions: newSubmissions
    });
  };

  const markCourseFinished = () => {
    saveProgress({
      ...progress,
      isCourseFinished: true
    });
  };

  const resetProgress = () => {
    if (typeof window !== 'undefined' && window.confirm && !window.confirm('Are you sure you want to reset your progress and restart the course?')) {
      return;
    }
    saveProgress(defaultState);
    storage.removeItem('dm_ai_progress');
  };

  const toggleUnlockAll = () => {
    const target = !unlockAll;
    setUnlockAll(target);
    storage.setItem('dm_ai_unlock_all', String(target));
  };

  const value: CourseProgressContextType = {
    progress,
    unlockAll,
    isSectionUnlocked,
    completeSection,
    submitQuizScore,
    submitExerciseResponse,
    markCourseFinished,
    resetProgress,
    toggleUnlockAll
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
}
