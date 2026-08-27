import { useCallback, useEffect, useState } from 'react';

import type { Theme } from '@/types';

// light -> dark -> system -> light. The header toggle used to flip only
// light<->dark, which meant 'system' was reachable from localStorage but never
// from the UI.
const THEME_CYCLE: Theme[] = ['light', 'dark', 'system'];

/**
 * Custom hook for managing theme
 */
export const useTheme = () => {
  // Defaults to 'dark' to match the anti-FOUC inline script in the root
  // layout, which already sets the correct class before hydration; the
  // effect below just syncs this hook's state to what's in localStorage
  // (can't read localStorage during render - no window on the server).
  const [theme, setTheme] = useState<Theme>('dark');
  // False until the localStorage read has run. Callers use it to hold back
  // theme-dependent UI (the toggle icon) so the server and first client render
  // agree even when the stored theme isn't the 'dark' default.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // While on 'system', follow the OS if it changes underneath us.
  useEffect(() => {
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(media.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const index = THEME_CYCLE.indexOf(current);
      return THEME_CYCLE[(index + 1) % THEME_CYCLE.length];
    });
  }, []);

  return { theme, setTheme, cycleTheme, mounted };
};
