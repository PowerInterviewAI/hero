import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { TeamSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Team',
  description:
    'Meet the team behind Power Interview AI - the developers building a privacy-first AI interview coach for Zoom, Google Meet and Teams.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <PageChrome>
      <TeamSection standalone />
    </PageChrome>
  );
}
