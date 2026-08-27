import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { FAQSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about Power Interview AI - features, mock interviews, meeting note taking, privacy, payments, and usage.',
  path: '/faq',
});

// No scrollToSection: with none supplied, FAQSection's "Contact us" renders as
// a link to /contact rather than an in-page scroll. That replaces the client
// wrapper this route used to need purely to intercept one button.
export default function FAQPage() {
  return (
    <PageChrome>
      <FAQSection standalone />
    </PageChrome>
  );
}
