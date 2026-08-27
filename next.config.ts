import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /*
   * /features, /benefits, /why-choose and /contact used to be standalone
   * routes that re-rendered the identical home-page section component - same
   * component, same copy, so 100% duplicate content. Each also declared
   * itself canonical and was submitted in the sitemap, so they competed with
   * the home page rather than consolidating into it.
   *
   * They're now anchors on the home page. These redirects keep any indexed
   * URL, inbound link or bookmark working, and 308 tells Google to move the
   * ranking signals to the destination.
   */
  async redirects() {
    return [
      { source: '/features', destination: '/#features', permanent: true },
      { source: '/benefits', destination: '/#benefits', permanent: true },
      { source: '/why-choose', destination: '/#why-choose', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};

export default nextConfig;
