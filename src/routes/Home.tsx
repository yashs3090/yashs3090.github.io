import { Link } from 'react-router-dom';

import { site } from '../content/site';

/**
 * Intentionally minimal. The landing page is being left spare on purpose
 * pending a design pass — all substantive content (experience, projects,
 * skills, education) now lives on /resume.
 *
 * This is deliberately NOT a hero with sections stacked under it. Do not add
 * content sections here without revisiting docs/decisions/0007.
 */
export function Home() {
  return (
    <section className="landing" aria-labelledby="landing-heading">
      <div className="container landing__inner">
        <h1 className="landing__name" id="landing-heading">
          {site.name}
        </h1>
        <p className="landing__title">
          {site.title} &middot; {site.location}
        </p>

        <nav className="landing__links" aria-label="Site sections">
          {/* The /apps link is hidden while that page is a placeholder. */}
          <Link className="button button--primary" to="/resume">
            Resume
          </Link>
        </nav>

        <ul className="landing__socials">
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          {site.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
