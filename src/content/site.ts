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
  /**
   * Path to the resume PDF under public/, or undefined if there isn't one yet.
   *
   * Leave this undefined until the file actually exists. Because of the
   * 404.html SPA fallback (ADR 0002), a missing /resume.pdf does NOT 404 —
   * GitHub Pages serves the app's HTML instead, and a `download` link happily
   * saves that HTML as "resume.pdf", producing a file that won't open.
   * Gating the button on this field is what prevents that.
   */
  resumePdfUrl?: string;
  /**
   * Filename the browser saves the PDF as. The served path is deliberately
   * generic and stable (/resume.pdf) so shared links never break, but a file
   * called "resume.pdf" sitting in a recruiter's Downloads folder is
   * anonymous — this names it on disk without coupling the URL to it.
   */
  resumePdfDownloadName?: string;
  socials: SocialLink[];
}

export const site: SiteConfig = {
  name: 'Yash Saraiya',
  title: 'Software Engineer',
  location: 'New York, NY',
  email: 'yashsaraiya49@gmail.com',
  url: 'https://yashs3090.github.io',
  resumePdfUrl: '/resume.pdf',
  resumePdfDownloadName: 'Yash-Saraiya-Resume.pdf',
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
