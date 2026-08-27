import React from 'react';

import { SiSuperuser } from '@icons-pack/react-simple-icons';
import {
  ArrowRight,
  Captions,
  FileDown,
  Ghost,
  KeyRound,
  Languages,
  type LucideIcon,
  MessageSquareCode,
  MessageSquareText,
  UserLock,
} from 'lucide-react';

import { GoHomeButton } from '@/components/GoHomeButton';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  icon: LucideIcon | typeof SiSuperuser;
  title: string;
  description: React.ReactNode;
  /** Column span at lg and up - drives the bento rhythm. */
  wide?: boolean;
  footer?: React.ReactNode;
}

const Em: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-medium text-foreground">{children}</span>
);

const FEATURES: Feature[] = [
  {
    id: 'stealth',
    icon: Ghost,
    title: 'Stealth mode',
    description: (
      <>
        Operate discreetly with hotkeys, opacity control, and smart window positioning. The window
        is <Em>not capturable in screenshots</Em> and stays invisible during full screen share.
      </>
    ),
    wide: true,
    footer: (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Kbd combo={HOTKEYS[Hotkey.ToggleStealth].combo} />
        <span className="text-xs text-muted-foreground">{HOTKEYS[Hotkey.ToggleStealth].title}</span>
      </div>
    ),
  },
  {
    id: 'transcription',
    icon: Captions,
    title: 'Live transcription',
    description: (
      <>
        Dual-channel transcription with automatic speaker detection and full conversation history.
        Change your microphone <Em>mid-interview</Em> without stopping the session - no gap in the
        transcript, nothing to restart.
      </>
    ),
  },
  {
    id: 'suggestions',
    icon: MessageSquareText,
    title: 'AI reply suggestions',
    description: (
      <>
        Personalised, context-aware responses grounded in your CV, the job description, and your{' '}
        <Em>full conversation history</Em>. Suggestions adapt to your communication style so you
        articulate your own experience rather than reading generic advice. Toggle{' '}
        <Em>Professional Mode</Em> for at-a-glance hints - a headline plus keyword bullets - instead
        of full sentences.
      </>
    ),
    wide: true,
    footer: (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Kbd combo={HOTKEYS[Hotkey.ToggleProfessionalMode].combo} />
        <span className="text-xs text-muted-foreground">
          {HOTKEYS[Hotkey.ToggleProfessionalMode].title}
        </span>
      </div>
    ),
  },
  {
    id: 'languages',
    icon: Languages,
    title: '28 interview languages',
    description: (
      <>
        One setting drives all three: which speech model transcribes the call, the language your
        suggestions come back in, and the language of your exported report. Switch it{' '}
        <Em>mid-interview</Em>, not just before you start. Full right-to-left support for Arabic and
        Hebrew.
      </>
    ),
  },
  {
    id: 'code',
    icon: MessageSquareCode,
    title: 'Code suggestions',
    description: (
      <>
        Screenshot analysis with LLM-powered solutions for coding problems, complete with syntax
        highlighting.
      </>
    ),
  },
  {
    id: 'export',
    icon: FileDown,
    title: 'AI note taker export',
    description: (
      <>
        <Em>Smart meeting export</Em> for interviews, mock interviews, and video calls. AI-generated
        summaries, action items, speaker-labelled transcripts, and follow-up notes. Exports to{' '}
        <Em>DOCX</Em> for easy sharing across individuals and enterprise teams.
      </>
    ),
    wide: true,
  },
  {
    id: 'mock',
    icon: SiSuperuser,
    title: 'Mock interview',
    description: (
      <>
        Practice with AI-guided mock interviews and get exportable performance notes. Learn more in
        the{' '}
        <a
          className="font-medium text-primary underline-offset-4 hover:underline"
          href="/docs/mock-interview"
        >
          mock interview guide
        </a>
        .
      </>
    ),
  },
  {
    id: 'plans',
    icon: KeyRound,
    title: 'Plan-based access',
    description: (
      <>
        Trial users get live suggestions free under rate limit (5 suggestions per hour). Paid users
        unlock no limit, triggered suggestions, and provided SOTA models.
      </>
    ),
  },
  {
    id: 'privacy',
    icon: UserLock,
    title: 'Privacy first',
    description: (
      <>
        Transcripts are never retained after your session. No data mining, and full control over
        your information.
      </>
    ),
  },
];

export const FeaturesSection: React.FC = () => (
  <Section id="features" tone="muted" aria-labelledby="features-heading">
    <SectionHeading
      id="features-heading"
      eyebrow="Features"
      title="Everything the call needs, nothing it can see"
      description="Built for live interviews, mock practice, and meeting notes alike."
    />

    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature, index) => (
        <Reveal
          key={feature.id}
          delay={Math.min(index, 5) * 60}
          className={cn(feature.wide && 'lg:col-span-2')}
        >
          <article className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              <feature.icon className="size-5" aria-hidden="true" />
            </span>

            <h3 className="text-lg font-semibold">{feature.title}</h3>

            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

            {feature.footer && <div className="mt-auto pt-2">{feature.footer}</div>}
          </article>
        </Reveal>
      ))}
    </div>

    <div className="mt-14 flex justify-center">
      <GoHomeButton size="lg">
        Download for free
        <ArrowRight />
      </GoHomeButton>
    </div>
  </Section>
);

export default FeaturesSection;
