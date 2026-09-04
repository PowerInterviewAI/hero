import { PageChrome } from '@/components/PageChrome';
import { PricingSkeleton } from '@/components/sections';

// Next has no instant-navigation UI for a route segment without a loading.tsx,
// so clicking here from elsewhere showed nothing at all - not even this
// skeleton - until the live plans fetch in PricingSection resolved. This file
// is what makes the transition feel instant instead of frozen.
export default function Loading() {
  return (
    <PageChrome>
      <PricingSkeleton />
    </PageChrome>
  );
}
