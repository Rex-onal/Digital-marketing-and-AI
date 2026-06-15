import React, { useCallback } from 'react';
import styles from '../styles/curriculum.module.css';
import type { Section } from '../types';

interface RoadmapCardProps {
  section: Section;
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onCardClick: (id: string) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = React.memo(({
  section,
  index,
  isCompleted,
  isCurrent,
  isLocked,
  onCardClick
}) => {
  const handleClick = useCallback(() => {
    onCardClick(section.id);
  }, [section.id, onCardClick]);

  // Derived styles based on status
  let cardClass = styles.card;
  let bulletClass = styles.roadmapBullet;
  let numberClass = styles.numberText;

  if (isCompleted) {
    cardClass += ` ${styles.cardCompleted}`;
    bulletClass += ` ${styles.roadmapBulletCompleted}`;
    numberClass += ` ${styles.numberTextCompleted}`;
  } else if (isCurrent) {
    cardClass += ` ${styles.cardCurrent}`;
    bulletClass += ` ${styles.roadmapBulletActive}`;
    numberClass += ` ${styles.numberTextActive}`;
  } else if (isLocked) {
    cardClass += ` ${styles.cardLocked}`;
  }

  return (
    <div className={styles.cardWrapper}>
      {/* Visual Roadmap Bullet Indicator */}
      <div className={bulletClass} />

      {/* Main Interactive Card */}
      <div className={cardClass} onClick={!isLocked ? handleClick : undefined}>
        <div className={styles.numberCol}>
          <span className={numberClass}>{section.number}</span>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            {isCompleted ? (
              <>
                <span className={`${styles.badge} ${styles.badgeCompleted}`}>Completed</span>
                <span className="material-symbols-outlined text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </>
            ) : isCurrent ? (
              <>
                <span className={`${styles.badge} ${styles.badgeCurrent}`}>In Progress</span>
                <div style={{ width: '48px', height: '6px', backgroundColor: 'var(--border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', background: 'var(--gradient-primary)' }} />
                </div>
              </>
            ) : (
              <>
                <span className={`${styles.badge} ${styles.badgeUpcoming}`}>Locked</span>
                <span className="material-symbols-outlined text-slate-400">lock</span>
              </>
            )}
          </div>

          <h3 className={styles.cardTitle}>{section.title}</h3>
          <p className={styles.cardDescription}>{section.overview}</p>

          <div className={styles.actionArea}>
            {isCompleted ? (
              <button onClick={handleClick} className={styles.reviewLink}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>replay</span>
                REVIEW MODULE
              </button>
            ) : isCurrent ? (
              <button onClick={handleClick} className={styles.primaryBtn}>
                CONTINUE LEARNING
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>play_arrow</span>
              </button>
            ) : (
              <span className={styles.lockedText}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>lock</span>
                LOCKED (Complete prior sections)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

RoadmapCard.displayName = 'RoadmapCard';
export default RoadmapCard;
