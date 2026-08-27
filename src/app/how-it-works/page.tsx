import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { HowItWorksSection, InstallPanel } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'How Power Interview AI works: install the desktop app for Windows or macOS, add your CV and the job description, then join your Zoom, Google Meet, or Microsoft Teams call and get live transcription and AI reply suggestions in an overlay hidden from screen share.',
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
