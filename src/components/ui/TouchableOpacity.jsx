import React from 'react';
import styles from '../../styles/primitives.module.css';
import { parseStyle } from './styleHelper';

export const TouchableOpacity = React.forwardRef(({ style, children, onPress, onClick, activeOpacity = 0.6, ...props }, ref) => {
  const parsed = parseStyle(style);
  
  const classes = `${styles.touchableOpacity} ${parsed.className}`.trim();

  const handlePress = (e) => {
    if (onPress) {
      onPress(e);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      className={classes}
      style={{
        ...parsed.style,
        '--active-opacity': activeOpacity
      }}
      onClick={handlePress}
      {...props}
    >
      {children}
    </button>
  );
});

TouchableOpacity.displayName = 'TouchableOpacity';
export default TouchableOpacity;
