import { PageChrome } from '@/components/PageChrome';
import { TeamSkeleton } from '@/components/sections';

// Next has no instant-navigation UI for a route segment without a loading.tsx,
// so clicking here from elsewhere showed nothing at all - not even this
// skeleton - until the live GitHub profile fetches in TeamSection resolved.
// This file is what makes the transition feel instant instead of frozen.
export default function Loading() {
  return (
    <PageChrome>
      <TeamSkeleton />
    </PageChrome>
  );
}
