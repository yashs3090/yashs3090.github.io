import { useCallback, useEffect, useState } from 'react';

import { applyTheme, getStoredTheme, resolveTheme, type Theme } from './theme';

/**
 * Owns the theme preference and keeps `resolved` accurate while the user is on
 * the page — if they are on 'system' and flip their OS appearance, the
 * media-query listener updates the UI without a reload.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
  const [resolved, setResolved] = useState<'light' | 'dark'>(() =>
    resolveTheme(getStoredTheme()),
  );

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
    setResolved(resolveTheme(next));
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setResolved(query.matches ? 'dark' : 'light');

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [theme]);

  return { theme, resolved, setTheme };
}
