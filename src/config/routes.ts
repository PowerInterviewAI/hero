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
  /** The item's own indexable route. Still a real, standalone page - still
   *  what search results, bookmarks and the footer's own links land on -
   *  even for an item the header always links to as `/#section` instead
   *  (see `section`). Also what `isActive` compares against off the home
   *  page, and where the header sends you for an item with no `section`. */
  href: string;
  /** Marks the item active for `/docs` *and* every `/docs/*` page beneath it. */
  matchSubtree?: boolean;
  /**
   * The matching home-page section id, for items that are also a home
   * section. When set, the header always links to `/#section` instead of
   * `href` - from any page, not only while on home - since the header is
   * meant to keep you on the single-page experience. `href` is untouched
   * everywhere else it's used (footer, sitemap, direct visits).
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
 * page anchors, and a direct visit, a search result or a footer link lands
 * on the page itself. `section` is what makes the *header's own* links
 * always point at the matching home anchor instead, regardless of which
 * page you're clicking it from - see NavLinkDef.section and Header.tsx for
 * how the two combine, and why that doesn't cost the page its SEO.
 *
 * Features, Why Us and Contact are home-page-only sections with no page of
 * their own; they're reached by scrolling and linked from the footer, where
 * anchors are conventional.
 */
export const NAV_LINKS: readonly NavLinkDef[] = [
  { label: 'Home', href: ROUTES.home, section: SECTIONS.hero },
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

/**
 * A bare visit to `/` lands on `/#home` instead, so the header's Home item
 * (which always links to `/#home` - see NAV_LINKS) matches the address bar
 * on first load too, and `isActive` in Header.tsx doesn't need a "no hash
 * means home" special case.
 *
 * Deliberately temporary (307), not permanent like LEGACY_ANCHOR_REDIRECTS:
 * `/` is still this site's real canonical URL (metadata, Open Graph, JSON-LD
 * and the sitemap all say so) - this is a display preference for the address
 * bar, not a claim that `/` has moved. A fragment-only redirect costs
 * nothing extra over the network either way: the browser already has the
 * document `/` would have served, so it just updates the bar and scrolls -
 * no second request.
 */
export const HOME_HASH_REDIRECT = { source: '/', destination: homeAnchor(SECTIONS.hero) } as const;
