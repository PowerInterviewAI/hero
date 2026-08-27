import type { MetadataRoute } from 'next';

import { getDocSlugs } from '@/lib/docs';

const SITE_URL = 'https://www.powerinterviewai.com';

// Only routes that are a page in their own right. /features, /benefits,
// /why-choose and /contact are home-page anchors now and redirect there - a
// sitemap should never list a URL that 3xx's.
const STATIC_ROUTES = ['', '/how-it-works', '/pricing', '/faq', '/privacy', '/terms', '/docs'];

// Generated from the real route list + the docs system's own slug list, so
// it can't drift out of sync with actual routes the way the old
// hand-maintained public/sitemap.xml did (which still listed a
// /legal-notice URL with no corresponding page).
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const docEntries: MetadataRoute.Sitemap = getDocSlugs().map((slug) => ({
    url: `${SITE_URL}/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...docEntries];
}
