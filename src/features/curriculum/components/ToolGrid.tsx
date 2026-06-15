import React from 'react';
import styles from '../styles/curriculum.module.css';

export const ToolGrid: React.FC = () => {
  return (
    <div className={styles.toolsPanel}>
      <h4 className={styles.toolsTitle}>Helpful Learning Sandboxes</h4>
      <div className={styles.toolsGrid}>
        <a 
          className={styles.toolRow} 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noreferrer"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>movie</span>
            <span className={styles.toolLabel}>YouTube Learning Portal</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
        </a>
        
        <a 
          className={styles.toolRow} 
          href="https://chatgpt.com" 
          target="_blank" 
          rel="noreferrer"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>auto_awesome</span>
            <span className={styles.toolLabel}>ChatGPT AI Sandbox</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
        </a>
      </div>
    </div>
  );
};

export default ToolGrid;
