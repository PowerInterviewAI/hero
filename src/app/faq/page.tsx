import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { FAQSection } from '@/components/sections';
import { faqPageJsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description:
    'Answers on how Power Interview AI works: platform support, stealth mode and screen share, privacy and local data, mock interviews, billing and credits.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <PageChrome>
      {/* The only page rendering the full question list, so the only page that
          should claim FAQPage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <FAQSection standalone />
    </PageChrome>
  );
}
