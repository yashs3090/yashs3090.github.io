import { apps } from '../content/apps';

/**
 * The self-hosted portal. Deliberately its own route rather than a homepage
 * section — recruiters do not need it, and it would dilute a 45-second skim.
 *
 * Status values come from the hardcoded `status` field in the content module,
 * not a live health check. See the comment in src/content/apps.ts for why a
 * static page on github.io cannot check a home server.
 */
export function Apps() {
  return (
    <section className="section" aria-labelledby="apps-heading">
      <div className="container">
        <h1 id="apps-heading">Self-hosted Apps</h1>
        <p>Personal services and tools I run myself.</p>
        {apps.length === 0 ? (
          <p className="placeholder">
            Phase 3: populate <code>src/content/apps.ts</code>. Gate each
            service behind Cloudflare Access before linking it publicly; leave
            <code>href</code> unset for anything that should not be
            enumerated.
          </p>
        ) : null}
      </div>
    </section>
  );
}
