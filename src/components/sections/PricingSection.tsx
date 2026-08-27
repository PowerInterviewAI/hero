import React from 'react';

import { ArrowRight, Check, Coins, Minus } from 'lucide-react';
import Link from 'next/link';

import { GoHomeButton } from '@/components/GoHomeButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { ENV } from '@/config/constants';
import { cn } from '@/lib/utils';
import { Plan } from '@/types';

const planDescriptions: Record<string, string> = {
  starter: 'Ideal for individuals and first-time AI note takers',
  pro: 'Best value for professionals and serious job seekers',
  enterprise: 'Enterprise-ready meeting and interview note taking for teams',
};

const calculateDiscount = (plan: Plan, starterPricePerCredit: number): number => {
  const pricePerCredit = plan.price_usd / plan.credits;
  const discount = ((starterPricePerCredit - pricePerCredit) / starterPricePerCredit) * 100;
  return Math.round(discount);
};

async function getPlans(): Promise<Plan[] | null> {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}api/payment/plans`);
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    return (await response.json()) as Plan[];
  } catch (err) {
    console.error('Error fetching plans:', err);
    return null;
  }
}

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

/** Rendered by the /pricing route and the home page while the fetch resolves. */
export const PricingSkeleton: React.FC = () => (
  <Section id="pricing" aria-label="Loading pricing">
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
  /**
   * Home-page treatment: the credit packs and their prices, without the
   * trial-vs-paid comparison, and a link to /pricing for the detail. The full
   * treatment lives on one indexable URL instead of being duplicated whole on
   * the home page - the same reasoning that turned /features and /why-choose
   * into home-page anchors (see next.config.ts).
   */
  preview?: boolean;
}

export const PricingSection = async ({
  standalone = false,
  preview = false,
}: PricingSectionProps) => {
  const plans = await getPlans();

  const heading = (
    <SectionHeading
      id="pricing-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="Pricing"
      title="Simple, transparent pricing"
      description={
        preview
          ? 'Credits are consumed at 10 per minute of AI assistance, so 600 credits is about an hour. No subscription.'
          : 'Credits are consumed at 10 per minute of AI assistance, so 600 credits is about an hour. Buy what you need - there is no subscription.'
      }
    />
  );

  if (!plans) {
    return (
      <Section id="pricing" aria-labelledby="pricing-heading">
        {heading}
        <div className="mx-auto mt-10 max-w-md rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Live plan pricing is temporarily unavailable. Credit packs are listed in the app, and
            the 1-hour free trial is unaffected.
          </p>
          <GoHomeButton className="mt-4">Download and start free</GoHomeButton>
        </div>
      </Section>
    );
  }

  const starterPlan = plans.find((p) => p.plan.toLowerCase() === 'starter');
  const starterPricePerCredit = starterPlan ? starterPlan.price_usd / starterPlan.credits : 0;

  return (
    <Section id="pricing" aria-labelledby="pricing-heading">
      {heading}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success" size="lg" dot>
          New accounts: 1-hour free trial
        </Badge>
        <Badge variant="outline" size="lg">
          <Coins aria-hidden="true" />
          Coins only - no card, PayPal, or bank details
        </Badge>
      </div>

      {/* Trial vs paid. Detail belongs on /pricing; the home page shows the
          packs and links across rather than repeating the whole table. */}
      {!preview && (
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">Free trial compared with paid plans</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
                    What you get
                  </th>
                  <th
                    scope="col"
                    className="w-48 px-4 py-4 text-left font-semibold text-foreground"
                  >
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
      )}

      {/* Credit packs */}
      <div className="mx-auto mt-14 grid max-w-5xl items-start gap-6 md:grid-cols-3">
        {plans.map((plan, index) => {
          const planName = plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1);
          const minutes = plan.credits / 10;
          const description = planDescriptions[plan.plan.toLowerCase()] || '';
          const discount =
            starterPricePerCredit > 0 ? calculateDiscount(plan, starterPricePerCredit) : 0;

          return (
            <Reveal key={plan.plan} delay={index * 80}>
              <div
                className={cn(
                  'relative flex h-full flex-col gap-5 rounded-xl border bg-card p-6',
                  plan.popular
                    ? 'border-primary shadow-glow-sm md:-mt-4 md:pb-8 md:pt-10'
                    : 'border-border'
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="solid" size="md">
                      Most popular
                    </Badge>
                  </span>
                )}

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{planName}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold tracking-tight">
                      ${plan.price_usd}
                    </span>
                    {discount > 0 && (
                      <Badge variant="success" size="sm">
                        Save {discount}%
                      </Badge>
                    )}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {plan.credits.toLocaleString()} credits · ~{minutes.toLocaleString()} minutes
                  </p>
                </div>

                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    Live and triggered suggestions
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    Provided SOTA model, no rate limit
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    Bring your own provider key
                  </li>
                  <li className="flex items-start gap-2">
                    <Minus
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
                      aria-hidden="true"
                    />
                    One-off purchase - no recurring charge
                  </li>
                </ul>

                <GoHomeButton
                  className="mt-auto w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get started
                </GoHomeButton>
              </div>
            </Reveal>
          );
        })}
      </div>

      {preview && (
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/pricing">
              Compare the free trial and paid plans
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
};

export default PricingSection;
