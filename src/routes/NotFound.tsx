import { Link } from 'react-router-dom';

/**
 * Reached two ways: an unmatched client-side route, and — via the
 * dist/404.html copy in the deploy workflow — any unknown path hit directly
 * on GitHub Pages.
 */
export function NotFound() {
  return (
    <section className="section" aria-labelledby="notfound-heading">
      <div className="container">
        <h1 id="notfound-heading">Page not found</h1>
        <p>That page doesn&apos;t exist.</p>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </section>
  );
}
