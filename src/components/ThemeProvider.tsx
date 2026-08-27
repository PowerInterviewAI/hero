'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { Theme } from '@/types';

// light -> dark -> system -> light. The header toggle used to flip only
// light<->dark, which meant 'system' was reachable from localStorage but never
// from the UI.
const THEME_CYCLE: Theme[] = ['light', 'dark', 'system'];

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  /** False until the localStorage read has run - see ThemeToggle. */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Owns the theme for the whole app.
 *
 * This lives in the root layout on purpose. Header - and so ThemeToggle - is
 * rendered inside each page.tsx rather than a layout, so it remounts on every
 * client-side navigation. While the state lived in the hook, each remount
 * started over from the 'dark' default, and the effect below wrote that default
 * straight back to localStorage before the stored value had been read - so
 * navigating from one docs page to the next silently reset a saved 'light'
 * theme to dark. A layout-level provider doesn't remount, so there is nothing
 * to reset.
 *
 * It also means there is exactly one copy of the state. Header renders
 * ThemeToggle twice (desktop and mobile, one hidden by CSS); with per-component
 * state those two disagreed after any toggle, and each wrote its own value.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Defaults to 'dark' to match the anti-FOUC inline script in the root layout,
  // which already put the right class on <html> before hydration; the effect
  // below syncs this state to what's in localStorage (can't read localStorage
  // during render - no window on the server).
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    // Nothing to do before the read above has landed, and crucially nothing to
    // WRITE: persisting the 'dark' default here is what used to clobber the
    // stored theme. The inline script has already set the class for this load.
    if (!mounted) return;

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
  }, [theme, mounted]);

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider> (see src/app/layout.tsx).');
  }
  return context;
};

export default ThemeProvider;
