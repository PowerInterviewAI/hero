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
} as const;

/** Builds the URL of a single documentation page. */
export const docPath = (slug: string) => `${ROUTES.docs}/${slug}`;

/** Builds the absolute URL of a home-page section. */
export const homeAnchor = (section: (typeof SECTIONS)[keyof typeof SECTIONS]) => `/#${section}`;

/** Where every "Download" call to action goes: the install options on the home page. */
export const DOWNLOAD_HREF = homeAnchor(SECTIONS.install);

export interface NavLinkDef {
  label: string;
  href: string;
  /** Marks the item active for `/docs` *and* every `/docs/*` page beneath it. */
  matchSubtree?: boolean;
}

/**
 * The primary navigation - routes only, never anchors.
 *
 * The bar used to mix the two: How it works / Pricing / FAQ navigated to a
 * page, while Features / Why Us / Contact scrolled the home page. Identical
 * styling, two different outcomes, and on the home page the anchor items
 * rendered as <button> rather than a link, so they had no URL to copy, could
 * not be opened in a new tab and left the address bar reading `/`.
 *
 * Features, Why Us and Contact are still home-page sections; they're reached by
 * scrolling and linked from the footer, where anchors are conventional.
 */
export const NAV_LINKS: readonly NavLinkDef[] = [
  { label: 'How it works', href: ROUTES.howItWorks },
  { label: 'Pricing', href: ROUTES.pricing },
  { label: 'FAQ', href: ROUTES.faq },
  { label: 'Docs', href: ROUTES.docs, matchSubtree: true },
] as const;

/** Routes listed in the sitemap - pages in their own right, nothing that 3xx's. */
export const SITEMAP_ROUTES: readonly string[] = [
  ROUTES.home,
  ROUTES.howItWorks,
  ROUTES.pricing,
  ROUTES.faq,
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
