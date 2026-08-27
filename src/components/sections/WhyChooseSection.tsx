import React from 'react';

import { ArrowRight, Check, Minus, X } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Glow } from '@/components/ui/glow';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import { cn } from '@/lib/utils';

/** true = yes, false = no, string = a qualified answer rendered as-is. */
type Cell = boolean | string;

interface ComparisonRow {
  capability: string;
  us: Cell;
  practice: Cell;
  coding: Cell;
}

/*
 * Compared against categories rather than named products on purpose: a claim
 * about what a specific competitor does or doesn't do today goes stale the
 * moment they ship, and this table would then be wrong rather than merely
 * dated. The named examples live in the column headers as examples only.
 */
const ROWS: ComparisonRow[] = [
  { capability: 'Helps during a real, live interview', us: true, practice: false, coding: false },
  {
    capability: 'Hidden from screen share and screenshots',
    us: true,
    practice: false,
    coding: false,
  },
  {
    capability: 'Dual-channel transcription with speaker detection',
    us: true,
    practice: 'Practice only',
    coding: false,
  },
  {
    capability: 'Answers grounded in your CV and the job description',
    us: true,
    practice: 'Generic',
    coding: false,
  },
  {
    capability: 'Screenshot-based coding solutions in the moment',
    us: true,
    practice: false,
    coding: 'Practice problems',
  },
  { capability: 'Bring your own LLM provider key', us: true, practice: false, coding: false },
  {
    capability: 'Runs as a desktop app - no extension, no meeting bot',
    us: true,
    practice: 'Varies',
    coding: 'Varies',
  },
  {
    capability: 'Transcripts never retained after the session',
    us: true,
    practice: 'Varies',
    coding: 'Varies',
  },
  { capability: 'Pay per use - no subscription', us: true, practice: false, coding: false },
  {
    capability: 'Crypto-only payment, no card details stored',
    us: true,
    practice: false,
    coding: false,
  },
];

const CellValue: React.FC<{ value: Cell; emphasis?: boolean }> = ({ value, emphasis }) => {
  if (value === true) {
    return (
      <>
        <Check
          className={cn('mx-auto size-5', emphasis ? 'text-primary' : 'text-success')}
          aria-hidden="true"
        />
        <span className="sr-only">Yes</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <X className="mx-auto size-5 text-muted-foreground/50" aria-hidden="true" />
        <span className="sr-only">No</span>
      </>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Minus className="size-3" aria-hidden="true" />
      {value}
    </span>
  );
};

export const WhyChooseSection: React.FC = () => (
  <Section id={SECTIONS.whyChoose} tone="muted" aria-labelledby="why-choose-heading">
    <SectionHeading
      id="why-choose-heading"
      eyebrow="Why us"
      title="Built for the interview, not the rehearsal"
      description="Practice platforms coach you beforehand and coding sites drill you on problems. Neither is there when the interviewer is actually on the call."
    />

    <Reveal className="mx-auto mt-14 max-w-5xl">
      {/* Wide content scrolls inside its own container rather than the page. */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[44rem] border-collapse text-sm">
          <caption className="sr-only">
            Power Interview AI compared with interview practice tools and coding practice platforms
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
                Capability
              </th>
              <th scope="col" className="w-40 bg-primary/5 px-4 py-4 text-center">
                <span className="font-semibold text-foreground">Power Interview AI</span>
              </th>
              <th scope="col" className="w-44 px-4 py-4 text-center">
                <span className="font-medium text-foreground">Practice &amp; mock tools</span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  Yoodli, Big Interview, Pramp
                </span>
              </th>
              <th scope="col" className="w-44 px-4 py-4 text-center">
                <span className="font-medium text-foreground">Coding platforms</span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  LeetCode, HackerRank
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.capability} className="border-b border-border-subtle last:border-b-0">
                <th scope="row" className="px-5 py-3.5 text-left font-normal text-foreground">
                  {row.capability}
                </th>
                <td className="bg-primary/5 px-4 py-3.5 text-center">
                  <CellValue value={row.us} emphasis />
                </td>
                <td className="px-4 py-3.5 text-center">
                  <CellValue value={row.practice} />
                </td>
                <td className="px-4 py-3.5 text-center">
                  <CellValue value={row.coding} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Competitor names are examples of each category, not a claim about any specific
        product&apos;s current feature set.
      </p>
    </Reveal>

    <div className="relative isolate mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl border border-border bg-card px-6 py-10 text-center">
      <Glow position="center" intensity="subtle" />
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        A standalone desktop app built for the live interview - download, install, start. No API
        wiring, no browser extension asking for permissions, no bot joining the call on your behalf.
      </p>
      <DownloadCta size="lg" className="mt-6">
        Experience the difference
        <ArrowRight />
      </DownloadCta>
    </div>
  </Section>
);

export default WhyChooseSection;
