import { Link, NavLink } from 'react-router-dom';

import { site } from '../../content/site';
import { ThemeToggle } from './ThemeToggle';

/*
 * /apps is intentionally absent here. The route still exists and resolves —
 * it is just unlinked while the page is a placeholder. Re-add
 * { to: '/apps', label: 'Apps' } when there is something on it.
 */
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/resume', label: 'Resume' },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-header__brand" to="/">
          {site.name}
        </Link>

        <div className="site-header__actions">
          <nav className="site-nav" aria-label="Main">
            <ul className="site-nav__list">
              {navItems.map((item) => (
                <li key={item.to}>
                  {/* NavLink sets aria-current="page" on the active route, which
                      is both the a11y signal and the styling hook. */}
                  <NavLink className="site-nav__link" to={item.to} end>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
