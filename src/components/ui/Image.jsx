import React from 'react';
import styles from '../../styles/primitives.module.css';
import { parseStyle } from './styleHelper';

export const Image = React.forwardRef(({ style, source, src, alt = '', ...props }, ref) => {
  const parsed = parseStyle(style);
  
  const classes = `${styles.image} ${parsed.className}`.trim();

  // Handle React Native source object structure
  let imageSrc = src;
  if (source) {
    if (typeof source === 'string') {
      imageSrc = source;
    } else if (source.uri) {
      imageSrc = source.uri;
    }
  }

  return (
    <img
      ref={ref}
      src={imageSrc}
      alt={alt}
      className={classes}
      style={parsed.style}
      {...props}
    />
  );
});

Image.displayName = 'Image';
export default Image;
