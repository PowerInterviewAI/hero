import type { Metadata } from 'next';

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

// Builds per-page title/description/canonical/OG/Twitter metadata, consistent
// with the defaults set in the root layout (which this overrides per-route).
export function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle = `${title} - ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: '/open-graph.png',
          width: 1235,
          height: 647,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/open-graph.png'],
    },
  };
}
