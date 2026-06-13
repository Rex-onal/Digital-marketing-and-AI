// Normalizes style props to support class strings, inline style objects, or arrays of both

export function parseStyle(style) {
  if (!style) {
    return { className: '', style: {} };
  }

  if (typeof style === 'string') {
    return { className: style, style: {} };
  }

  if (Array.isArray(style)) {
    let classNames = [];
    let mergedInlineStyles = {};

    style.forEach(item => {
      if (!item) return;
      if (typeof item === 'string') {
        classNames.push(item);
      } else if (typeof item === 'object') {
        mergedInlineStyles = { ...mergedInlineStyles, ...item };
      }
    });

    return {
      className: classNames.join(' '),
      style: mergedInlineStyles
    };
  }

  if (typeof style === 'object') {
    return { className: '', style: style };
  }

  return { className: '', style: {} };
}
