import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseProgressContext = createContext(null);

const SECTIONS_ORDER = [
  'section-1',
  'section-2',
  'section-3',
  'section-4',
  'section-5'
];

const defaultState = {
  completedSections: [],
  quizScores: {},
  exerciseSubmissions: {},
  currentSection: 'section-1',
  isCourseFinished: false
};

// Isolated Storage Wrapper (so React Native can easily replace it with AsyncStorage)
const storage = {
  getItem: (key) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }
};

export function CourseProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const data = storage.getItem('dm_ai_progress');
    if (!data) return defaultState;
    try {
      return JSON.parse(data);
    } catch (e) {
      return defaultState;
    }
  });

  const [unlockAll, setUnlockAll] = useState(() => {
    return storage.getItem('dm_ai_unlock_all') === 'true';
  });

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    storage.setItem('dm_ai_progress', JSON.stringify(newProgress));
  };

  const isSectionUnlocked = (sectionId) => {
    if (unlockAll) return true;
    
    const index = SECTIONS_ORDER.indexOf(sectionId);
    if (index === 0) return true; // First section is always unlocked

    const prevSectionId = SECTIONS_ORDER[index - 1];
    return progress.completedSections.includes(prevSectionId);
  };

  const completeSection = (sectionId) => {
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

  const submitQuizScore = (sectionId, score) => {
    const newScores = { ...progress.quizScores, [sectionId]: score };
    saveProgress({
      ...progress,
      quizScores: newScores
    });
  };

  const submitExerciseResponse = (sectionId, response) => {
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

  const value = {
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
export { SECTIONS_ORDER };
