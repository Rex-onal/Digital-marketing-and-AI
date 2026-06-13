import React from 'react';
import View from './View';

export const SafeAreaView = React.forwardRef(({ style, children, ...props }, ref) => {
  // Add CSS environment safe-area-insets directly to styling on web
  const safeAreaStyle = {
    paddingTop: 'env(safe-area-inset-top, 0px)',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingRight: 'env(safe-area-inset-right, 0px)',
  };

  // Merge with custom styling
  let combinedStyle;
  if (Array.isArray(style)) {
    combinedStyle = [safeAreaStyle, ...style];
  } else if (typeof style === 'object') {
    combinedStyle = { ...safeAreaStyle, ...style };
  } else if (typeof style === 'string') {
    combinedStyle = [safeAreaStyle, style];
  } else {
    combinedStyle = safeAreaStyle;
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

SafeAreaView.displayName = 'SafeAreaView';
export default SafeAreaView;
