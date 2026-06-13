import React from 'react';
import styles from '../../styles/primitives.module.css';
import { parseStyle } from './styleHelper';

export const ScrollView = React.forwardRef(({ style, children, ...props }, ref) => {
  const parsed = parseStyle(style);
  
  const classes = `${styles.scrollView} ${parsed.className}`.trim();

  return (
    <div
      ref={ref}
      className={classes}
      style={parsed.style}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollView.displayName = 'ScrollView';
export default ScrollView;
