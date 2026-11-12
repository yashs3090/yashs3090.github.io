import { useTheme } from '../../lib/use-theme';
import { themes, type Theme } from '../../lib/theme';

const labels: Record<Theme, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

const icons: Record<Theme, string> = {
  system: '◐',
  light: '☀',
  dark: '☾',
};

/**
 * A three-option radio group rather than a two-state switch. A plain
 * light/dark toggle has no way to say "follow my OS", which is what most
 * people actually want and is the default here.
 *
 * Implemented as role="radiogroup" with aria-checked buttons so the current
 * choice is announced, and labelled by icon + visually-hidden text so it stays
 * compact without becoming a guessing game for screen readers.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Color theme">
      {themes.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={theme === option}
          className="theme-toggle__option"
          onClick={() => setTheme(option)}
          title={`${labels[option]} theme`}
        >
          <span aria-hidden="true">{icons[option]}</span>
          <span className="visually-hidden">{labels[option]} theme</span>
        </button>
      ))}
    </div>
  );
}
