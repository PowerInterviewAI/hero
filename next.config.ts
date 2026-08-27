import type { NextConfig } from 'next';

import { LEGACY_ANCHOR_REDIRECTS } from './src/config/routes';

const nextConfig: NextConfig = {
  // Sourced from src/config/routes.ts so the redirect table, the sitemap and
  // the nav can't drift apart - they each used to carry their own copy, and
  // had. See that file for why these four routes became anchors.
  async redirects() {
    return LEGACY_ANCHOR_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
