import React from 'react';

import { Download, FileText, Radio } from 'lucide-react';

import { GoHomeButton } from '@/components/GoHomeButton';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';

const STEPS = [
  {
    icon: Download,
    title: 'Install and start your trial',
    body: 'Download the desktop app for Windows or macOS and sign in. New accounts get a full hour on the free model - no rate limits, no interruptions.',
  },
  {
    icon: FileText,
    title: 'Add your CV and the job description',
    body: 'Paste your profile and the role you are interviewing for. Suggestions are grounded in that context, so answers come back in your own experience rather than generic advice. Your configuration follows you across devices.',
  },
  {
    icon: Radio,
    title: 'Join the call and let it listen',
    body: 'Dual-channel transcription with speaker detection runs alongside Zoom, Google Meet or Teams. Suggestions stream into an overlay that stays out of screen shares and screenshots, driven entirely by hotkeys.',
  },
] as const;

interface HowItWorksSectionProps {
  /** Set on the standalone /how-it-works route so the section owns the h1. */
  standalone?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ standalone = false }) => (
  <Section id="how-it-works" aria-labelledby="how-it-works-heading">
    <SectionHeading
      id="how-it-works-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="How it works"
      title="From download to live suggestions in three steps"
      description="No browser extension, no meeting bot joining the call on your behalf. It runs locally as a desktop app."
    />

    <ol className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
      {STEPS.map((step, index) => (
        <Reveal as="li" key={step.title} delay={index * 90} className="relative">
          <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-strong">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-medium text-muted-foreground">
                Step {index + 1}
              </span>
            </div>

            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>

            {index === 2 && (
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
                <Kbd combo={HOTKEYS[Hotkey.ToggleStealth].combo} />
                <span className="text-xs text-muted-foreground">
                  {HOTKEYS[Hotkey.ToggleStealth].title}
                </span>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </ol>

    <div className="mt-12 flex justify-center">
      <GoHomeButton size="lg">Download and try it</GoHomeButton>
    </div>
  </Section>
);

export default HowItWorksSection;
