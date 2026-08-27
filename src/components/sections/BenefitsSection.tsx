import React from 'react';

import {
  ArrowRight,
  EyeOff,
  Gauge,
  type LucideIcon,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Glow } from '@/components/ui/glow';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';

interface Benefit {
  icon: LucideIcon;
  title: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: MessagesSquare,
    title: 'Communicate more clearly',
    body: 'Real-time, context-aware suggestions help you articulate your thoughts more clearly and professionally. Exported transcripts reveal the communication patterns you would otherwise never see.',
  },
  {
    icon: Sparkles,
    title: 'Walk in with confidence',
    body: 'Live support, intelligent suggestions, and full conversation-history awareness remove the uncertainty of a cold question, so you can present your best self instead of scrambling.',
  },
  {
    icon: Gauge,
    title: 'Cover every kind of question',
    body: 'From technical coding challenges to behavioural questions, the assistance spans the whole interview. Transcript analysis then shows you where you were strong and where you were not.',
  },
  {
    icon: TrendingUp,
    title: 'Learn faster between rounds',
    body: 'Review exported transcripts to understand what worked and what did not. AI-generated insights surface patterns you would miss on your own, so each interview improves the next.',
  },
  {
    icon: EyeOff,
    title: 'Stay private throughout',
    body: 'Stealth mode keeps the assistant invisible during screen sharing and screenshots, and your transcripts are never retained on our servers after the session ends.',
  },
  {
    icon: ShieldCheck,
    title: 'Keep control of your data',
    body: 'Bring your own OpenAI, Anthropic, or Google key and your prompts go to a provider you already trust. Payment is crypto-only, so there are no card details to store either.',
  },
];

export const BenefitsSection: React.FC = () => (
  <Section id={SECTIONS.benefits} aria-labelledby="benefits-heading">
    <SectionHeading
      id="benefits-heading"
      eyebrow="Benefits"
      title="Transform your interview performance"
      description="What actually changes once the assistant is running alongside your calls."
    />

    <div className="mx-auto mt-14 grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
      {BENEFITS.map((benefit, index) => (
        <Reveal key={benefit.title} delay={Math.min(index, 4) * 70}>
          <div className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <benefit.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="relative isolate mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl border border-border bg-card px-6 py-10 text-center">
      <Glow position="center" intensity="subtle" />
      <p className="font-display text-2xl font-semibold tracking-tight">
        Ready to transform your job search?
      </p>
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
        One hour on the free model to try it against a real call. No card, no bank details.
      </p>
      <DownloadCta size="lg" className="mt-6">
        Start free with live suggestions
        <ArrowRight />
      </DownloadCta>
    </div>
  </Section>
);

export default BenefitsSection;
