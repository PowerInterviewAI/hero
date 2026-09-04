'use client';

import { useEffect, useState } from 'react';

import { Check, Minus } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { getPlans } from '@/lib/plans';
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

// getPlans() used to be awaited inside PricingSection itself, which meant
// /pricing (and the home page) was only as fast as this fetch - and since it
// has no revalidate directive, Next treats the route as static and only pays
// that cost again on the first visit after each deploy, the same freeze
// TeamSection had. Fetching here instead, after mount, means the section
// paints its heading and skeleton immediately and the cards themselves fill
// in a moment later. SoftwareApplicationJsonLd keeps its own server-side call
// to getPlans() for the schema - that one is already Suspense-wrapped with a
// null fallback, so it was never the blocking half of this.
function usePlans(): Plan[] | null | undefined {
  const [plans, setPlans] = useState<Plan[] | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    getPlans().then((result) => {
      if (mounted) setPlans(result);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return plans;
}

const CardSkeleton: React.FC = () => (
  <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
    {[0, 1, 2].map((i) => (
      <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-card" />
    ))}
  </div>
);

export const PricingCards: React.FC = () => {
  const plans = usePlans();

  if (plans === undefined) return <CardSkeleton />;

  if (plans === null) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Live plan pricing is temporarily unavailable. Credit packs are listed in the app, and the
          1-hour free trial is unaffected.
        </p>
        <DownloadCta className="mt-4">Download and start free</DownloadCta>
      </div>
    );
  }

  const starterPlan = plans.find((p) => p.plan.toLowerCase() === 'starter');
  const starterPricePerCredit = starterPlan ? starterPlan.price_usd / starterPlan.credits : 0;

  return (
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

              <DownloadCta
                className="mt-auto w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                Get started
              </DownloadCta>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export default PricingCards;
