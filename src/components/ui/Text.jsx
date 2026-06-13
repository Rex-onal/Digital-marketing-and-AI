import React from 'react';
import styles from '../../styles/primitives.module.css';
import { parseStyle } from './styleHelper';

export const Text = React.forwardRef(({ style, children, ...props }, ref) => {
  const parsed = parseStyle(style);
  
  const classes = `${styles.text} ${parsed.className}`.trim();

  return (
    <span
      ref={ref}
      className={classes}
      style={parsed.style}
      {...props}
    >
      {children}
    </span>
  );
});

Text.displayName = 'Text';
export default Text;
