import React from 'react';

/**
 * Visually hidden until focused, then the first tab stop on every page.
 *
 * Pairs with the `id="main"` on the <main> element in HomeContent and
 * PageChrome - without it, keyboard users tab the whole header (and, on
 * mobile, open the nav sheet) before reaching any content.
 */
export const SkipToContent: React.FC = () => (
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
  >
    Skip to content
  </a>
);

export default SkipToContent;
