/**
 * Site identity and social links.
 *
 * This is the one content module with real data in Phase 1 — everything here
 * is public identity, not resume copy.
 */

export interface SocialLink {
  label: string;
  /** Rendered as the visible handle/address where useful. */
  handle?: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Short role line shown under the name in the hero. */
  title: string;
  location: string;
  email: string;
  /** Absolute canonical origin, used for OG tags and sitemap in Phase 3. */
  url: string;
  socials: SocialLink[];
}

export const site: SiteConfig = {
  name: 'Yash Saraiya',
  title: 'Software Engineer',
  location: 'New York, NY',
  email: 'yashsaraiya49@gmail.com',
  url: 'https://yashs3090.github.io',
  socials: [
    // OPEN DECISION (see agents/plan.md): the featured projects currently live
    // on the older `yash3090` account, while this site and all future work
    // live on `yashs3090`. Until that split is resolved, this link points at
    // the current account and individual projects link to their own repos.
    {
      label: 'GitHub',
      handle: 'yashs3090',
      href: 'https://github.com/yashs3090',
    },
    {
      label: 'LinkedIn',
      handle: 'yash-saraiya',
      href: 'https://www.linkedin.com/in/yash-saraiya-aa3206197/',
    },
  ],
};
