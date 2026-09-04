import React from 'react';

import { Check, Coins } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';

import { PricingCards } from './PricingCards';

/** Trial vs paid, so the difference is visible before the credit packs. */
const TIER_ROWS: { label: string; trial: string | true; paid: string | true }[] = [
  { label: 'Duration', trial: '1 hour, new accounts', paid: 'As long as your credits last' },
  { label: 'Provided model', trial: 'Free model', paid: 'SOTA model' },
  { label: 'Live suggestions', trial: true, paid: true },
  { label: 'Triggered suggestions', trial: 'Not included', paid: true },
  { label: 'Rate limit', trial: 'None during trial', paid: 'None' },
  { label: 'Bring your own provider', trial: true, paid: true },
];

const TierValue: React.FC<{ value: string | true }> = ({ value }) =>
  value === true ? (
    <>
      <Check className="size-4 text-success" aria-hidden="true" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <span className="text-muted-foreground">{value}</span>
  );

/**
 * Rendered as the route-level loading.tsx fallback for /pricing while its JS
 * chunk loads - the only gap left to cover, now that PricingCards reads a
 * hardcoded plan list instead of fetching one.
 *
 * Deliberately carries no id. It used to be `id="pricing"` as well, so the
 * streamed HTML contained two elements with that id and `/#pricing` resolved to
 * whichever came first - the fallback, which is then thrown away. An anchor
 * target has to be the element that survives.
 */
export const PricingSkeleton: React.FC = () => (
  <Section aria-label="Loading pricing">
    <SectionHeading eyebrow="Pricing" title="Simple, transparent pricing" />
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-card" />
      ))}
    </div>
  </Section>
);

interface PricingSectionProps {
  /** Set on the standalone /pricing route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Full pricing detail, on the home page and /pricing alike - not condensed
 * with a "compare plans" link across, the way this section used to work.
 * With the header nav always pointing at the home anchor (see NAV_LINKS in
 * routes.ts), a reader landing on this section via the nav is already where
 * they're going; a link to a separate page repeating the same content back
 * to them had nothing to add. /pricing itself is unchanged - still a real,
 * indexable page for direct links and search results.
 *
 * Credit-pack prices come from PricingCards, which reads a hardcoded constant
 * (see lib/plans.ts) rather than fetching. That fetch used to be awaited
 * here, server-side, with no revalidate directive - which meant Next treated
 * /pricing as static and only paid that cost again on the first visit after
 * each deploy, freezing the page the same way TeamSection once froze /team.
 * Hardcoding removed the dependency entirely rather than just deferring it.
 */
export const PricingSection = ({ standalone = false }: PricingSectionProps) => (
  <Section id={SECTIONS.pricing} aria-labelledby="pricing-heading">
    <SectionHeading
      id="pricing-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="Pricing"
      title="Simple, transparent pricing"
      description="Credits are consumed at 10 per minute of AI assistance, so 600 credits is about an hour. Buy what you need - there is no subscription."
    />

    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Badge variant="success" size="lg" dot>
        New accounts: 1-hour free trial
      </Badge>
      <Badge variant="outline" size="lg">
        <Coins aria-hidden="true" />
        Coins only - no card, PayPal, or bank details
      </Badge>
    </div>

    <Reveal className="mx-auto mt-12 max-w-3xl">
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <caption className="sr-only">Free trial compared with paid plans</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
                What you get
              </th>
              <th scope="col" className="w-48 px-4 py-4 text-left font-semibold text-foreground">
                Free trial
              </th>
              <th
                scope="col"
                className="w-48 bg-primary/5 px-4 py-4 text-left font-semibold text-foreground"
              >
                Paid
              </th>
            </tr>
          </thead>
          <tbody>
            {TIER_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-border-subtle last:border-b-0">
                <th scope="row" className="px-5 py-3 text-left font-normal text-foreground">
                  {row.label}
                </th>
                <td className="px-4 py-3">
                  <TierValue value={row.trial} />
                </td>
                <td className="bg-primary/5 px-4 py-3">
                  <TierValue value={row.paid} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>

    <PricingCards />
  </Section>
);

export default PricingSection;
