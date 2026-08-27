'use client';

import React from 'react';

import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const NEXT_LABEL = {
  light: 'dark',
  dark: 'system',
  system: 'light',
} as const;

interface ThemeToggleProps {
  className?: string;
}

/**
 * Cycles light -> dark -> system.
 *
 * Renders a fixed-size placeholder until useTheme has read localStorage, so a
 * stored theme that isn't the 'dark' default can't cause a hydration mismatch
 * or a visible icon flip.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, cycleTheme, mounted } = useTheme();
  const Icon = ICONS[theme];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={mounted ? `Theme: ${theme}. Switch to ${NEXT_LABEL[theme]}.` : 'Toggle theme'}
      title={mounted ? `Theme: ${theme}` : undefined}
      // The base button variant pins descendant svgs to size-4 with a
      // descendant selector, which outranks a class on the icon itself.
      className={cn('text-muted-foreground hover:text-foreground [&_svg]:size-5', className)}
    >
      {mounted ? <Icon className="size-5" /> : <span className="size-5" aria-hidden="true" />}
    </Button>
  );
};

export default ThemeToggle;
