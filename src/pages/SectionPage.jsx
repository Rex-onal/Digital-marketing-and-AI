import React, { useState, useEffect } from 'react';
import styles from '../styles/section.module.css';
import View from '../components/ui/View';
import Text from '../components/ui/Text';
import TouchableOpacity from '../components/ui/TouchableOpacity';
import Animated from '../components/ui/Animated';
import { useNavigation } from '../context/NavigationContext';
import { useCourseProgress, SECTIONS_ORDER } from '../context/CourseProgressContext';
import { SECTIONS_DATA } from '../data/sectionsData';

export function SectionPage({ sectionId }) {
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

  const data = SECTIONS_DATA[sectionId];
  if (!data) return null;

  // Read previous states from progress context
  const initialScore = progress.quizScores[sectionId];
  const initialSubmission = progress.exerciseSubmissions[sectionId];

  // Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(initialScore !== undefined);
  const [quizScore, setQuizScore] = useState(initialScore || 0);

  // Exercise States
  const [exerciseText, setExerciseText] = useState(initialSubmission || '');
  const [isExerciseSubmitted, setIsExerciseSubmitted] = useState(initialSubmission !== undefined);

  // Reset page states when sectionId changes
  useEffect(() => {
    const prevScore = progress.quizScores[sectionId];
    const prevSub = progress.exerciseSubmissions[sectionId];

    setSelectedAnswers({});
    setIsQuizSubmitted(prevScore !== undefined);
    setQuizScore(prevScore || 0);
    setExerciseText(prevSub || '');
    setIsExerciseSubmitted(prevSub !== undefined);
  }, [sectionId, progress]);

  // Quiz Event handlers
  const handleOptionSelect = (qIndex, oIndex) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: oIndex
    });
  };

  const handleQuizSubmit = () => {
    const questions = data.quiz.questions;
    let unanswered = false;
    let score = 0;

    questions.forEach((q, qIndex) => {
      if (selectedAnswers[qIndex] === undefined) {
        unanswered = true;
      } else if (selectedAnswers[qIndex] === q.answer) {
        score++;
      }
    });

    if (unanswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setQuizScore(score);
    setIsQuizSubmitted(true);
    submitQuizScore(sectionId, score);
  };

  // Exercise Event handlers
  const handleExerciseSubmit = () => {
    if (!exerciseText.trim()) {
      alert('Please write down your response before submitting.');
      return;
    }
    setIsExerciseSubmitted(true);
    submitExerciseResponse(sectionId, exerciseText);
  };

  // Unlock check: both quiz and exercise must be completed
  const isSectionComplete = isQuizSubmitted && isExerciseSubmitted;

  // Complete section in progress context when complete
  useEffect(() => {
    if (isSectionComplete) {
      completeSection(sectionId);
    }
  }, [isSectionComplete, sectionId]);

  // Bottom Navigation helper
  const handleNextSection = (e) => {
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
  };

  const getProgressPercentage = () => {
    const index = SECTIONS_ORDER.indexOf(sectionId);
    return ((index + 1) / SECTIONS_ORDER.length) * 100;
  };

  return (
    <View style={styles.container}>
      
      {/* Section Header */}
      <Animated.View style={styles.header} duration={500}>
        <View style={styles.headerRow}>
          <Text style={styles.moduleNumber}>{data.number}</Text>
          <h1 className={styles.title}>{data.title}</h1>
        </View>
        <View style={styles.overviewBox}>
          <Text style={styles.overviewText}>{data.overview}</Text>
        </View>
      </Animated.View>

      {/* Resources List */}
      <View style={{ marginBottom: '2.5rem' }}>
        <Text style={styles.sectionTitle}>Core Resources</Text>
        <View style={styles.resourcesList}>
          {data.resources.map((res, index) => (
            <Animated.View key={index} delay={index * 100} duration={500} slideUp>
              <a href={res.url} target="_blank" rel="noreferrer" className={styles.resourceItem}>
                <View style={styles.resourceMeta}>
                  <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '1.5rem' }}>
                    {res.type === 'Certification' ? 'workspace_premium' : 'play_circle'}
                  </span>
                  <View style={styles.resourceText}>
                    <Text style={styles.resourceTitle}>{res.title}</Text>
                    <Text style={styles.resourceType}>{res.type} • External link</Text>
                  </View>
                </View>
                <span className="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
              </a>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Interactive Quiz (F1F5F9 Card Background) */}
      <Animated.View style={styles.quizPanel} delay={200} duration={500}>
        <View style={styles.quizHeader}>
          <View>
            <Text style={{ fontSize: '0.625rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
              Assessment
            </Text>
            <Text style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>{data.quiz.title}</Text>
          </View>
          <span className="material-symbols-outlined text-3xl text-blue-600 opacity-60">quiz</span>
        </View>
        <Text style={styles.quizDescription}>{data.quiz.instructions}</Text>

        <View style={styles.quizBox}>
          <View style={{ gap: '1.5rem' }}>
            {data.quiz.questions.map((q, qIndex) => {
              const selectedOption = selectedAnswers[qIndex];
              const isQuestionCompleted = isQuizSubmitted;
              
              return (
                <View key={qIndex} style={styles.quizQuestion}>
                  <Text style={styles.questionText}>{qIndex + 1}. {q.question}</Text>
                  <View style={styles.optionsList}>
                    {q.options.map((opt, oIndex) => {
                      const isSelected = selectedOption === oIndex || (isQuestionCompleted && progress.quizScores[sectionId] !== undefined && q.answer === oIndex);
                      const isCorrect = q.answer === oIndex;
                      
                      let optionStyle = styles.optionLabel;
                      if (isQuestionCompleted) {
                        if (isCorrect) {
                          optionStyle = `${styles.optionLabel} ${styles.optionLabelCorrect}`;
                        } else if (selectedOption === oIndex || (progress.quizScores[sectionId] !== undefined && !isCorrect && isSelected)) {
                          optionStyle = `${styles.optionLabel} ${styles.optionLabelIncorrect}`;
                        } else {
                          optionStyle = `${styles.optionLabel} ${styles.optionLabelDisabled}`;
                        }
                      } else if (selectedOption === oIndex) {
                        optionStyle = `${styles.optionLabel} ${styles.optionLabelSelected}`;
                      }

                      return (
                        <label 
                          key={oIndex} 
                          className={optionStyle}
                          onClick={() => handleOptionSelect(qIndex, oIndex)}
                        >
                          <input 
                            type="radio" 
                            name={`q-${qIndex}`} 
                            value={oIndex}
                            checked={selectedOption === oIndex || (isQuestionCompleted && isCorrect)}
                            disabled={isQuestionCompleted}
                            className={styles.radioInput}
                            onChange={() => {}}
                          />
                          <Text style={{ fontSize: '0.875rem' }}>{opt}</Text>
                        </label>
                      );
                    })}
                  </View>
                  {isQuestionCompleted && q.explanation && (
                    <Text style={styles.explanationText}>Note: {q.explanation}</Text>
                  )}
                </View>
              );
            })}
          </View>

          {!isQuizSubmitted ? (
            <TouchableOpacity onPress={handleQuizSubmit} style={[styles.btn, styles.btnFull, { marginTop: '1rem' }]}>
              SUBMIT ANSWERS
            </TouchableOpacity>
          ) : (
            <View style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', alignItems: 'center' }}>
              <span className="material-symbols-outlined text-blue-600 mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <Text style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>Quiz Completed!</Text>
              <Text style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2563eb', margin: '0.25rem 0' }}>
                {quizScore} / {data.quiz.questions.length}
              </Text>
              <Text style={{ fontSize: '0.75rem', color: '#475569' }}>
                {quizScore >= 3 ? 'Passed! Excellent understanding.' : 'Completed. Revisit the topics if you want to review.'}
              </Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Practice Exercise */}
      <Animated.View style={styles.exerciseCard} delay={300} duration={500}>
        {/* Background visual neural overlay for Section 5 */}
        {sectionId === 'section-5' && (
          <div className={styles.neuralOverlay} />
        )}
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <View>
            <Text style={{ fontSize: '0.625rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
              Practice Activity
            </Text>
            <Text style={styles.exerciseTitle}>{data.exercise.title}</Text>
          </View>
          <span className="material-symbols-outlined text-3xl text-blue-600 opacity-60">
            {sectionId === 'section-5' ? 'link' : 'edit_note'}
          </span>
        </View>
        <Text style={styles.quizDescription}>{data.exercise.instructions}</Text>

        {!isExerciseSubmitted ? (
          <View>
            <textarea
              className={styles.textarea}
              rows={5}
              placeholder="Type your response here..."
              value={exerciseText}
              onChange={(e) => setExerciseText(e.target.value)}
            />
            <TouchableOpacity onPress={handleExerciseSubmit} style={styles.btn}>
              SUBMIT WORK
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: '1.5rem' }}>
            <View style={styles.submissionBox}>
              <Text style={styles.submissionTitle}>YOUR SUBMISSION:</Text>
              <Text style={styles.submissionText}>"{exerciseText}"</Text>
            </View>
            
            <View style={styles.modelAnswerBox}>
              <Text style={styles.modelAnswerTitle}>
                <span className="material-symbols-outlined font-bold" style={{ fontSize: '1rem' }}>lightbulb</span>
                MODEL ANSWER / EXPLANATION
              </Text>
              <div 
                className={styles.modelAnswerText}
                dangerouslySetInnerHTML={{ __html: data.exercise.modelAnswer }}
              />
            </View>
          </View>
        )}
      </Animated.View>

      {/* Progress timeline */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarTrack}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${getProgressPercentage()}%` }} 
          />
        </View>
        <Text style={styles.progressText}>
          SECTION {SECTIONS_ORDER.indexOf(sectionId) + 1} OF {SECTIONS_ORDER.length} ({getProgressPercentage()}%)
        </Text>
      </View>

      {/* Fixed bottom navigation bar */}
      <footer className={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.bottomLink}>
          <span className="material-symbols-outlined">dashboard</span>
          <Text style={styles.bottomText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleNextSection}
          style={[styles.nextBtn, !isSectionComplete ? styles.nextBtnDisabled : '']}
        >
          <span className="material-symbols-outlined">
            {sectionId === 'section-5' ? 'celebration' : 'arrow_forward'}
          </span>
          <Text style={{ fontStyle: 'normal', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', color: '#fff' }}>
            {sectionId === 'section-5' ? 'Finish Course' : 'Next Section'}
          </Text>
        </TouchableOpacity>
      </footer>

    </View>
  );
}

export default SectionPage;
