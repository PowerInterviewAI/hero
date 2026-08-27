import * as React from 'react';

import { HOTKEYS, type Hotkey } from '@/config/hotkeys';
import { cn } from '@/lib/utils';

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * A combo in the same notation `src/config/hotkeys.ts` uses, e.g.
   * `Ctrl+Shift+F9`. Segments split on `+` and render as individual keycaps.
   */
  combo: string;
}

/**
 * Renders a hotkey combo as a row of keycaps.
 *
 * Bracketed alternatives in the source data (`Ctrl+Shift+[J, K, L]`) stay in a
 * single cap rather than being split further - they're one conceptual key with
 * three choices, and three separate caps would read as a three-key chord.
 */
const Kbd: React.FC<KbdProps> = ({ combo, className, ...props }) => {
  const keys = combo.split('+');

  return (
    <span className={cn('inline-flex items-center gap-1', className)} {...props}>
      {keys.map((key, index) => (
        <React.Fragment key={`${key}-${index}`}>
          {index > 0 && (
            <span className="text-xs text-muted-foreground" aria-hidden="true">
              +
            </span>
          )}
          <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border-strong bg-surface-2 px-1.5 font-mono text-[0.6875rem] font-medium text-foreground shadow-elevation-1">
            {key.trim()}
          </kbd>
        </React.Fragment>
      ))}
    </span>
  );
};

interface HotkeyChipProps {
  hotkey: Hotkey;
  className?: string;
  /** Show the human-readable title next to the keycaps. */
  withTitle?: boolean;
}

/** Convenience wrapper that pulls the combo straight from the hotkey registry. */
const HotkeyChip: React.FC<HotkeyChipProps> = ({ hotkey, className, withTitle }) => {
  const info = HOTKEYS[hotkey];

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Kbd combo={info.combo} />
      {withTitle && <span className="text-sm text-muted-foreground">{info.title}</span>}
    </span>
  );
};

export { Kbd, HotkeyChip };
