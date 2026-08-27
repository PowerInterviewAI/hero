'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the top of the viewport.
 *
 * Used by the header to mark the active nav link while scrolling the home
 * page. Only ids that actually exist in the DOM are observed, so passing the
 * full nav list is safe on routes that render a single section.
 */
export function useScrollSpy(sectionIds: readonly string[], topOffset = 96): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // A band just under the sticky header: a section is "active" once its top
    // crosses into that band and until the next one does.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: `-${topOffset}px 0px -70% 0px`, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, topOffset]);

  return activeId;
}
