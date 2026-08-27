import { useThemeContext } from '@/components/ThemeProvider';

/**
 * Reads the app-wide theme.
 *
 * The state itself lives in <ThemeProvider> in the root layout, not here - see
 * that file for why. This hook is the consumer side and keeps the original
 * `{ theme, setTheme, cycleTheme, mounted }` shape.
 */
export const useTheme = () => useThemeContext();
