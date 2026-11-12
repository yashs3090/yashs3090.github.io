/**
 * Theme handling: three states, not two.
 *
 *   'system' — follow the OS setting (the default; most users want this)
 *   'light'  — explicit override
 *   'dark'   — explicit override
 *
 * An explicit choice is written to <html data-theme="..."> and persisted to
 * localStorage. 'system' REMOVES the attribute so the prefers-color-scheme
 * media query in tokens.css takes over — that is why the CSS has to handle
 * both the attribute and the media query (see docs/decisions/0008).
 *
 * The initial attribute is applied by an inline script in index.html before
 * first paint, so there is no flash of the wrong theme. Keep the storage key
 * and the logic here in sync with that script.
 */

export const THEME_STORAGE_KEY = 'theme';

export const themes = ['system', 'light', 'dark'] as const;
export type Theme = (typeof themes)[number];

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (themes as readonly string[]).includes(value);
}

/**
 * Reads the persisted preference. Storage access can throw outright (Safari
 * private mode, browsers set to block site data), so this never assumes it
 * works — a failure just means 'system'.
 */
export function getStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }

  try {
    if (theme === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Persisting is a convenience, not a requirement. The in-page theme still
    // applied above; it just will not survive a reload.
  }
}

/**
 * What the user is actually looking at right now, resolving 'system'.
 *
 * Guards on `window` so this stays safe if the site is ever prerendered —
 * ADR 0002 lists static prerendering as a future alternative to the 404.html
 * fallback, and that would evaluate this during the build with no DOM.
 */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
