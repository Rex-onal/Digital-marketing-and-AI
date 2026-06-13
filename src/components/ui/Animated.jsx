import React, { useState, useEffect } from 'react';
import View from './View';
import Text from './Text';

// Animated wrapper components that drive entry transitions using JS hooks.
// This structure is designed to be easily swappable with React Native's Animated API.

export const AnimatedView = React.forwardRef(({ style, children, delay = 0, duration = 500, slideUp = false, ...props }, ref) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // JS-driven animation style mapping
  const animatedStyles = {
    opacity: isActive ? 1 : 0,
    transform: slideUp 
      ? `translateY(${isActive ? '0px' : '15px'})` 
      : 'none',
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  };

  // Merge animations with styles
  let combinedStyle;
  if (Array.isArray(style)) {
    combinedStyle = [animatedStyles, ...style];
  } else if (typeof style === 'object') {
    combinedStyle = { ...animatedStyles, ...style };
  } else if (typeof style === 'string') {
    combinedStyle = [animatedStyles, style];
  } else {
    combinedStyle = animatedStyles;
  }

  return (
    <View
      ref={ref}
      style={combinedStyle}
      {...props}
    >
      {children}
    </View>
  );
});

export const AnimatedText = React.forwardRef(({ style, children, delay = 0, duration = 500, ...props }, ref) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyles = {
    opacity: isActive ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out`,
  };

  let combinedStyle;
  if (Array.isArray(style)) {
    combinedStyle = [animatedStyles, ...style];
  } else if (typeof style === 'object') {
    combinedStyle = { ...animatedStyles, ...style };
  } else if (typeof style === 'string') {
    combinedStyle = [animatedStyles, style];
  } else {
    combinedStyle = animatedStyles;
  }

  return (
    <Text
      ref={ref}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Text>
  );
});

AnimatedView.displayName = 'Animated.View';
AnimatedText.displayName = 'Animated.Text';

export const Animated = {
  View: AnimatedView,
  Text: AnimatedText
};

export default Animated;
