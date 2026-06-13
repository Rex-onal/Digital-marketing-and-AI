import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';
import View from '../components/ui/View';
import Text from '../components/ui/Text';
import TouchableOpacity from '../components/ui/TouchableOpacity';
import Animated from '../components/ui/Animated';
import { useNavigation } from '../context/NavigationContext';
import { useCourseProgress } from '../context/CourseProgressContext';

const SECTIONS = [
  { id: 'section-1', number: '01', title: 'Section 1: Foundations of Digital Marketing', overview: 'Understand the big picture before diving into specific skills — the marketing funnel, the four pillars (audience, problem, channel, action), and how everything in digital marketing connects.' },
  { id: 'section-2', number: '02', title: 'Section 2: Social Media Management & Marketing', overview: 'Learn the day-to-day operational work of running social media accounts, plus the strategy behind platform culture, content pillars, and growth tactics.' },
  { id: 'section-3', number: '03', title: 'Section 3: Copywriting', overview: 'Learn to write words that persuade — headlines, body copy, CTAs, tone matching, and proven copywriting formulas like AIDA and PAS.' },
  { id: 'section-4', number: '04', title: 'Section 4: Content Marketing', overview: 'Learn to create valuable, consistent content that builds trust over time — formats, content repurposing, storytelling, and the value-first approach.' },
  { id: 'section-5', number: '05', title: 'Section 5: AI & Prompt Engineering', overview: 'Learn to use AI tools effectively as a research assistant and writing partner — and master the prompt engineering principles that make AI outputs actually useful.' }
];

export function Dashboard() {
  const { navigate } = useNavigation();
  const { progress, isSectionUnlocked, resetProgress, toggleUnlockAll } = useCourseProgress();
  const [showFinishedBanner, setShowFinishedBanner] = useState(false);

  useEffect(() => {
    // Check if redirect query completed is present
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('completed') === 'true' || progress.isCourseFinished) {
        setShowFinishedBanner(true);
        // Clear param
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [progress.isCourseFinished]);

  // Calculate timeline progress line gradient percentage
  const getProgressGradient = () => {
    const total = SECTIONS.length;
    const completedCount = progress.completedSections.length;
    if (completedCount === 0) return '#e2e8f0';
    if (completedCount === total) return '#2563eb';
    const percent = ((completedCount - 0.5) / (total - 1)) * 100;
    return `linear-gradient(to bottom, #2563eb ${percent}%, #e2e8f0 ${percent}%)`;
  };

  return (
    <View style={styles.container}>
      
      {/* Completion Banner */}
      {showFinishedBanner && (
        <Animated.View style={styles.completionBanner} duration={500} slideUp>
          <span className="material-symbols-outlined text-green-600 mb-3 font-bold" style={{ fontSize: '3rem', fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <Text style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'block' }}>
            Congratulations!
          </Text>
          <Text style={{ fontSize: '0.95rem', color: '#334155', display: 'block', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            🎉 You've completed the full Digital Marketing & AI Learning Path! Revisit any section anytime to review or practice further.
          </Text>
          <TouchableOpacity 
            onPress={resetProgress} 
            style={[styles.primaryBtn, { margin: '0 auto', display: 'flex' }]}
          >
            RESTART PATH
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: '#eff6ff', padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1rem' }}>
          Curriculum Roadmap
        </Text>
        <h2 className={styles.title}>Your Learning Path</h2>
        <Text style={styles.subtitle}>
          Follow these 5 sections in sequential order to master digital marketing fundamentals up to advanced AI prompting.
        </Text>
      </View>

      {/* Timeline Roadmap */}
      <View style={styles.roadmap}>
        <div className={styles.roadmapLine} style={{ background: getProgressGradient() }} />

        {SECTIONS.map((section, index) => {
          const isCompleted = progress.completedSections.includes(section.id);
          const isCurrent = progress.currentSection === section.id && !isCompleted;
          const isLocked = !isSectionUnlocked(section.id);

          // Build classes based on states
          let cardStyle = styles.card;
          if (isCompleted) cardStyle = `${styles.card} ${styles.cardCompleted}`;
          else if (isCurrent || (index === 0 && progress.completedSections.length === 0)) cardStyle = `${styles.card} ${styles.cardCurrent}`;
          else if (isLocked) cardStyle = `${styles.card} ${styles.cardLocked}`;

          const numberClass = `${styles.numberText} ${isCompleted || isCurrent ? styles.numberTextActive : ''}`.trim();

          const handleCardClick = () => {
            if (isLocked) {
              alert('This section is locked! Please complete the previous sections first.');
              return;
            }
            navigate(`/${section.id}`);
          };

          return (
            <Animated.View key={section.id} style={cardStyle} delay={index * 100} duration={500} slideUp>
              <View style={styles.numberCol}>
                <Text style={numberClass}>{section.number}</Text>
              </View>
              
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  {isCompleted ? (
                    <>
                      <Text style={`${styles.badge} ${styles.badgeCompleted}`}>COMPLETED</Text>
                      <span className="material-symbols-outlined text-blue-600 font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </>
                  ) : (isCurrent || (index === 0 && progress.completedSections.length === 0)) ? (
                    <>
                      <Text style={`${styles.badge} ${styles.badgeCurrent}`}>IN PROGRESS</Text>
                      <View style={{ width: '48px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: '50%', height: '100%', backgroundColor: '#2563eb' }} />
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={`${styles.badge} ${styles.badgeUpcoming}`}>UPCOMING</Text>
                      <span className="material-symbols-outlined text-slate-400">lock</span>
                    </>
                  )}
                </View>

                <h3 className={styles.cardTitle}>{section.title}</h3>
                <Text style={styles.cardDescription}>{section.overview}</Text>

                <View style={styles.actionArea}>
                  {isCompleted ? (
                    <TouchableOpacity onPress={handleCardClick} style={styles.reviewLink}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>replay</span> REVIEW MODULE
                    </TouchableOpacity>
                  ) : (isCurrent || (index === 0 && progress.completedSections.length === 0)) ? (
                    <TouchableOpacity onPress={handleCardClick} style={styles.primaryBtn}>
                      CONTINUE LEARNING <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>play_arrow</span>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.lockedText}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>lock</span> LOCKED (Complete prior section)
                    </Text>
                  )}
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>

      {/* Helpful Tools grid (F1F5F9 card background) */}
      <Animated.View style={styles.toolsPanel} delay={600} duration={500}>
        <Text style={styles.toolsTitle}>HELPFUL TOOLS</Text>
        <div className={styles.toolsGrid}>
          <a className={styles.toolRow} href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <span className="material-symbols-outlined text-blue-600">movie</span>
              <Text style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>YouTube Learning Portal</Text>
            </View>
            <span className="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
          </a>
          <a className={styles.toolRow} href="https://chatgpt.com" target="_blank" rel="noreferrer">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <span className="material-symbols-outlined text-blue-600">auto_awesome</span>
              <Text style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>ChatGPT AI Sandbox</Text>
            </View>
            <span className="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
          </a>
        </div>
      </Animated.View>

      {/* Footer Dev utilities */}
      <View style={styles.footer}>
        <Text style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.75rem' }}>
          Digital Marketing & AI Learning Roadmap — single shared URL deployable to Vercel.
        </Text>
        <button onClick={toggleUnlockAll} className={styles.devBtn}>
          🔧 DEV BYPASS: TOGGLE UNLOCK ALL SECTIONS
        </button>
      </View>

    </View>
  );
}

export default Dashboard;
