import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/quiz.module.css';
import type { Quiz } from '@/features/curriculum/types';

interface QuizContainerProps {
  quiz: Quiz;
  sectionId: string;
  initialScore?: number;
  onSubmitScore: (sectionId: string, score: number) => void;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
  quiz,
  sectionId,
  initialScore,
  onSubmitScore
}) => {
  const isCompleted = initialScore !== undefined;

  // Selected option indices mapping: { [questionIndex]: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(isCompleted);
  const [score, setScore] = useState<number>(initialScore || 0);

  // Sync state with section changes
  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitted(isCompleted);
    setScore(initialScore || 0);
  }, [sectionId, initialScore, isCompleted]);

  const handleOptionSelect = useCallback((qIndex: number, oIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: oIndex
    }));
  }, [isSubmitted]);

  const handleSubmit = useCallback(() => {
    let unanswered = false;
    let computedScore = 0;

    quiz.questions.forEach((q, qIndex) => {
      const selected = selectedAnswers[qIndex];
      if (selected === undefined) {
        unanswered = true;
      } else if (selected === q.answer) {
        computedScore++;
      }
    });

    if (unanswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setScore(computedScore);
    setIsSubmitted(true);
    onSubmitScore(sectionId, computedScore);
  }, [quiz.questions, selectedAnswers, sectionId, onSubmitScore]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <span className={styles.tag}>Assessment</span>
          <h3 className={styles.title}>{quiz.title}</h3>
        </div>
        <span className={`material-symbols-outlined ${styles.icon}`}>quiz</span>
      </div>
      <p className={styles.description}>{quiz.instructions}</p>

      <div className={styles.box}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {quiz.questions.map((q, qIndex) => {
            const userSelection = selectedAnswers[qIndex];
            const isQuestionCompleted = isSubmitted;

            return (
              <div key={qIndex} className={styles.question}>
                <span className={styles.questionText}>
                  {qIndex + 1}. {q.question}
                </span>

                <div className={styles.optionsList}>
                  {q.options.map((opt, oIndex) => {
                    const isSelected = userSelection === oIndex || (isQuestionCompleted && quiz.questions[qIndex].answer === oIndex);
                    const isUserChoice = userSelection === oIndex;
                    const isCorrect = q.answer === oIndex;

                    let labelStyle = styles.optionLabel;

                    if (isQuestionCompleted) {
                      if (isCorrect) {
                        labelStyle += ` ${styles.optionLabelCorrect}`;
                      } else if (isUserChoice) {
                        labelStyle += ` ${styles.optionLabelIncorrect}`;
                      } else {
                        labelStyle += ` ${styles.optionLabelDisabled}`;
                      }
                    } else if (isUserChoice) {
                      labelStyle += ` ${styles.optionLabelSelected}`;
                    }

                    return (
                      <label
                        key={oIndex}
                        className={labelStyle}
                        onClick={() => handleOptionSelect(qIndex, oIndex)}
                      >
                        <input
                          type="radio"
                          name={`q-${sectionId}-${qIndex}`}
                          value={oIndex}
                          checked={isUserChoice || (isQuestionCompleted && isCorrect)}
                          disabled={isQuestionCompleted}
                          className={styles.radioInput}
                          onChange={() => {}} // Controlled by label click handler
                        />
                        <span style={{ fontSize: '0.9375rem', lineHeight: 1.4 }}>{opt}</span>

                        {/* Visual Indicators on submitted */}
                        {isQuestionCompleted && isCorrect && (
                          <span className="material-symbols-outlined text-green-600" style={{ marginLeft: 'auto', fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                        )}
                        {isQuestionCompleted && isUserChoice && !isCorrect && (
                          <span className="material-symbols-outlined text-red-600" style={{ marginLeft: 'auto', fontVariationSettings: "'FILL' 1" }}>
                            cancel
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {isQuestionCompleted && q.explanation && (
                  <p className={styles.explanationText}>
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!isSubmitted ? (
          <button onClick={handleSubmit} className={styles.submitBtn} style={{ marginTop: '2rem' }}>
            Submit Answers
          </button>
        ) : (
          <div className={styles.resultsPanel}>
            <span className={`material-symbols-outlined ${styles.resultsIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Quiz Finished! Your Score:
            </span>
            <div className={styles.resultsScore}>
              {score} / {quiz.questions.length}
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {score >= 3 
                ? '✨ Passed! You have a solid understanding of these concepts.' 
                : '📚 Completed. We recommend reviewing the videos to reinforce details.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
