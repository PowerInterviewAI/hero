import type { NextConfig } from 'next';

import { LEGACY_ANCHOR_REDIRECTS } from './src/config/routes';

const nextConfig: NextConfig = {
  // Sourced from src/config/routes.ts so the redirect table, the sitemap and
  // the nav can't drift apart - they each used to carry their own copy, and
  // had. See that file for why these four routes became anchors.
  //
  // Deliberately NOT a `/` -> `/#home` entry: a server-issued redirect is a
  // fresh navigation, not a same-document hash change, so the browser
  // re-requests the target's *path* - which is still `/` - and the rule
  // matches itself again. Infinite redirect loop. Fragment-only redirects to
  // the same path can't work this way; Home's `/#home` link (see NAV_LINKS)
  // has to be enough on its own.
  async redirects() {
    return LEGACY_ANCHOR_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
