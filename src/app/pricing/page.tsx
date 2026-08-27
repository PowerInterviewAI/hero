import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { PricingSection, PricingSkeleton } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'See Power Interview AI pricing plans and credit packs - secure crypto payments, flexible options for interview practice, mock interviews, meeting note taking, and live AI assistance.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <PageChrome>
      {/* PricingSection fetches live plans; the skeleton keeps the page from
          blanking while that request is in flight. */}
      <Suspense fallback={<PricingSkeleton />}>
        <PricingSection standalone />
      </Suspense>
    </PageChrome>
  );
}
