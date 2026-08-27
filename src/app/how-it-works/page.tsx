import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { HowItWorksSection, InstallPanel } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'Install the desktop app, add your CV and the job description, then join your Zoom, Meet or Teams call for live transcription and AI suggestions.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <PageChrome>
      <HowItWorksSection standalone />
      <InstallPanel />
    </PageChrome>
  );
}
