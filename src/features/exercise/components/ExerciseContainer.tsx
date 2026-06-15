import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/exercise.module.css';
import type { Exercise } from '@/features/curriculum/types';

interface ExerciseContainerProps {
  exercise: Exercise;
  sectionId: string;
  initialResponse?: string;
  onSubmitResponse: (sectionId: string, text: string) => void;
}

export const ExerciseContainer: React.FC<ExerciseContainerProps> = ({
  exercise,
  sectionId,
  initialResponse,
  onSubmitResponse
}) => {
  const isCompleted = initialResponse !== undefined;

  const [exerciseText, setExerciseText] = useState<string>(initialResponse || '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(isCompleted);

  // Sync state with section changes
  useEffect(() => {
    setExerciseText(initialResponse || '');
    setIsSubmitted(isCompleted);
  }, [sectionId, initialResponse, isCompleted]);

  const handleSubmit = useCallback(() => {
    if (!exerciseText.trim()) {
      alert('Please write down your response before submitting.');
      return;
    }
    setIsSubmitted(true);
    onSubmitResponse(sectionId, exerciseText);
  }, [exerciseText, sectionId, onSubmitResponse]);

  return (
    <div className={styles.panel}>
      {/* Background visual overlay for Section 5 (AI topic) */}
      {sectionId === 'section-5' && (
        <div className={styles.neuralOverlay} />
      )}

      <div className={styles.header}>
        <div>
          <span className={styles.tag}>Practice Activity</span>
          <h3 className={styles.title}>{exercise.title}</h3>
        </div>
        <span className={`material-symbols-outlined ${styles.icon}`}>
          {sectionId === 'section-5' ? 'terminal' : 'edit_note'}
        </span>
      </div>
      <p className={styles.description}>{exercise.instructions}</p>

      {!isSubmitted ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="Write your response, findings, or content ideas here..."
            value={exerciseText}
            onChange={(e) => setExerciseText(e.target.value)}
          />
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit Work
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className={styles.submissionBox}>
            <h5 className={styles.submissionTitle}>Your Submission</h5>
            <p className={styles.submissionText}>"{exerciseText}"</p>
          </div>

          <div className={styles.modelAnswerBox}>
            <h5 className={styles.modelAnswerTitle}>
              <span className="material-symbols-outlined font-bold" style={{ fontSize: '1.15rem' }}>
                lightbulb
              </span>
              Model Answer / Explanation
            </h5>
            <div
              className={styles.modelAnswerText}
              dangerouslySetInnerHTML={{ __html: exercise.modelAnswer }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseContainer;
