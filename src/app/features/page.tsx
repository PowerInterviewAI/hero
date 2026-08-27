import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { FeaturesSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Features',
  description:
    'Explore Power Interview AI features: real-time transcription, intelligent reply suggestions, mock interview practice, meeting note taker, live coding assistance, bring-your-own LLM providers, and exportable interview and meeting reports.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <PageChrome>
      <FeaturesSection standalone />
    </PageChrome>
  );
}
