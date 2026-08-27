import type { MetadataRoute } from 'next';

import { SITEMAP_ROUTES, docPath } from '@/config/routes';
import { getDocLastModified, getDocSlugs } from '@/lib/docs';

const SITE_URL = 'https://www.powerinterviewai.com';

// Generated from src/config/routes.ts + the docs system's own slug list, so it
// can't drift out of sync with the actual routes the way the old
// hand-maintained public/sitemap.xml did (which still listed a /legal-notice
// URL with no corresponding page). SITEMAP_ROUTES holds only pages in their own
// right - a sitemap should never list a URL that 3xx's, which rules out the
// four legacy routes that now redirect to home-page anchors.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = SITEMAP_ROUTES.map((route) => {
    const isHome = route === '/';
    return {
      // '/' would otherwise produce a trailing-slash duplicate of the canonical.
      url: isHome ? SITE_URL : `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: isHome ? ('weekly' as const) : ('monthly' as const),
      priority: isHome ? 1 : 0.7,
    };
  });

  // lastModified comes off the markdown file itself rather than the clock, so
  // a doc that didn't change doesn't claim it did on every deploy.
  const docEntries: MetadataRoute.Sitemap = getDocSlugs().map((slug) => ({
    url: `${SITE_URL}${docPath(slug)}`,
    lastModified: getDocLastModified(slug),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...docEntries];
}
