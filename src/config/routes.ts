/**
 * The site's routing map - the single source of truth for every internal
 * destination.
 *
 * Header, footer, sitemap and the legacy redirects in next.config.ts all read
 * from here. They each used to carry their own hand-written list, which had
 * already drifted: the footer pointed "Pricing" at a scroll target while the
 * header pointed it at /pricing, and /benefits still 308'd to an anchor
 * nothing linked to.
 *
 * Keep this file free of imports and of anything but plain data - next.config.ts
 * imports it directly, outside the app bundle.
 */

/** Every route that renders a page of its own. */
export const ROUTES = {
  home: '/',
  howItWorks: '/how-it-works',
  pricing: '/pricing',
  faq: '/faq',
  team: '/team',
  docs: '/docs',
  privacy: '/privacy',
  terms: '/terms',
} as const;

/**
 * Ids of the home page's own sections.
 *
 * These are scroll targets, not routes. Nothing in the primary nav points at
 * one - see NAV_LINKS below - but the footer, the redirects and in-page CTAs
 * link to them as `/#id`, which is a real, shareable, crawlable URL.
 */
export const SECTIONS = {
  hero: 'home',
  howItWorks: 'how-it-works',
  features: 'features',
  benefits: 'benefits',
  whyChoose: 'why-choose',
  pricing: 'pricing',
  testimonials: 'testimonials',
  install: 'install',
  faq: 'faq',
  contact: 'contact',
  team: 'team',
} as const;

/** Builds the URL of a single documentation page. */
export const docPath = (slug: string) => `${ROUTES.docs}/${slug}`;

/** Builds the absolute URL of a home-page section. */
export const homeAnchor = (section: (typeof SECTIONS)[keyof typeof SECTIONS]) => `/#${section}`;

/** Where every "Download" call to action goes: the install options on the home page. */
export const DOWNLOAD_HREF = homeAnchor(SECTIONS.install);

export interface NavLinkDef {
  label: string;
  /** The item's own indexable route - what `isActive` compares against, and
   *  where it goes from any page other than home. */
  href: string;
  /** Marks the item active for `/docs` *and* every `/docs/*` page beneath it. */
  matchSubtree?: boolean;
  /**
   * The matching home-page section id, for items that are also a home
   * section. When set, the header links to `/#section` instead of `href`
   * while already on `/` - a same-page scroll rather than a navigation -
   * and falls back to `href` (the real page) everywhere else. The route
   * itself is untouched: still indexable, still linkable, still what a
   * search result or a bookmark lands on.
   */
  section?: (typeof SECTIONS)[keyof typeof SECTIONS];
  /** Opens in a new tab - for a destination that isn't a home-page section
   *  at all, currently just Docs. */
  newTab?: boolean;
}

/**
 * The primary navigation.
 *
 * Every item still has a real route (`href`) - Pricing, FAQ, Team and How it
 * works are indexable pages in their own right, not reconstructed from home
 * page anchors, and a direct visit or a search result lands on the page
 * itself. `section` is what lets the header shortcut to an in-page scroll
 * when you're already on `/`, since navigating to a page you're already
 * looking at (just to land back on the same content via an anchor) is
 * pointless. See NavLinkDef.section and Header.tsx for how the two combine.
 *
 * Features, Why Us and Contact are home-page-only sections with no page of
 * their own; they're reached by scrolling and linked from the footer, where
 * anchors are conventional.
 */
export const NAV_LINKS: readonly NavLinkDef[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'How it works', href: ROUTES.howItWorks, section: SECTIONS.howItWorks },
  { label: 'Pricing', href: ROUTES.pricing, section: SECTIONS.pricing },
  { label: 'FAQ', href: ROUTES.faq, section: SECTIONS.faq },
  { label: 'Team', href: ROUTES.team, section: SECTIONS.team },
  { label: 'Docs', href: ROUTES.docs, matchSubtree: true, newTab: true },
] as const;

/** Routes listed in the sitemap - pages in their own right, nothing that 3xx's. */
export const SITEMAP_ROUTES: readonly string[] = [
  ROUTES.home,
  ROUTES.howItWorks,
  ROUTES.pricing,
  ROUTES.faq,
  ROUTES.team,
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.docs,
] as const;

/**
 * /features, /benefits, /why-choose and /contact used to be standalone routes
 * that re-rendered the identical home-page section component - same component,
 * same copy, so 100% duplicate content, each declaring itself canonical.
 *
 * They're home-page sections now. These 308s keep any indexed URL, inbound link
 * or bookmark working and move the ranking signals to the home page.
 */
export const LEGACY_ANCHOR_REDIRECTS = [
  { source: '/features', destination: homeAnchor(SECTIONS.features) },
  { source: '/benefits', destination: homeAnchor(SECTIONS.benefits) },
  { source: '/why-choose', destination: homeAnchor(SECTIONS.whyChoose) },
  { source: '/contact', destination: homeAnchor(SECTIONS.contact) },
] as const;
