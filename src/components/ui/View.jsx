import React from 'react';
import styles from '../../styles/primitives.module.css';
import { parseStyle } from './styleHelper';

export const View = React.forwardRef(({ style, children, ...props }, ref) => {
  const parsed = parseStyle(style);
  
  // Merge primitive default style class with custom classes
  const classes = `${styles.view} ${parsed.className}`.trim();

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

View.displayName = 'View';
export default View;
