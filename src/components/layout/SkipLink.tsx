/**
 * Keyboard users land here first; it stays visually hidden until focused.
 * Targets #main, rendered by App.
 */
export function SkipLink() {
  return (
    <a className="skip-link" href="#main">
      Skip to content
    </a>
  );
}
