import React, { useCallback, useMemo } from 'react';
import styles from '../styles/curriculum.module.css';
import { useNavigation } from '@/context/NavigationContext';
import { useCourseProgress, SECTIONS_ORDER } from '@/context/CourseProgressContext';
import { useCurriculumSections } from '../hooks/useCurriculum';
import RoadmapCard from './RoadmapCard';
import ToolGrid from './ToolGrid';

export const CurriculumOverview: React.FC = () => {
  const { navigate } = useNavigation();
  const { progress, isSectionUnlocked, resetProgress, toggleUnlockAll } = useCourseProgress();
  
  // Suspense-first data query
  const { data: sections } = useCurriculumSections();

  const completedCount = progress.completedSections.length;
  const isCourseFinished = progress.isCourseFinished || completedCount === sections.length;

  const handleCardClick = useCallback((id: string) => {
    if (!isSectionUnlocked(id)) {
      alert('This section is locked! Please complete the previous sections first.');
      return;
    }
    navigate(`/${id}`);
  }, [isSectionUnlocked, navigate]);

  // Calculate percentage height of the progressive progress line
  const progressLineHeight = useMemo(() => {
    const total = sections.length;
    if (completedCount === 0) return '0%';
    if (completedCount === total) return '100%';
    const percentage = ((completedCount - 0.5) / (total - 1)) * 100;
    return `${percentage}%`;
  }, [completedCount, sections.length]);

  return (
    <div className={styles.container}>
      
      {/* Completion Banner */}
      {isCourseFinished && (
        <div className={styles.completionBanner}>
          <span className="material-symbols-outlined className={styles.completionIcon}" style={{ fontSize: '3.5rem', display: 'block', marginBottom: '0.75rem' }}>
            workspace_premium
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Congratulations!
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            🎉 You have successfully navigated the entire Digital Marketing & AI roadmap. You can review any module at any time or restart to practice again.
          </p>
          <button 
            onClick={resetProgress} 
            className={styles.primaryBtn}
            style={{ margin: '0 auto', display: 'flex' }}
          >
            Restart Curriculum
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className={styles.headerSection}>
        <span className={styles.badgeHeader}>Curriculum Roadmap</span>
        <h2 className={styles.title}>Your Learning Path</h2>
        <p className={styles.subtitle}>
          Complete these 5 curriculum modules in chronological order to master marketing funnels, copywriting, and advanced AI prompting.
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className={styles.roadmap}>
        {/* Background Line */}
        <div className={styles.roadmapLine} />
        {/* Glowing Progress Line */}
        <div 
          className={styles.roadmapProgressLine} 
          style={{ height: progressLineHeight }} 
        />

        {sections.map((section, index) => {
          const isCompleted = progress.completedSections.includes(section.id);
          const isCurrent = progress.currentSection === section.id && !isCompleted;
          // First item is always unlocked
          const isLocked = index === 0 ? false : !isSectionUnlocked(section.id);

          return (
            <RoadmapCard
              key={section.id}
              section={section}
              index={index}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              isLocked={isLocked}
              onCardClick={handleCardClick}
            />
          );
        })}
      </div>

      {/* Resource Portal */}
      <ToolGrid />

      {/* Developer Bypass Utilities */}
      <div className={styles.footer}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
          Digital Marketing & AI Learning Portal — built with Vite, React Query, and CSS variables.
        </p>
        <button onClick={toggleUnlockAll} className={styles.devBtn}>
          🔧 DEV BYPASS: TOGGLE UNLOCK ALL SECTIONS
        </button>
      </div>

    </div>
  );
};

export default CurriculumOverview;
