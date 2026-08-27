import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { BenefitsSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Benefits',
  description:
    'Benefits of using Power Interview AI for interview practice, mock interviews, meeting note taking, confidence building, and coding prep.',
  path: '/benefits',
});

export default function BenefitsPage() {
  return (
    <PageChrome>
      <BenefitsSection standalone />
    </PageChrome>
  );
}
