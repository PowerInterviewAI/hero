import type { Metadata } from 'next';

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /**
   * Use `title` verbatim instead of appending " - Power Interview AI".
   *
   * For the home page, whose title should be the brand-and-value line rather
   * than "Home - Power Interview AI" - the most valuable title on the site was
   * spending its first four characters on the word "Home".
   */
  absoluteTitle?: boolean;
}

/**
 * Builds per-page title/description/canonical/OG/Twitter metadata, consistent
 * with the defaults set in the root layout (which this overrides per-route).
 *
 * Keep `description` to roughly 150-160 characters. Google truncates the
 * snippet around there, so anything past it is invisible and the sentence gets
 * cut mid-clause; several routes here used to run 260-570 characters.
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} - ${SITE_NAME}`;
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
          width: 1200,
          height: 630,
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
