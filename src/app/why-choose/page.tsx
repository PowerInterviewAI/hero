import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { WhyChooseSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Why Choose',
  description:
    'Why choose Power Interview AI - privacy-first design, real-time assistance, mock interview practice, meeting note taker capabilities, bring-your-own LLM providers, and exportable interview and meeting reports.',
  path: '/why-choose',
});

export default function WhyChoosePage() {
  return (
    <PageChrome>
      <WhyChooseSection standalone />
    </PageChrome>
  );
}
