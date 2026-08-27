import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { PricingSection, PricingSkeleton } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Power Interview AI pricing: a 1-hour free trial, then credit packs with no subscription. Paid in coins only - no card, PayPal or bank details.',
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
