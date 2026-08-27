'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the top of the viewport.
 *
 * Used by the header to mark the active nav link while scrolling the home
 * page. Only ids that actually exist in the DOM are observed, so passing the
 * full nav list is safe on routes that render a single section.
 *
 * The observed elements are re-resolved whenever the DOM changes. Resolving
 * them once on mount is not enough: a section rendered inside <Suspense> swaps
 * its DOM node when the fallback resolves, and the observer would go on
 * watching the detached skeleton forever. That is what kept the Pricing nav
 * link from ever lighting up on the home page - `#pricing` belongs to
 * PricingSkeleton at mount and to PricingSection a moment later.
 */
export function useScrollSpy(sectionIds: readonly string[], topOffset = 96): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
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

    let observed: HTMLElement[] = [];

    const sync = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      const unchanged =
        elements.length === observed.length && elements.every((el, i) => el === observed[i]);
      if (unchanged) return;

      // Re-observing everything is cheaper than tracking adds and removes, and
      // this only runs when the set of section elements actually changed.
      observer.disconnect();
      observed = elements;
      elements.forEach((el) => observer.observe(el));
    };

    sync();

    // Coalesced to one check a frame: the subtree covers the whole page, and
    // animated content (the hero's app preview types characters) would
    // otherwise call this on every keystroke.
    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        sync();
      });
    };

    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [sectionIds, topOffset]);

  return activeId;
}
