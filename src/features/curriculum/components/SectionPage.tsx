import React, { useEffect, useCallback } from 'react';
import styles from '../styles/sectionPage.module.css';
import { useNavigation } from '@/context/NavigationContext';
import { useCourseProgress, SECTIONS_ORDER } from '@/context/CourseProgressContext';
import { useCurriculumSection } from '../hooks/useCurriculum';
import QuizContainer from '@/features/quiz/components/QuizContainer';
import ExerciseContainer from '@/features/exercise/components/ExerciseContainer';

interface SectionPageProps {
  sectionId: string;
}

export const SectionPage: React.FC<SectionPageProps> = ({ sectionId }) => {
  const { navigate } = useNavigation();
  const { 
    progress, 
    isSectionUnlocked, 
    completeSection, 
    submitQuizScore, 
    submitExerciseResponse,
    markCourseFinished
  } = useCourseProgress();

  // Redirect if locked
  useEffect(() => {
    if (!isSectionUnlocked(sectionId)) {
      alert('This section is locked! Redirecting to dashboard.');
      navigate('/');
    }
  }, [sectionId, isSectionUnlocked, navigate]);

  // Suspense-first data query
  const { data: section } = useCurriculumSection(sectionId);

  // If section does not exist, return null
  if (!section) return null;

  const initialScore = progress.quizScores[sectionId];
  const initialSubmission = progress.exerciseSubmissions[sectionId];

  const isQuizSubmitted = initialScore !== undefined;
  const isExerciseSubmitted = initialSubmission !== undefined;
  const isSectionComplete = isQuizSubmitted && isExerciseSubmitted;

  // Complete section when both items are done
  useEffect(() => {
    if (isSectionComplete) {
      completeSection(sectionId);
    }
  }, [isSectionComplete, sectionId]);

  const handleNextSection = useCallback((e: React.MouseEvent) => {
    if (!isSectionComplete) {
      e.preventDefault();
      return;
    }

    if (sectionId === 'section-5') {
      markCourseFinished();
      navigate('/?completed=true');
    } else {
      const currentIndex = SECTIONS_ORDER.indexOf(sectionId);
      const nextSectionId = SECTIONS_ORDER[currentIndex + 1];
      navigate(`/${nextSectionId}`);
    }
  }, [isSectionComplete, sectionId, markCourseFinished, navigate]);

  const getProgressPercentage = useCallback(() => {
    const index = SECTIONS_ORDER.indexOf(sectionId);
    return Math.round(((index + 1) / SECTIONS_ORDER.length) * 100);
  }, [sectionId]);

  const handleSubmitScore = useCallback((secId: string, score: number) => {
    submitQuizScore(secId, score);
  }, [submitQuizScore]);

  const handleSubmitResponse = useCallback((secId: string, text: string) => {
    submitExerciseResponse(secId, text);
  }, [submitExerciseResponse]);

  return (
    <div className={styles.container}>
      
      {/* Section Header */}
      <section className={styles.header}>
        <div className={styles.headerRow}>
          <span className={styles.moduleNumber}>{section.number}</span>
          <h1 className={styles.title}>{section.title}</h1>
        </div>
        <div className={styles.overviewBox}>
          <p className={styles.overviewText}>{section.overview}</p>
        </div>
      </section>

      {/* Core Resources list */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h4 className={styles.sectionTitle}>Learning Materials</h4>
        <div className={styles.resourcesList}>
          {section.resources.map((res, index) => (
            <a 
              key={index} 
              href={res.url} 
              target="_blank" 
              rel="noreferrer" 
              className={styles.resourceItem}
            >
              <div className={styles.resourceMeta}>
                <span className="material-symbols-outlined text-indigo-500" style={{ fontSize: '1.75rem' }}>
                  {res.type === 'Certification' ? 'workspace_premium' : 'play_circle'}
                </span>
                <div className={styles.resourceText}>
                  <span className={styles.resourceTitle}>{res.title}</span>
                  <span className={styles.resourceType}>{res.type} • External resource</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
            </a>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section>
        <QuizContainer
          quiz={section.quiz}
          sectionId={sectionId}
          initialScore={initialScore}
          onSubmitScore={handleSubmitScore}
        />
      </section>

      {/* Exercise Section */}
      <section>
        <ExerciseContainer
          exercise={section.exercise}
          sectionId={sectionId}
          initialResponse={initialSubmission}
          onSubmitResponse={handleSubmitResponse}
        />
      </section>

      {/* Progress Footer */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBarTrack}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${getProgressPercentage()}%` }} 
          />
        </div>
        <span className={styles.progressText}>
          Module {SECTIONS_ORDER.indexOf(sectionId) + 1} of {SECTIONS_ORDER.length} ({getProgressPercentage()}%)
        </span>
      </div>

      {/* Fixed bottom navigation bar */}
      <footer className={styles.bottomBar}>
        <div className={styles.bottomBarContent}>
          <button onClick={() => navigate('/')} className={styles.bottomLink}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className={styles.bottomText}>Dashboard</span>
          </button>
          
          <button
            onClick={handleNextSection}
            disabled={!isSectionComplete}
            className={`${styles.nextBtn} ${!isSectionComplete ? styles.nextBtnDisabled : ''}`}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {sectionId === 'section-5' ? 'Finish Course' : 'Next Section'}
            </span>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
              {sectionId === 'section-5' ? 'celebration' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </footer>

    </div>
  );
};

export default SectionPage;
