'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Stagger in milliseconds, for revealing a row of cards in sequence. */
  delay?: number;
  /** Reveal once the element is this far into the viewport. */
  rootMargin?: string;
  as?: 'div' | 'li' | 'section';
}

/**
 * Fades and lifts its children in as they scroll into view, once.
 *
 * Deliberately ~40 lines of IntersectionObserver instead of a motion library:
 * the site ships zero animation dependencies and this is the only motion the
 * design needs. The reduced-motion escape hatch is global (see the
 * prefers-reduced-motion block in src/styles/index.css), but it's also checked
 * here so the element starts visible rather than animating from opacity-0 at
 * 0.01ms - a hair of flicker either way otherwise.
 */
const Reveal: React.FC<RevealProps> = ({
  delay = 0,
  rootMargin = '0px 0px -10% 0px',
  as: Tag = 'div',
  className,
  children,
  ...props
}) => {
  // Widened to ElementType so the polymorphic `as` doesn't have to reconcile
  // div/li/section attribute unions at every call site.
  const Component = Tag as React.ElementType;
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <Component
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'ease-[cubic-bezier(0.16,1,0.3,1)] transition-[opacity,transform] duration-700 motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Reveal };
