/**
 * Self-hosted app portal entries, rendered on /apps.
 *
 * Status is intentionally a hardcoded field, not a live check. A static page
 * on github.io cannot health-check a home server: the fetch is cross-origin
 * (blocked without CORS), anything behind Cloudflare Access returns a login
 * redirect rather than a health response, and it would fire from every
 * visitor's browser — meaning strangers' laptops would probe the home
 * network. If live status is ever wanted, it must be computed ahead of time
 * and baked in as data (see docs/ for the full reasoning).
 *
 * SECURITY: never commit internal hostnames, IPs, ports, or credentials here.
 * This bundle is public and so is its git history. For anything that should
 * not be enumerated, set href to undefined and leave the card unlinked.
 */

export type AppStatus = 'online' | 'offline' | 'maintenance' | 'planned';

export interface SelfHostedApp {
  name: string;
  description: string;
  /** Omit entirely for services that should not be publicly enumerated. */
  href?: string;
  status: AppStatus;
  /** e.g. 'Cloudflare Access — invite only'. */
  accessNote?: string;
}

export const apps: SelfHostedApp[] = [];
