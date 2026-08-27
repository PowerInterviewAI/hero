import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { ContactSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact Power Interview AI support or sales - reach out for help, partnership, enterprise meeting note taker inquiries, or product questions.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageChrome>
      <ContactSection standalone />
    </PageChrome>
  );
}
